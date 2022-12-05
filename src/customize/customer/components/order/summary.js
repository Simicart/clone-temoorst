import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card, CardItem, Text } from 'native-base';
import Identify from '@helper/Identify';
import styles from './detailStyles';
import material from '@theme/variables/material';

const OrderSummary = (props) => {
    function renderOrderNumber() {
        return (
            <CardItem>
                <Text style={{ fontFamily: material.fontBold, fontSize: 20 }}>{Identify.__('Order ID: # ')}</Text>
                <Text style={{ fontFamily: material.fontBold, fontSize: 20 }}>{props.order.increment_id}</Text>
            </CardItem>
        );
    }

    function renderDate() {
        return (
            <CardItem>
                <Text style={[styles.title, {color: '#595656', flex: 3}]}>{Identify.__('Date')}</Text>
                <Text style={{ flex: 7 }}>{props.order.updated_at}</Text>
            </CardItem>
        );
    }

    function renderOrderTotal() {
        return (
            <CardItem>
                <Text style={[styles.title, {color: '#595656', flex: 3}]}>{Identify.__('Order Total')}</Text>
                <Text style={{ flex: 7 }} >{Identify.formatPriceWithCurrency(props.order.total.grand_total_incl_tax, props.order.total.currency_symbol)}</Text>
            </CardItem>
        );
    }

    function renderStatus() {
        return (
            <CardItem>
                <Text style={[styles.title, {color: '#595656', flex: 3}]}>{Identify.__('Status')}</Text>
                <Text style={{ color: props.order.status === 'canceled' ? 'red' : '', flex: 7 }}>{Identify.__(props.order.status)}</Text>
            </CardItem>
        );
    }

    return (
        <Card style={{ flex: 1, borderColor: 'white', shadowColor: '#fff', borderBottomWidth: 2, borderBottomColor:Identify.theme.line_color }} key={'base'}>
            { renderOrderNumber()}
            { renderDate()}
            { renderOrderTotal()}
            { renderStatus()}
        </Card>
    );
}

export default OrderSummary;