import React from 'react';
import SimiComponent from "@base/components/SimiComponent";
import { Image, TouchableOpacity, View, Animated } from 'react-native';
import { Text } from 'native-base';
import Price from '@customize/catalog/components/product/price';
import NavigationManager from '@helper/NavigationManager';
import Identify from '@helper/Identify';
import styles from './styles';
import { scale, verticalScale } from 'react-native-size-matters';
import Events from '@helper/config/events';
import md5 from 'md5';
import OutStockLabel from '@customize/catalog/components/product/outStockLabel';
import material from '@theme/variables/material';

const HorizontalItem = (props) => {
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
    function openProduct(item) {
        NavigationManager.openPage(props.navigation, 'ProductDetail', {
            productId: item.entity_id,
            objData: item
        });
    }

    function renderOutStock(item) {
        if (item.is_salable == '0') {
            return <OutStockLabel />
        }
    }

    function renderSpecialPriceLabel() {
        let saleOff = null;
        let price = props.item.app_prices;
        if (price.has_special_price !== null && price.has_special_price === 1) {
            if (price.show_ex_in_price != null && price.show_ex_in_price == 1) {
                saleOff = 100 - (price.price_including_tax.price / price.regular_price) * 100;
                saleOff = saleOff.toFixed(0);
            } else {
                saleOff = 100 - (price.price / price.regular_price) * 100;
                saleOff = saleOff.toFixed(0);
            }
        }
        let showLabel = Identify.getMerchantConfig().storeview.catalog.frontend.show_discount_label_in_product;
        if (saleOff) {
            if (showLabel && showLabel !== '1') {
                return null;
            }
            return (
                <View
                    style={{
                        position: 'absolute',
                        zIndex: 99,
                        left: 10,
                        top: 10,
                        backgroundColor: 'white',
                        borderRadius: 4,
                        borderColor: '#f0f0f0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        padding: 5
                    }}
                >
                    <Text style={{ color: Identify.theme.button_background, fontFamily: material.fontBold, textAlign: 'center' }}>{saleOff + '% ' + Identify.__('OFF')}</Text>
                </View>
            )
        }
    }
    function renderImage(item) {
        let source = (item.images && item.images.length > 0) ? { uri: item.images[0].url } : require('@media/logo.png');
        return (
            <View style={[styles.imageListItem,
                // { borderWidth: 0.5, borderColor: material.imageBorderColor }
            ]}>
                {renderSpecialPriceLabel()}
                <Image resizeMode='contain' source={source} style={{ width: scale(130), height: scale(130), overflow: 'hidden' }} />
                {renderOutStock(item)}
                {dispatchContent()}
            </View>
        );
    }

    function checkTypeIdAndPrice(item) {
        if (item.type_id === 'configurable' && item.app_prices && item.app_prices.price == 0) {
            return false;
        }
        return true;
    }

    function renderContent(item) {
        return (
            <View style={{ flex: 1, alignItems: 'flex-start', marginTop: 5, justifyContent: 'space-between' }}>
                <Text numberOfLines={2} style={[styles.title, { fontFamily: material.fontBold }]}>{item.name}</Text>
                {checkTypeIdAndPrice(item) && <Price
                    type={item.type_id}
                    prices={item.app_prices}
                    styleOneRowPrice={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}
                    styleDiscount={{ fontWeight: '100' }}
                    styleTwoRowPrice={{ flexDirection: 'column', justifyContent: 'space-between' }}
                    navigation={props.navigation}
                />}
            </View>
        );
    }

    function dispatchContent() {
        let items = [];
        if (Events.events.add_labels) {
            for (let i = 0; i < Events.events.add_labels.length; i++) {
                let node = Events.events.add_labels[i];
                if (node.active === true) {
                    let key = md5("add_labels" + i);
                    let price = item.app_prices;
                    let hasSpecial = price.has_special_price !== null && price.has_special_price === 1;
                    let Content = node.content;
                    items.push(<Content key={key} hasSpecial={hasSpecial} type={'1'} product={props.item} />)
                }
            }
        }
        return items;
    }

    let item = props.item;
    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnimation }],
                minHeight: 230,
                margin: 5
            }}
        >
            <TouchableOpacity
                onPress={() => { openProduct(item) }}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={{
                    ...styles.listItem,
                }}
            >
                <View style={{ ...styles.shadowBox, padding: 10, borderRadius: 13, backgroundColor: 'white' }}>
                    {renderImage(item)}
                    {renderContent(item)}
                </View>
            </TouchableOpacity>
        </Animated.View>
    )

}
export default HorizontalItem