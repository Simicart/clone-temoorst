import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { FlatList } from 'react-native';
import AddressItem from './item';

const AddressList = (props) => {

    function createListProps() {
        return {
            style: { marginLeft: 5, marginRight: 5 },
            data:  props.addresses,
            extraData:  props.parent.props.data
        };
    }

    function renderItem(item) {
        return (
            <AddressItem address={item} parent={ props.parent} />
        );
    }

    return (
        <FlatList
            {... createListProps()}
            keyExtractor={(item) => item.entity_id}
            renderItem={({ item }) =>  renderItem(item)}
        />
    );
}

export default AddressList;