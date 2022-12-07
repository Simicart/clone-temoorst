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
        return(
        <Card style={{ flex: 1, borderRadius: 10, flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <View style = {{ flex: 4 }}>
                <Image style={{ width: 120, height: 120, marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10 }} source={{ uri: item.image }} />
            </View>
            <View style= {{ flexDirection: 'column', marginTop: 20, marginBottom: 20, flex: 6 }}>
                <Text>{item.name}</Text>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style = {{ fontWeight: 'bold' }}>{Identify.formatPriceWithCurrency(item.price, props.order.total.currency_symbol)}</Text>
                    <Text style = {{ fontWeight: 'bold' }}>{Identify.__('Quantity: ')} {parseInt(item.qty)}</Text>
                </View>
            </View>
        </Card>
        )
    }

    return (
        <View>
            <Text style={{ paddingTop: 10, paddingBottom: 10, marginTop: 10, fontWeight: 'bold' }}>{ Identify.__('Purchased Items') }</Text>
            <Card style={{ flex: 1, paddingBottom: 25, borderColor: Identify.theme.app_background, shadowColor: '#fff', borderBottomWidth: 2, borderBottomColor: Identify.theme.line_color }} key={'items'}>
                <FlatList
                    data={items}
                    renderItem={({item}) => renderItem(item)}/>
            </Card>
        </View>
    );
}

export default OrderSummary;