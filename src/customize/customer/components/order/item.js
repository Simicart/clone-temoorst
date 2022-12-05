import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, View } from 'native-base';
import NavigationManager from '@helper/NavigationManager';
import Identify from '@helper/Identify';
import material from '@theme/variables/material';

const OrderBilling = (props) => {
    const openOrderHistoryDetail = () => {
        NavigationManager.openPage(props.navigation, 'OrderHistoryDetail', {
            orderId: props.order.entity_id,
            order: props.order
        });
    }

    const renderShipTo = (shipping) => {
        let shipTo = '';
        if (shipping.prefix !== undefined && shipping.prefix !== '' && shipping.prefix !== null) {
            shipTo += shipping.prefix;
        }

        if (shipping.firstname !== undefined && shipping.firstname !== '' && shipping.firstname !== null) {
            shipTo += ' ' + shipping.firstname;
        }

        if (shipping.lastname !== undefined && shipping.lastname !== '' && shipping.lastname !== null) {
            shipTo += ' ' + shipping.lastname;
        }

        if (shipping.suffix !== undefined && shipping.suffix !== '' && shipping.suffix !== null) {
            shipTo += ' ' + shipping.suffix;
        }

        return shipTo;
    }

    function renderOrderNumber() {
        return (
            <CardItem style = {{ paddingTop: 5, paddingBottom: 5, marginBottom: 10 }} listItemPadding={0}>
                <Text style={{ fontFamily: material.fontBold, fontSize: 16 }}>{Identify.__('Order ID: ')}</Text>
                <Text style={{ fontFamily: material.fontBold, fontSize: 16 }}>{props.order.increment_id}</Text>
            </CardItem>
        );
    }

    function renderDate() {
        return (
            <CardItem style = {{ paddingTop: 5, paddingBottom: 5 }} listItemPadding={0}>
                <Text style={{ fontFamily: material.fontBold, color: '#595656' }}>{Identify.__('Date: ')}</Text>
                <Text style={{ fontFamily: material.fontBold, color: '#595656' }}>{props.order.updated_at}</Text>
            </CardItem>
        );
    }

    function renderShipping() {
        return (
            <CardItem style = {{ paddingTop: 5, paddingBottom: 5 }} listItemPadding={0}>
                <Text style={{ fontFamily: material.fontBold, color: '#595656' }}>{Identify.__('Ship To: ')}</Text>
                <Text style={{ fontFamily: material.fontBold, color: '#595656' }}>{renderShipTo(props.order.shipping_address)}</Text>
            </CardItem>
        );
    }

    function renderOrderTotal() {
        return (
            <CardItem style = {{ paddingTop: 5, paddingBottom: 5 }} listItemPadding={0}>
                <Text style={{ fontFamily: material.fontBold, color: '#595656' }}>{Identify.__('Order Total: ')}</Text>
                <Text style={{ fontFamily: material.fontBold, color: '#595656' }}>{Identify.formatPriceWithCurrency(props.order.total.grand_total_incl_tax, props.order.total.currency_symbol)}</Text>
            </CardItem>
        );
    }

    function renderStatus() {
        return (
            <CardItem style = {{ paddingTop: 5, paddingBottom: 5 }} listItemPadding={0}>
                <Text style={{ fontFamily: material.fontBold, color: '#595656' }}>{Identify.__('Status: ')}</Text>
                <Text style={{ fontFamily: material.fontBold, color:props.order.status === 'canceled' ? 'red' : '#595656' }}>{Identify.__(props.order.status)}</Text>
            </CardItem>
        );
    }

    function renderItem() {
        return (
            <Card style={{ borderRadius: 10, padding: 5 }} key={props.order.entity_id}>
                {renderOrderNumber()}
                {renderDate()}
                {renderShipping()}
                {renderOrderTotal()}
                {renderStatus()}
            </Card>
        );
    }

    return (
        <View 
            style ={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10, 
                flex: 1, 
                borderRadius: 10, 
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.02,
                shadowRadius: 30 }}>
            <TouchableOpacity style={{ flex: 1, borderRadius: 10, }}
                onPress={() => {
                    openOrderHistoryDetail();
                }}>
                {renderItem()}
            </TouchableOpacity>
        </View>
    );
}

export default OrderBilling;