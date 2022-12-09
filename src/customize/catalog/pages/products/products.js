import React from 'react';
import { connect } from 'react-redux';
import NewConnection from '@base/network/NewConnection';
import { category, products } from '@helper/constants';
import { Content, Container } from "native-base";
import Identify from '@helper/Identify';
import SimiPageComponent from "@base/components/SimiPageComponent";
import variable from '@theme/variables/material';
import { Text } from 'react-native';
import Categories from '../../components/categories/index';
import HeaderProducts from '@customize/catalog/components/products/header';
import ProductList from '@customize/catalog/components/products/productList';
import Modal from '@customize/catalog/components/modal';
import FilterTag from '@customize/catalog/components/products/FilterTag';
class Products extends SimiPageComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            selectedCate: null,
            layers: null,
            paramsFilter: null,
            filterTag: null,
            sortTags: null,
            sorts: null
        }
        this.categoryData = null;
        this.cateId = this.props.navigation.getParam("categoryId") ? this.props.navigation.getParam("categoryId") : -1;
        this.showViewAll = (Identify.getMerchantConfig().storeview.catalog.frontend.is_show_link_all_product === '1') ? true : false;
        if (this.props.navigation.getParam("categoryName")) {
            this.cateName = this.props.navigation.getParam("categoryName");
            this.title = this.props.navigation.getParam("categoryName");
        } else {
            this.cateName = Identify.__('All categories');
        }
        this.isBack = this.props.navigation.state.params.hasOwnProperty("showBack") ? this.props.navigation.getParam("showBack") : true;
        this.dataTracking = {
            cat_name: this.cateName,
            cat_id: this.cateId
        };
        this.cateChilds = null;
        this.onSelectedCategory = this.onSelectedCategory.bind(this)
        this.onSetLayers = this.onSetLayers.bind(this);
        this.onFilterAction = this.onFilterAction.bind(this);
        this.onFilterTags = this.onFilterTags.bind(this);
        this.onSortTags = this.onFilterTags.bind(this);
        this.paramsFilter = null;
        this.filterTag = null;
        this.sortTags = null;
        this.layers = null;
        this.sorts = null;
        this.onSetSorts = this.onSetSorts.bind(this);
    }

    // componentWillMount() {
    //     if (this.props.data.showLoading.type === 'none' && !this.checkExistData(this.props.data.category_data, this.cateId)) {
    //         this.props.storeData('showLoading', { type: 'full' });
    //     }
    // }

    componentDidMount() {
        super.componentDidMount();
        if (!this.categoryData) {
            let extendUrl = '';
            if (this.cateId !== -1) {
                extendUrl = '/' + this.cateId;
                new NewConnection()
                    .init(category + extendUrl, 'get_category_data', this)
                    .addGetData({
                        limit: 100
                    })
                    .connect();
            } else {
                this.categoryData = this.props.data.category_data;
                this.props.storeData('actions', [
                    { type: 'showLoading', data: { type: 'none' } },
                ]);
            }
        }
    }
    setData(data) {
        this.categoryData = data;
        this.cateChilds = [
            {
                name: Identify.__('VIEW ALL'),
                entity_id: this.cateId,
            },
            ...data?.categories.map((item) => {
                return {
                    name: item.name,
                    entity_id: item.entity_id
                }
            })
        ]
        this.setState({ selectedCate: this.cateChilds[0] })
        let categoryData = {};
        categoryData[this.cateId] = data;
        setTimeout(() => {
            this.props.storeData('actions', [
                { type: 'showLoading', data: { type: 'none' } },
                { type: 'add_category_data', data: categoryData }
            ]);
        }, 1000)

    }

    loadExistData(data) {
        this.categoryData = data;
        return true;
    }
    // componentDidUpdate() {
    //     console.log("this: ", this);
    // }
    shouldRenderLayoutFromConfig() {
        if (this.categoryData) {
            return true;
        }
        return false;
    }

    shouldShowComponent(element) {
        if (element.id == 'default_catalog_products_list' && !this.showViewAll) {
            return false;
        }
        return true;
    }


    onFilterAction(filterParams) {
        this.setState({ paramsFilter: filterParams });
        this.paramsFilter = filterParams;
    }

    onFilterTags(filterTag) {
        this.setState({ filterTag });
        this.filterTag = filterTag;
    }
    onSortTags(sortTags) {
        this.setState({ sortTags });
        this.sortTags = sortTags;
    }
    onSelectedCategory(cate) {
        this.setState({ selectedCate: cate })

        // remove filterTag
        this.setState({ paramsFilter: null });
        this.paramsFilter = null;
        this.setState({ filterTag: null });
        this.filterTag = null;
    }

    onSetLayers(layers) {
        this.setState({ layers: layers });
        this.layers = layers;
    }

    onSetSorts(sorts) {
        this.setState({ sorts: sorts });
        this.sorts = sorts;
    }

    renderPhoneLayout() {
        return (
            <Container>
                <HeaderProducts cateChilds={this.cateChilds} selectedCate={this.state.selectedCate} onSelectedCategory={this.onSelectedCategory} />
                <FilterTag {...this} />
                <ProductList cateId={this.cateId} selectedCate={this.state.selectedCate} {...this} paramsFilter={this.state.paramsFilter} />
                <Modal {...this} />
            </Container>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(Products);