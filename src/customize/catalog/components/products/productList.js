import React from 'react';
import SimiPageComponent from '@base/components/SimiPageComponent';
import Identify from '@helper/Identify';
import { connect } from 'react-redux';
import NewConnection from '@base/network/NewConnection';
import { Container, Spinner } from 'native-base';
import { View, ScrollView, FlatList, RefreshControl } from 'react-native';
import { products, home_spot_products, products_mode } from '@helper/constants';
import NavigationManager from '@helper/NavigationManager';
import variable from '@theme/variables/material';
import Device from '@helper/device';
import VerticalProductItem from '../verticalproducts/item';
import styles from '../verticalproducts/styles'
class ProductList extends SimiPageComponent {

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      data: [],
      loadMore: true,
      showList: (Identify.getMerchantConfig().storeview.catalog.frontend.view_products_default == '0') ? true : false,
      showBottom: true,
      isFetching: false,
      isLoadingMore: false,
    };
    this.cateId = this.props.cateId;
    this.limit = Device.isTablet() ? 16 : 12;
    this.offset = 0;
    this.first = true;
    this.lastY = 0;
    this.isFetching = false;
    this.isLoadingMore = false;
    this.shouldStoreData = true;
    this.layout = 'ProductDetail';
    this.onFilterAction = this.onFilterAction.bind(this);
    this.onSortAction = this.onSortAction.bind(this);
    this.list = null;
    this.paramsFilter = null;
    this.onRefresh = this.onRefresh.bind(this);
    this.filterData
  }

  componentWillMount() {
    if (this.props.data.showLoading.type === 'none' && !this.props.isCategory) {
      this.props.storeData('showLoading', { type: 'full' });
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (!this.checkExistData()) {
      this.requestData(this.createParams());
    }

  }

  createParams() {
    let params = {
      limit: this.limit,
      offset: this.offset
    };
    // if (this.props.sortTags && this.props.sortTags.length > 0) {
    //   params['dir'] = this.props.sortTags[0].direction;
    //   params['order'] = this.props.sortTags[0].key;
    // }
    if (this.cateId != -1) {
      params['filter[cat_id]'] = this.cateId;
    }
    return params;
  }

  requestData(params) {
    if (!this.state.loadMore && !this.isFetching) {
      this.props.storeData('showLoading', { type: 'full' });
    }
    let url = products;
    new NewConnection()
      .init(url, 'get_products_data', this)
      .addGetData(params)
      .connect();
  }

  setData(data) {
    this.updateData('add_products_data', this.cateId, data);
  }

  updateData(type, data_key, data) {
    let canLoadMore = true;
    if (this.offset + this.limit >= data.total || this.isFetching) {
      canLoadMore = false;
    }

    if (this.shouldStoreData && !this.isFetching || this.isLoadingMore) {
      this.isLoadingMore = false;
      // this.state.data = data;
      // this.state.loadMore = canLoadMore;      
      let productsData = {};
      productsData[data_key] = data;
      this.props.storeData(type, productsData);
      let newData = [];
      if (this.state.data.products) {
        newData = this.state.data.products;
      }
      this.isFetching = false;
      this.setState({ data: { ...data, products: [...newData, ...data.products] }, loadMore: canLoadMore });
    } else {
      this.setState({ data: data, loadMore: canLoadMore, isFetching: false });
    }

    this.props.onSetSorts(data.orders);
    this.props.onSetLayers(data.layers);
    if (this.props.data.showLoading.type !== 'none' && !this.props.isCategory) {
      this.props.storeData('showLoading', { type: 'none' });
    }
  }

  onRefresh() {
    if (!this.state.isFetching) {
      this.setState({ isFetching: true, loadMore: true });
      this.isFetching = true;
      this.offset = 0;
      this.requestData(this.createParams());
    }
  }

  changeStyle = () => {
    if (this?.state?.showList == true) {
      this.setState({ showList: false });
    } else {
      this.setState({ showList: true });
    }
  }


  openSort = () => {
    NavigationManager.openPage(this.props.navigation, 'Sort', {
      sort: this?.state?.data.orders,
      onSortAction: this.onSortAction
    });
  }

  onSortAction(order, dir) {
    // this.limit = Device.isTablet() ? 16 : 10;
    // this.offset = 0;
    this.props.storeData('showLoading', { type: 'full' });
    params = this.createParams();
    if (this.filterData) {
      params = {
        ...params,
        ...this.filterData
      }
    }
    params['order'] = order;
    params['dir'] = dir;
    this.shouldStoreData = false;
    this.sortOrder = { order, dir }
    this.setState({ data: null });
    this.requestData(params);
  }

  onEndReached = () => {
    if (this.offset + this.limit < this?.state?.data.total && !this.isLoadingMore) {
      this.isLoadingMore = true;
      this.offset += this.limit;
      let params = this.createParams()
      if (this.filterData) {
        params = {
          ...params,
          ...this.filterData
        }
      }
      if (this.sortOrder) {
        params = {
          ...params,
          ...this.sortOrder
        }
      }
      this.requestData(params);
    }
  }

  onListScroll = ({ nativeEvent }) => {
    if (this.lastY == 0 || this.lastY > nativeEvent.contentOffset.y) {
      if (this?.state?.showBottom == false) {
        this.setState({ showBottom: true });
      }
    } else {
      if (this?.state?.showBottom == true) {
        this.setState({ showBottom: false });
      }
    }
    this.lastY = nativeEvent.contentOffset.y;

    if ((Number((nativeEvent.contentSize.height).toFixed(0)) - 100) <= Number((nativeEvent.contentOffset.y).toFixed(1)) + Number((nativeEvent.layoutMeasurement.height).toFixed(1))) {
      this.onEndReached();
    }
  }

  shouldRenderLayoutFromConfig() {
    if (this?.state?.data) {
      return true;
    }
    return false;
  }

  addMorePropsToComponent(element) {
    return {
      products: this?.state?.data.products
    };
  }
  onFilterAction(filterParams) {
    let params;
    this.limit = Device.isTablet() ? 16 : 10;
    this.offset = 0;
    this.props.storeData('showLoading', { type: 'full' });
    params = {
      ...this.createParams(),
      ...filterParams,
    };

    this.shouldStoreData = false;
    this.requestData(params);
  }
  componentDidUpdate() {
    if (this.props.selectedCate && !this.first) {
      if (this.props.selectedCate.entity_id !== this.cateId) {
        this.cateId = this.props.selectedCate.entity_id;
        this.props.storeData('showLoading', { type: 'full' });
        this.offset = 0;
        this.setState({ data: [] })
        this.props.onSortTags([])
        this.requestData(this.createParams());
      }
    }
    if (this.props.paramsFilter && this.props.paramsFilter != this.filterData) {
      this.filterData = this.props.paramsFilter;
      this.onFilterAction(this.props.paramsFilter);
    }
    this.first = false;

  }

  renderItem(item) {
    return (<VerticalProductItem
      layout={this.layout}
      product={item}
      navigation={this.props.navigation}
      showList={this?.state?.showList}
      itemStyle={{ flex: 1 }}
    />);
  }
  formatData = (data, numColumns) => {
    let numOfFullRow = Math.floor(data.length / numColumns);
    let numOfItemOnLastRow = data.length - numOfFullRow * numColumns;
    while (numOfItemOnLastRow !== numColumns && numOfItemOnLastRow !== 0) {
      ///remove this sec if don't have loadMore
      if (this.props.parent?.state?.loadMore) {
        for (let i = 0; i < data.length - 1; i++) {
          if (data[i].empty) {
            data.splice(i, 1);
          }
        }
      }
      ///
      data.push({ entity_id: Identify.makeid(), empty: true, app_prices: { has_special_price: null } })
      numOfItemOnLastRow = numOfItemOnLastRow + 1;
    }
    return data;
  }
  createListProps() {
    let showList = false;
    let numColumns = (showList && !Device.isTablet()) ? 1 : ((showList && Device.isTablet() || !showList && !Device.isTablet()) ? 2 : 4)
    return {
      style: styles.verticalList,
      data: this?.state?.data.products && this?.state?.data.products.length > 0 ? this.formatData(this?.state?.data.products, numColumns) : [],
      // extraData: this.props.parent?.state?.data,
      showsVerticalScrollIndicator: false,
      keyExtractor: (item) => item.entity_id,
      numColumns: numColumns,
      key: (showList) ? 'ONE COLUMN' : 'TWO COLUMN'
    };
  }

  render() {
    if (this?.state?.data) {
      return (
        <Container style={{ backgroundColor: variable.appBackground }}>
          <ScrollView
            onScroll={this.onListScroll}
            scrollEventThrottle={400}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={this.onRefresh} />
            }
          >
            <FlatList
              {...this.createListProps()}
              renderItem={({ item }) => {
                if (item.empty) {
                  return <View style={{ flex: 1 }} />
                }
                return (
                  this.renderItem(item)
                );
              }}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
            <Spinner color={Identify.theme.loading_color} style={(this.isLoadingMore || this.state.isLoadingMore) ? {} : { display: 'none' }} />
            <View style={{ height: 60 }} />
          </ScrollView>
        </Container>
      );
    } else {
      return null;
    }

  }

}

const mapStateToProps = (state) => {
  return { data: state.redux_data };
}
//Save to redux.
const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (type, data) => {
      dispatch({ type: type, data: data })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);