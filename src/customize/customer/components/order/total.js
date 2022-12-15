import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card, CardItem, Text, View } from 'native-base';
import Total from '../../../checkout/components/totals';
import Identify from '@helper/Identify';
import styles from './detailStyles';

const OrderTotal = (props) => {
    let total = props.order.total;

    function renderSubToTal() {
        return(
            <CardItem style={{ flexDirection: Identify.isRtl() ? 'row-reverse' : 'row' }}>
                <Text style={[styles.title, {color: '#595656', flex: 4, textAlign: Identify.isRtl() ? 'right' : 'left'}]}>{Identify.__('Sub Total')}</Text>
                <Text style={{ flex: 6, textAlign: Identify.isRtl() ? 'left' : 'right' }}>{Identify.formatPriceWithCurrency(total.subtotal_incl_tax, total.currency_symbol)}</Text>
            </CardItem>
        )
    }

    function renderDeliveryCharge() {
        return(
            <CardItem style={{ flexDirection: Identify.isRtl() ? 'row-reverse' : 'row' }}>
                <Text style={[styles.title, {color: '#595656', flex: 4, textAlign: Identify.isRtl() ? 'right' : 'left'}]}>{Identify.__('Delivery Charge')}</Text>
                <Text style={{ flex: 6, textAlign: Identify.isRtl() ? 'left' : 'right' }}>{Identify.formatPriceWithCurrency(total.shipping_hand_incl_tax, total.currency_symbol)}</Text>
            </CardItem>
        )
    }

    function renderGrandTotal() {
        return(
            <CardItem style={{ flexDirection: Identify.isRtl() ? 'row-reverse' : 'row' }}>
                <Text style={[styles.title, { flex: 4, fontWeight: 'bold', fontSize: 18, textAlign: Identify.isRtl() ? 'right' : 'left' }]}>{Identify.__('Grand Total')}</Text>
                <Text style={{ flex: 6, fontWeight: 'bold', fontSize: 18, textAlign: Identify.isRtl() ? 'left' : 'right' }}>{Identify.formatPriceWithCurrency(total.grand_total_incl_tax, total.currency_symbol)}</Text>
            </CardItem>
        )
    }

    return (
        <View>
            <Card style={{ flex: 1, borderColor: 'white', shadowColor: '#fff', borderBottomWidth: 2, borderBottomColor:Identify.theme.line_color }} key={'payment'}>
                { renderSubToTal()}
                { renderDeliveryCharge()}
            </Card>
            { renderGrandTotal()}
        </View>
        )
}

export default OrderTotal;