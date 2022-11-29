import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card, CardItem, Text, H3 } from 'native-base';
import Identify from '@helper/Identify';
import styles from './detailStyles';
import material from '@theme/variables/material';

const OrderBilling = (props) => {
    function renderPaymentType() {
        return (
            <CardItem>
                <Text style={[styles.title, {color: '#595656', flex: 3}]}>{Identify.__('Payment type')}</Text>
                <Text style={{ flex: 7 }}>{Identify.__(props.order.payment_method.toUpperCase())}</Text>
            </CardItem>
        )
    }

    function renderCouponCode() {
        let couponCode = Identify.__('None');
        if ( props.order.coupon_code !== undefined &&  props.order.coupon_code !== null &&  props.order.coupon_code !== '') {
            couponCode =  props.order.coupon_code;
        }
        return (
            <CardItem>
                <Text style={[styles.title, {color: '#595656', flex: 3}]}>{Identify.__('Coupon code')}</Text>
                <Text style={{ flex: 7 }}>{couponCode}</Text>
            </CardItem>
        )
    }

    return (
        <Card style={{ flex: 1, borderColor: 'white', shadowColor: '#fff', borderBottomWidth: 2, borderBottomColor:Identify.theme.line_color }} key={'payment'}>
            { renderPaymentType()}
            { renderCouponCode()}
        </Card>
    );
}

export default OrderBilling;