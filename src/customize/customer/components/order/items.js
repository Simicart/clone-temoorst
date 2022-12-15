import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card } from 'native-base';
import ListQuoteItems from '../../../checkout/components/quoteitem/list';
import Identify from '@helper/Identify';
import { FlatList, Image, View, Text } from 'react-native';



const OrderSummary = (props) => {

    let items = [];
    let orderItems = props.order.order_items;
    for (let index in orderItems) {
        let item = {
            ...orderItems[index]
        };
        item['qty'] = item.qty_ordered;
        items.push(item);
    }

    function renderItem(item) {
        console.log(item)
        return(
            <Card style={{ flex: 1, borderRadius: 10, flexDirection: Identify.isRtl() ? 'row-reverse' : 'row', marginTop: 10, marginBottom: 10 }}>
                <View style = {{ flex: 4, justifyContent: 'center' }}>
                    <Image style={{ width: 100, height: 100, marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10 }} source={{ uri: item.image }} />
                </View>
                <View style= {{ flexDirection: 'column', marginTop: 20, marginBottom: 20, flex: 6 }}>
                    <Text style={{ marginTop: 5, marginRight: 20, marginLeft: 20, textAlign: Identify.isRtl() ? 'right' : 'left' }} numberOfLines={3}>{item.name}</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 10 }}>
                        <Text style = {{ marginHorizontal: 20 ,fontWeight: 'bold', textAlign: Identify.isRtl() ? 'right' : 'left' }}>{Identify.formatPriceWithCurrency(item.price, props.order.total.currency_symbol)}</Text>
                        <View style={{ flexDirection: Identify.isRtl() ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: 5, marginHorizontal: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>{Identify.__('Quantity')}</Text>
                            <View style={{ height: 25, width: 25, marginHorizontal: 5, borderRadius: 5, borderWidth: 0.5, borderColor: '#c3c3c3', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{parseInt(item.qty)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        )
    }

    return (
        <View>
            <Text style={{ paddingTop: 10, paddingBottom: 10, marginTop: 10, marginHorizontal: 5, fontWeight: 'bold', textAlign: Identify.isRtl() ? 'right' : 'left' }}>{Identify.__('Purchased Items')}</Text>
            <Card style={{ flex: 1, paddingBottom: 25, borderColor: Identify.theme.app_background, shadowColor: '#fff', borderBottomWidth: 2, borderBottomColor: Identify.theme.line_color }} key={'items'}>
                <FlatList
                    data={items}
                    renderItem={({ item }) => renderItem(item)} />
            </Card>
        </View>
    );
}

export default OrderSummary;