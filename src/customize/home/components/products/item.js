import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styles from '@customize/home/pages/styles';
import { View, H3, Text, Icon } from "native-base";
import HorizontalProducts from '@customize/catalog/components/horizontalProducts';
import Identify from '@helper/Identify';
import NavigationManager from '@helper/NavigationManager';
import { products_mode, home_spot_products } from '@helper/constants';
import NewConnection from '@base/network/NewConnection';
import { connect } from 'react-redux';
import Device from '@helper/device';

class Item extends React.Component {

    componentDidMount() {
        if (this.isDataEmpty()) {
            this.requestData();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.isDataEmpty()) {
            return false;
        }
        return true;
    }

    isDataEmpty() {
        if (this.props.homeProductlists && this.props.homeProductlists.hasOwnProperty(this.props.productlist_id)) {
            return false;
        }
        return true;
    }

    requestData() {
        let params = {
            limit: Device.isTablet() ? 16 : 10,
            offset: 0
        };
        new NewConnection()
            .init(home_spot_products + '/' + this.props.productlist_id, 'get_homeproductlist_data', this)
            .addGetData(params)
            .connect();
    }

    setData(data) {
        this.processData(data);
    }

    processData(data) {
        let homeproductlists = data.homeproductlist;
        let dataForSave = {};
        dataForSave[homeproductlists.productlist_id] = homeproductlists.product_array;
        this.props.storeData('add_home_spot_data', dataForSave);
    }

    openProductList() {
        let params = {
            categoryName: this.props.title,
            spotId: this.props.productlist_id,
            'mode': products_mode.spot
        };
        NavigationManager.openPage(this.props.navigation, 'Products', params);
    }

    render() {
        let data = this.props.homeProductlists[this.props.productlist_id];
        if (!this.isDataEmpty()) {
            return (
                <View style={{ marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50 }}>
                        <H3 style={{ ...styles.title }}>{Identify.__(this.props.title.toUpperCase())}</H3>
                        {data.products.length > 9 &&
                            <TouchableOpacity onPress={() => this.openProductList()}>
                                <View style={{ marginRight: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                                    <Text style={{ fontSize: 14, marginRight: 3 }}>
                                        {Identify.__('See All')}
                                    </Text>
                                    <Icon type="MaterialCommunityIcons" name="greater-than" style={{ fontSize: 16, color: 'red' }} size={14} color="red" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <HorizontalProducts hasData={true} products={data.products} navigation={this.props.navigation} fromHome={true} />
                </View>
            );
        } else {
            return null;
        }
    }
}
Item.defaultProps = {
    item: null
}

const mapStateToProps = (state) => {
    return {
        homeProductlists: state.redux_data.home_spot_data
    };
}
//Save to redux.
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);