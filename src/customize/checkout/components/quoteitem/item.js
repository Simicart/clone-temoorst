import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { ListItem, Body, Right, Button, Icon, View, Text, Input } from 'native-base';
import Identify from '@helper/Identify';
import { StyleSheet, TextInput, Image, Alert, TouchableOpacity, Dimensions, Animated } from 'react-native';
import material from '@theme/variables/material';
import NavigationManager from '@helper/NavigationManager';
import QuoteItemView from './quote';
import OutStockLabel from '@screens/catalog/components/product/outStockLabel';

const QuoteItem = (props) => {
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.95];
    const scaleAnimation = animation.interpolate({ inputRange, outputRange });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };
    const width = Dimensions.get('window').width;
    function showDeleteItemPopup() {
        Alert.alert(
            Identify.__('Warning'),
            Identify.__('Are you sure you want to delete this product?'),
            [
                { text: Identify.__('Cancel'), onPress: () => { style: 'cancel' } },
                {
                    text: Identify.__('OK'), onPress: () => {
                        props.parent.updateCart(props.data.item_id, 0)
                    }
                },
            ],
            { cancelable: true }
        );
    }

    function renderQtyBox() {
        let qtyBox = (
            <TextInput style={{ ...styles.qtyBox, width: 30 }}
                placeholderTextColor="#000"
                value={parseInt(props.data.qty.toString()).toString()}
                editable={false}
                underlineColorAndroid="transparent" />
        );
        if (props.parent.from && props.parent.from == 'cart' && (!props.data.product.is_salable || (props.data.product.is_salable && Identify.TRUE(props.data.product.is_salable)))) {
            qtyBox = (
                <TextInput style={{ ...styles.qtyBox, width: 30 }}
                    placeholderTextColor="#000000"
                    defaultValue={parseInt(props.data.qty.toString()).toString()}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onSubmitEditing={(e) => {
                        let qty = e.nativeEvent.text;
                        if (isNaN(qty)) {
                            Alert.alert(
                                Identify.__('Error'),
                                Identify.__('Quantity is not valid')
                            );
                            return;
                        }
                        props.parent.qtySubmit(e, props.data.item_id, props.data.qty)
                    }}
                    underlineColorAndroid="transparent" />
            );
        }
        return (
            <View style={{ flexDirection: Identify.isRtl() ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, padding: 5, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, width: 120 }}>
                <TouchableOpacity
                    onPress={() => {
                        if (parseInt(props.data.qty.toString()) == 1) {
                            showDeleteItemPopup(props.data)
                        } else {
                            props.parent.updateCart(props.data.item_id, parseInt(props.data.qty.toString()) - 1)
                        }
                    }}
                >
                    <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon style={{ textAlign: 'right', marginLeft: 0, marginRight: 0, fontSize: 20, color: Identify.theme.icon_color ? Identify.theme.icon_color : 'black' }} type="AntDesign" name="minus" color="pink" />
                    </View>
                </TouchableOpacity>
                {qtyBox}
                <TouchableOpacity
                    onPress={() => { props.parent.updateCart(props.data.item_id, parseInt(props.data.qty.toString()) + 1) }}
                >
                    <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon style={{ textAlign: 'right', marginLeft: 0, marginRight: 0, fontSize: 20, color: Identify.theme.icon_color ? Identify.theme.icon_color : 'black' }} type="AntDesign" name="plus" color="pink" />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    function renderMoveItem() {
        let remove_item = null;
        if (props.parent.from && props.parent.from == 'cart') {
            remove_item = (
                <Button style={{ borderColor: '#e0e0e0', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 8 }} transparent
                    onPress={() => { showDeleteItemPopup(props.data) }}>
                    <Icon style={{ textAlign: 'right', marginLeft: 0, marginRight: 0, fontSize: 20 }} name="ios-trash" />
                </Button>
            );
        }
        return remove_item;
    }
    function onItemSelect() {
        let route = 'ProductDetail';
        if (props.data.product_type === 'simigiftvoucher') {
            route = 'ProductGiftCardDetail'
        }
        // NavigationManager.openPage(props.parent.props.navigation,
        //     route, {
        //     productId: props.data.product_id,
        // })
    }
    function renderImageItem() {
        if (props.parent.is_go_detail) {
            return (
                <View>
                    <Image style={[styles.viewImage]} source={{ uri: props.data.image }} resizeMode='contain' />
                    {renderOutStock()}
                </View>
            )
        }
        if (typeof props.data.image === 'string') {
            return (
                <Image style={styles.viewImage} source={{ uri: props.data.image }} resizeMode='contain' />
            )
        } else {
            return (null)
        }
    }

    function renderOutStock() {
        if (props.data.product.hasOwnProperty('is_salable') && !Identify.TRUE(props.data.product.is_salable)) {
            return <OutStockLabel fontSize={12} />
        }
    }

    function renderItemContent() {
        return (
            <View style={{}}>
                <Text numberOfLines={2} style={[styles.spaceLine, { fontFamily: material.fontBold, fontSize: 16 }]}>{props.data.name}</Text>
                <QuoteItemView item={props.data} style={styles.itemStyle} />

            </View>
        );
    }
    return (
        <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => {
                let route = 'ProductDetail';
                // NavigationManager.openPage(props.navigation, 'ProductDetail', {
                //     productId: props?.data?.product_id,
                // });
                if (props.data && props.data.parent_product_id) {
                    NavigationManager.openPage(props.navigation,
                        route, {
                        productId: props?.data.parent_product_id,
                    })
                } else {
                    NavigationManager.openPage(props.navigation,
                        route, {
                        productId: props?.data.product_id,
                    })
                }
            }}
        >

            <Animated.View
                style={{
                    transform: [{ scale: scaleAnimation }],
                    // shadowColor: "#000",
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 1,
                    // },
                    // shadowOpacity: 0.22,
                    // shadowRadius: 2.22,

                    // elevation: 3,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    padding: 10,
                    borderRadius: 16,
                    marginBottom: 20,
                    flex: 1,
                    minHeight: 160
                }}
            >

                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 140, width: 140 }}>
                        {renderImageItem()}
                    </View>
                    <View style={{ padding: 5, width: width - 200, justifyContent: 'space-between' }}>
                        {renderItemContent()}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {renderMoveItem()}
                            {renderQtyBox()}
                        </View>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    qtyBox: { borderStyle: 'solid', width: 55, height: 35, fontSize: 13, alignItems: 'center', textAlign: 'center', color: 'black' },
    spaceLine: { fontFamily: material.fontBold, marginBottom: 5, textAlign: 'left' },
    itemStyle: { marginBottom: 5, fontSize: material.textSizeSmall },
    viewFlexQty: { flex: 1, flexDirection: 'row', marginTop: 10 },
    viewImage: { height: 110, width: 110 },
    viewFlexCoupon: { flex: 3, flexDirection: 'row', marginTop: 20, marginLeft: 15, marginRight: 10 },
});

export default QuoteItem