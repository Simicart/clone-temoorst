import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Identify from '@helper/Identify';
import { View, Text, H3 } from 'native-base';
import material from '@theme/variables/material';
import QuoteItem from './item';

const ListItems = (props) => {
    let list = props.list ? props.list : props.parent.list;
    function generatePropsFlatlist(list) {
        return {
            data: list,
            extraData: props.parent.list,
            showsVerticalScrollIndicator: false
        }
    }

    function renderItem(item) {
        return (
            <QuoteItem data={item} parent={props.parent} />
        );
    }

    function removeAllItems() {

    }


    if (list) {
        return (
            <View
                style={{ margin: 20 }}
            >
                {props.from == 'checkout' && <Text style={{ fontFamily: material.fontBold, width: '100%', backgroundColor: material.sectionColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10, textAlign: 'left' }}>{Identify.__('Shipment Details')}</Text>}
                {props.from == 'order_detail' && <H3 style={{ width: '100%', backgroundColor: '#EDEDED', paddingLeft: 15, paddingRight: 10, paddingTop: 10, paddingBottom: 10, textAlign: 'left' }}>{Identify.__('Items').toUpperCase()}</H3>}
                <FlatList
                    {...generatePropsFlatlist(list)}
                    keyExtractor={(item) => item.item_id}
                    renderItem={({ item }) =>
                        renderItem(item)
                    } />
                <TouchableOpacity onPress={() => removeAllItems()}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={{ color: Identify.theme.button_background, fontWeight: 'bold' }}>
                            Remove All
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return null;
}

ListItems.defaultProps = {
    is_go_detail: false,
    from: null
};

export default ListItems;
