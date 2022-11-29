import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card, CardItem, Text, View } from 'native-base';
import Total from '../../../checkout/components/totals';
import Identify from '../../../../core/helper/Identify';
import styles from './detailStyles';

const OrderTotal = (props) => {
    let total = props.order.total;

    function renderSubToTal() {
        return(
            <CardItem>
                <Text style={[styles.title, {color: '#595656', flex: 4}]}>{Identify.__('Sub Total')}</Text>
                <Text style={{ flex: 6, textAlign:'right' }}>{Identify.formatPriceWithCurrency(total.subtotal_incl_tax, total.currency_symbol)}</Text>
            </CardItem>
        )
    }

    function renderDeliveryCharge() {
        return(
            <CardItem>
                <Text style={[styles.title, {color: '#595656', flex: 4}]}>{Identify.__('Delivery Charge')}</Text>
                <Text style={{ flex: 6, textAlign:'right' }}>{Identify.formatPriceWithCurrency(total.shipping_hand_incl_tax, total.currency_symbol)}</Text>
            </CardItem>
        )
    }

    function renderGrandTotal() {
        return(
            <CardItem>
                <Text style={[styles.title, { flex: 4, fontWeight: 'bold', fontSize: 18 }]}>{Identify.__('Grand Total')}</Text>
                <Text style={{ flex: 6, fontWeight: 'bold', textAlign:'right', fontSize: 18 }}>{Identify.formatPriceWithCurrency(total.grand_total_incl_tax, total.currency_symbol)}</Text>
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