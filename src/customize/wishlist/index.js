import React from 'react';
import { ScrollView, FlatList, TouchableOpacity, Image, View, Share, Alert, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Container, Card, Spinner, Text, Icon, Button, H3 } from 'native-base';
import styles from './styles';
import NewConnection from '@base/network/NewConnection';
import Price from '@screens/catalog/components/product/price';
import Identify from '@helper/Identify';
import NavigationManager from '@helper/NavigationManager';
import SimiPageComponent from "@base/components/SimiPageComponent";

import { quoteitems } from '@helper/constants';
import material from '@theme/variables/material';
export const wishlist_item = "simiconnector/rest/v2/wishlistitems"
import WishlistItem from './item';
const width = Dimensions.get("window").width;
class Wishlist extends SimiPageComponent {

    constructor(props) {
        super(props);
        this.isPage = true;
        this.state = {
            ...this.state,
            data: null,
            loadMore: false,
        };
        this.back = true;
        this.data = [];
        this.limit = 5;
        this.offset = 0;
        this.lastY = 0;
        this.isLoadingMore = false;
        this.refresh = this.props.navigation.getParam("refresh", null);
        this.animation = new Animated.Value(0);
        this.inputRange = [0, 1];
        this.outputRange = [1, 0.95];
        this.scaleAnimation = this.animation.interpolate({ inputRange: this.inputRange, outputRange: this.outputRange });
    }

    componentDidMount() {
        this.props.storeData('showLoading', { type: 'full' });
        this.getWishlist();
    }

