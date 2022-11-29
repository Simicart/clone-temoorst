import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card, CardItem, Icon, H3, Right, Text, View } from 'native-base';
import Identify from '@helper/Identify';
import material from '@theme/variables/material';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const AddNewAddress = (props) => {
    console.log("props: ", props);
    function onClickAddNew() {
        props.parent.addNewAddress()
    }

    function renderMessage() {
        let message = 'Or choose address(es) to edit';
        if (props.parent.mode === 'checkout_select_address') {
            message = 'Or choose an address to continue';
        } else if (props.parent.mode.includes('edit')) {
            message = 'Or choose an address to edit';
        }
        return (
            <View style={{ paddingLeft: 27, paddingRight: 27, paddingTop: 10, paddingBottom: 10 }}>
                <Text style={{ fontSize: 16, textAlign: 'left' }}>{Identify.__(message)}</Text>
            </View>
        );
    }
    if (props.parent.addressData.addresses.length == 0) {
        return (
            <View style={{ height: height - 250, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../images/location.png')} style={{ height: 100, width: 100 }} />
                    </View>
                    <View style={{ marginVertical: 25 }}>
                        <Text style={{ textAlign: 'center', fontWeight: "bold", fontSize: 18 }}>
                            {Identify.__("Address book is empty")}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => { onClickAddNew() }}>
                        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Identify.theme.button_background, borderRadius: 12 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
                                <Icon name={'add'} style={{ color: "white" }} />
                                <Text style={{ fontFamily: material.fontBold, flex: 1, marginLeft: 10, color: "white", fontWeight: "bold", fontSize: 18 }}>{Identify.__('Add new address')}</Text>
                            </View>
                            {/* <Right>
                                    <Icon name={Identify.isRtl() ? 'ios-arrow-back' : "ios-arrow-forward"} style={{ color: 'black' }} />
                                </Right> */}

                        </View>
                    </TouchableOpacity>
                    {/* {renderMessage()} */}
                </View>
            </View>
        );
    } else {
        return (
            <View style={{ position: 'absolute', bottom: 0, right: 0, height: 130, width: width, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { onClickAddNew() }}>
                    <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Identify.theme.button_background, borderRadius: 12, width: width - 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
                            <Icon name={'add'} style={{ color: "white" }} />
                            <Text style={{ fontFamily: material.fontBold, flex: 1, marginLeft: 10, color: "white", fontWeight: "bold", fontSize: 18 }}>{Identify.__('Add new address')}</Text>
                        </View>
                        {/* <Right>
                                    <Icon name={Identify.isRtl() ? 'ios-arrow-back' : "ios-arrow-forward"} style={{ color: 'black' }} />
                                </Right> */}

                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AddNewAddress;