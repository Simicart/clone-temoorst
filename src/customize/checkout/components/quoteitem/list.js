import React, {useState} from 'react';
import { FlatList, TouchableOpacity, Modal } from 'react-native';
import Identify from '@helper/Identify';
import { View, Text, H3, Icon } from 'native-base';
import material from '@theme/variables/material';
import QuoteItem from './item';
import { quoteitems } from '@helper/constants';


const ListItems = (props) => {
    let [modalVisible, setModalVisible] = useState(false)

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
        setModalVisible(!modalVisible)
        let listItem = {};
        list.map((item, index) => listItem[item.item_id] = 0)
        props.parent.removeAll(listItem)
    }

    function renderModal(){
        return(
            <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} 
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
                <TouchableOpacity 
                    style={{ height: '32%', width: '100%', backgroundColor: Identify.theme.app_background, borderRadius: 15 }}
                    activeOpacity={1}>
                    <View 
                        style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            marginHorizontal: 15,
                            paddingTop: 15, 
                            paddingBottom: 15,
                            borderBottomWidth: 0.5, 
                            borderBottomColor: Identify.theme.line_color  }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold'}}>{Identify.__('Remove All')}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Icon name='close' type='AntDesign' style= {{ color: Identify.theme.icon_color, fontSize: 24,  }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: 'center', marginTop: 30, marginBottom: 30, fontSize: 20, width: '80%', alignSelf: 'center' }}>{Identify.__('Are you sure want to delete all item?')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => removeAllItems()} 
                            style= {{width: '40%', height: 50, borderWidth: 3, borderColor: Identify.theme.button_background, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: Identify.theme.button_background, fontSize: 16, fontWeight: 'bold' }}>{Identify.__('Yes')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => setModalVisible(!modalVisible)}
                            style= {{width: '40%', height: 50, borderWidth: 3, borderColor: Identify.theme.button_background, borderRadius: 10, alignItems: 'center', backgroundColor: Identify.theme.button_background, justifyContent: 'center' }}>
                            <Text style={{ color: Identify.theme.button_text_color, fontSize: 16, fontWeight: 'bold' }}>{Identify.__('No')}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>                        
        </TouchableOpacity>
        )
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
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={{ color: Identify.theme.button_background, fontWeight: 'bold' }}>
                            {Identify.__('Remove All')}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Modal 
                    visible={modalVisible} 
                    animationType='slide'
                    transparent={true}>
                        { renderModal()}
                </Modal>
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