    onPressIn() {
        Animated.spring(this.animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    onPressOut() {
        Animated.spring(this.animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    getWishlist(limit, offset) {
        let params = [];
        params['limit'] = limit ?? this.limit;
        params['offset'] = offset ?? this.offset;
        try {
            new NewConnection()
                .init(wishlist_item, 'get_wishlist_data', this)
                .addGetData(params)
                .connect();
        } catch (e) {
            console.log(e.message);
        }
    }

    setData(data, requestId) {
        if (requestId != 'delete_item') {
            this.props.storeData('showLoading', { type: 'none' });
        }

        if (data.hasOwnProperty('quoteitems')) {
            this.props.storeData('actions', [
                { type: 'quoteitems', data: data }
            ]);
            return
        }

        let canLoadMore = true;
        if (this.offset + this.limit >= data.total) {
            canLoadMore = false;
        }

        if (requestId == 'add_to_cart') {
            this.getQuoteItems();
            this.getWishlist(this.offset + this.limit, 0);
        }

        if (requestId == 'delete_item') {
            this.getWishlist(this.offset + this.limit, 0);
        }

        if (this.isLoadingMore) {
            let combinedWishlistItems = this.state.data.wishlistitems;
            combinedWishlistItems.push.apply(combinedWishlistItems, data.wishlistitems);
            data.wishlistitems = combinedWishlistItems;

            let combinedIds = this.state.data.all_ids;
            combinedIds.push.apply(combinedIds, data.all_ids);
            data.all_ids = combinedIds;
        }
        this.isLoadingMore = false;
        if (requestId != 'add_to_cart' && requestId != 'delete_item') {
            this.setState({
                data: data,
                loadMore: canLoadMore
            });
        }
    }

    getQuoteItems() {
        new NewConnection()
            .init(quoteitems, 'get_quoteitems', this)
            .connect();
    }

    handleWhenRequestFail() {
        if (this.props.loading != 'none') {
            this.props.storeData('showLoading', { type: 'none' });
        }
    }

    addPriceRow(item) {
        return (
            <Price type={item.type_id} prices={item.app_prices} styleDiscount={{ fontSize: 1, fontWeight: '100', marginTop: 5 }} />
        )
    }

    deleteWishlistItem(item) {
        Alert.alert(
            Identify.__('Confirmation'),
            Identify.__('Are you sure you want to delete this product?'),
            [
                { text: Identify.__('NO'), onPress: () => { }, style: 'cancel' },
                {
                    text: Identify.__('YES'), onPress: () => {
                        this.props.storeData('showLoading', { type: 'dialog' });
                        this.state.data = null;
                        new NewConnection()
                            .init(wishlist_item + '/' + item.wishlist_item_id, 'delete_item', this, 'DELETE')
                            .connect();
                    }
                },
            ],
            { cancelable: false }
        )
    }

    addWishlistItemToCart(item) {
        if (item.selected_all_required_options == false) {
            NavigationManager.openPage(this.props.navigation, 'ProductDetail', {
                productId: item.product_id,
            });
        } else {
            new NewConnection()
                .init(wishlist_item + '/' + item.wishlist_item_id, 'add_to_cart', this)
                .addGetData({ 'add_to_cart': '1' })
                .connect();
            this.props.storeData('showLoading', { type: 'dialog' });
            // this.setState({addCart: true});
            this.addCart = true;
        }
    }
    openProduct(item) {
        NavigationManager.openPage(this.props.navigation,
            'ProductDetail', {
            productId: item.product_id
        })
    }
    renderWishListItemImage(item) {
        return (
            <TouchableOpacity 
                onPress={() => {
                    this.openProduct(item)
            }}>
                <Image resizeMode="contain" source={{ uri: item.product_image }} style={styles.imageListItem} />
                {/* {!item.stock_status && <Text style={styles.outOfStock}>{Identify.__('Out of stock')}</Text>} */}
            </TouchableOpacity>
        )
    }
    renderWishlistItemInfor(item) {
        return (
            <View style={{ flex: 1, flexDirection: 'row', position: 'relative' }}>
                <View >
                    <View style={{ width: width - 210 }} >
                        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: "bold" }} numberOfLines={2}>
                            {item.name}
                        </Text>

                    </View>
                    {this.addPriceRow(item)}
                </View>
                <View style={{ position: 'absolute', top: -10, right: -10 }}>
                    <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={() => {
                            this.deleteWishlistItem(item);
                        }}>
                        <Icon color={Identify.theme.button_background} name='close' style={{ fontSize: 28, color: Identify.theme.button_background }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderWishlistItemAction(item) {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {item.stock_status && <Button disabled={!item.stock_status} full style={{ height: 40, paddingHorizontal: 10, borderRadius: 12 }} onPress={() => {
                    this.addWishlistItemToCart(item);
                }}>
                    {!item.stock_status ?
                        <Text style={styles.outOfStock}>{Identify.__('Out of stock')}</Text>
                        :
                        <Text>{Identify.__('Add To Cart')}</Text>
                    }

                </Button>}
                <View style={{
                    height: 40, width: 40, borderWidth: 1, borderColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: 'white', shadowColor: "#000", flexDirection: 'row',
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,

                    elevation: 2,
                }}>
                    <TouchableOpacity
                        style={[{}, styles.buttonIcon]}
                        onPress={() => {
                            Share.share({
                                message: item.product_sharing_message
                            });
                        }}>
                        <Icon name='sharealt' type='AntDesign' style={{ fontSize: 20, color: 'black' }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderItemRight(item) {
        return (
            <View style={{ paddingLeft: 10, width: width - 160, paddingRight: 5 }}>
                {this.renderWishlistItemInfor(item)}
                {this.renderWishlistItemAction(item)}
            </View>
        )
    }

    // renderItem(item) {
    //     return (
    //         <TouchableOpacity
    //             onPress={() => { this.openProduct(item) }}
    //             onPressIn={() => { this.onPressIn() }}
    //             onPressOut={() => { this.onPressOut() }}
    //         >
    //             <Animated.View key={item.wishlist_item_id} style={{
    //                 borderRadius: 12, shadowColor: "#000",
    //                 shadowOffset: {
    //                     width: 0,
    //                     height: 1,
    //                 },
    //                 shadowOpacity: 0.20,
    //                 shadowRadius: 1.41,
    //                 borderColor: "#e0e0e0",
    //                 borderWidth: 1,
    //                 elevation: 2,
    //                 marginBottom: 10,
    //                 transform: [{ scale: this.scaleAnimation }],
    //             }}>
    //                 <View style={[styles.itemView, { borderRadius: 12 }]}>
    //                     {this.renderWishListItemImage(item)}
    //                     {this.renderItemRight(item)}
    //                 </View>
    //             </Animated.View>
    //         </TouchableOpacity>
    //     );
    // }

    loadMore = () => {
        if (this.offset + this.limit < this.state.data.total && !this.isLoadingMore) {
            this.isLoadingMore = true;
            this.offset += this.limit;
            this.getWishlist();
        }
    }
    generatePropsToFlatlist() {
        return {
            style: styles.verticalList,
            data: this.state.data.wishlistitems,
            extraData: this.state.data
        }
    }
    renderWishlistItems() {
        return (
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if ((Number((nativeEvent.contentSize.height).toFixed(0)) - 1) <= Number((nativeEvent.contentOffset.y).toFixed(1)) + Number((nativeEvent.layoutMeasurement.height).toFixed(1))) {
                        this.loadMore();
                    }
                }}
                style={{ padding: 10 }}
            >
                <FlatList
                    {...this.generatePropsToFlatlist()}
                    keyExtractor={(item) => item.wishlist_item_id}
                    renderItem={({ item }) =>
                        <WishlistItem item={item} navigation={this.props.navigation} renderWishListItemImage={this.renderWishListItemImage(item)} renderItemRight={this.renderItemRight(item)} />
                    }
                />
                <Spinner style={(this.state.loadMore) ? {} : { display: 'none' }} />
            </ScrollView>
        );
    }

    renderPhoneLayout() {
        if (this.state.data && this.state.data.wishlistitems.length > 0) {
            return (
                <Container>
                    {this.renderWishlistItems()}
                </Container>
            );
        }
        return (
            <Text style={{ textAlign: 'center', fontFamily: material.fontBold, fontSize: 20, marginTop: 30 }}>{Identify.__('Your wishlist is empty')}</Text>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.redux_data.quoteitems,
        loading: state.redux_data.showLoading,
        wishlist: state.redux_data.wishlist,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
