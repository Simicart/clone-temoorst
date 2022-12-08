import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { TouchableOpacity, Button } from 'react-native';
import { Card, CardItem, Icon, H3, Right, Text, View } from 'native-base';
import Identify from '@helper/Identify';
import material from '@theme/variables/material';

const AddNewAddress = (props) => {

    function onClickAddNew() {
         props.parent.addNewAddress()
    }

    function renderMessage() {
        let message = '';
        if ( props.parent.mode === 'checkout_select_address') {
            message = 'Or choose an address to continue';
        } else if ( props.parent.mode.includes('edit')) {
            message = 'Or choose an address to edit';
        }
        if (message !== '')return (
            <View style={{ paddingLeft: 27, paddingRight: 27, paddingTop: 10, paddingBottom: 10 }}>
                <Text style={{ fontSize: 16, textAlign: 'left' }}>{Identify.__(message)}</Text>
            </View>
        );
        else return null
    }

    return (
        <View>
            {/* <TouchableOpacity onPress={() => {  onClickAddNew() }}> */}
                {/* <Card style={{ marginLeft: 12, marginRight: 12, marginTop: 12, height: 50 }}>
                    <CardItem style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name={'add-circle'} />
                        <H3 style={{ fontFamily: material.fontBold, flex: 1, marginLeft: 10 }}>{Identify.__('Add an address')}</H3>
                    </CardItem>
                </Card> */}
                <Card style={{ 
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    height: 90,
                    borderRadius: 10, 
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5 }}>
                    <TouchableOpacity style={{ flex: 1,  }}
                        onPress={() => {  onClickAddNew() }}>
                        <View style={{ flex: 1, flexDirection: 'row', margin: 20, marginBottom: 20, borderRadius: 10, backgroundColor: Identify.theme.button_background, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='plus' type='AntDesign' style={{ color: 'white', fontWeight: 'bold', paddingRight: 5 }}/>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white'  }}>{Identify.__('Add New Address')}</Text>                        
                        </View>
                    </TouchableOpacity>
                </Card>
            {/* </TouchableOpacity> */}
            {/* { renderMessage()} */}
        </View>
    );
}

export default AddNewAddress;