import React, { useState } from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { TouchableOpacity, Alert, Modal } from 'react-native';
import { Card, CardItem, Text, Button, Icon, View } from 'native-base';
import Identify from '@helper/Identify';

const AddressItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const addressItem = props.address;

    function showDeleteItemPopup(data) {
        setModalVisible(true)
    }

    function renderName() {
        let name = '';
        if (addressItem.prefix !== undefined && addressItem.prefix !== null && addressItem.prefix !== '') {
            name += addressItem.prefix + ' ';
        }

        if (addressItem.firstname !== undefined && addressItem.firstname !== null && addressItem.firstname !== '') {
            name += addressItem.firstname + ' ';
        }

        if (addressItem.lastname !== undefined && addressItem.lastname !== null && addressItem.lastname !== '') {
            name += addressItem.lastname + ' ';
        }

        if (addressItem.suffix !== undefined && addressItem.suffix !== null && addressItem.suffix !== '') {
            name += addressItem.suffix;
        }

        if (name !== '') {
            return <Text style={{ fontWeight: 'bold', marginBottom: 10, textAlign: Identify.isRtl() ? 'right' : 'left' }}>{name}</Text>
        }
    }

    function renderCompany() {
        let company = '';
        if (addressItem.company !== undefined && addressItem.company !== null && addressItem.company !== '') {
            company = addressItem.company
        }
        if (company !== '') {
            return(
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start'  }}>
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold'}}>{Identify.__('Company')}</Text>
                        <Text style={{ fontWeight: 'bold'}}>:</Text>
                    </View>
                    <Text>{company}</Text>
                </View>
            )
        }
    }

    function renderStreet() {
        let street = '';
        if (addressItem.street !== undefined && addressItem.street !== null && addressItem.street !== '') {
            street = addressItem.street
        }
        if (street !== '') {
            return(
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start'  }}>
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold'}}>{Identify.__('Street')}</Text>
                        <Text style={{ fontWeight: 'bold'}}>:</Text>
                    </View>
                    <Text>{street}</Text>
                </View>
            )
        }
    }

    function renderCityStatePostCode() {
        let info = '';
        if (addressItem.city !== undefined && addressItem.city !== null && addressItem.city !== '') {
            info += addressItem.city + ', ';
        }
        if (addressItem.region !== undefined && addressItem.region !== null && addressItem.region !== '') {
            info += addressItem.region + ', ';
        }
        if (addressItem.postcode !== undefined && addressItem.postcode !== null && addressItem.postcode !== '') {
            info += addressItem.postcode;
        }
        if (info !== '') {
            return(
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start'  }}>
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold'}}>{Identify.__('City')}</Text>
                        <Text style={{ fontWeight: 'bold'}}>:</Text>
                    </View>
                    <Text>{info}</Text>
                </View>
            )
        }
    }

    function renderCountry() {
        let country = '';
        if (addressItem.country_name !== undefined && addressItem.country_name !== null && addressItem.country_name !== '') {
            country = addressItem.country_name;
        }
        if (country !== '') {
            return(
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start'  }}>
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold'}}>{Identify.__('Country')}</Text>
                        <Text style={{ fontWeight: 'bold'}}>:</Text>
                    </View>
                    <Text>{country}</Text>
                </View>
            )
        }
    }

    function renderPhone() {
        let telephone = '';
        if (addressItem.telephone !== undefined && addressItem.telephone !== null && addressItem.telephone !== '') {
            telephone = addressItem.telephone;
        }
        if (telephone !== '') {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start'  }}>
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold'}}>{Identify.__('Phone')}</Text>
                        <Text style={{ fontWeight: 'bold'}}>:</Text>
                    </View>
                    <Text>{telephone}</Text>
                </View>
            )
        }
    }

    function renderEmail() {
        let email = '';
        if (addressItem.email !== undefined && addressItem.email !== null && addressItem.email !== '') {
            email = addressItem.email;
        }
        if (email !== '') {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start'  }}>
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold'}}>{Identify.__('Email')}</Text>
                        <Text style={{ fontWeight: 'bold'}}>:</Text>
                    </View>
                    <Text>{email}</Text>
                </View>
            )
        }
    }

    function onChooseAddress() {
        props.parent.onSelectAddress(addressItem);
    }

    return (
        <View 
            style ={{
                marginBottom: 10, 
                flex: 1, 
                borderRadius: 10, 
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.02,
                shadowRadius: 30 }}>
            <TouchableOpacity style={{ borderRadius: 10 }} onPress={() => { onChooseAddress() }}>
                <Card style={{ borderRadius: 10 ,padding: 5 }}>
                    <CardItem style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        {renderName()}
                        {renderCompany()}
                        {renderStreet()}
                        {renderCityStatePostCode()}
                        {renderCountry()}
                        {renderPhone()}
                        {renderEmail()}
                    </CardItem>
                    {!props.parent.mode.includes('checkout') && <TouchableOpacity style={{top: 0, alignSelf: 'flex-start' }}
                        onPress={() => { showDeleteItemPopup() }}>
                        <Text style={{ color: '#FF4040', borderWidth: 0.5, borderColor: Identify.theme.line_color, borderRadius: 7, width: 60, padding: 5, marginLeft: 12, marginRight: 12, textAlign: 'center' }}>{Identify.__('Delete')}</Text>
                    </TouchableOpacity>}
                </Card>
            </TouchableOpacity>
            <Modal 
                visible={modalVisible} 
                animationType='slide'
                transparent={true}>
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
                                <Text style={{ fontSize: 22, fontWeight: 'bold'}}>{Identify.__('Delete Address')}</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Icon name='close' type='AntDesign' style= {{ color: Identify.theme.icon_color, fontSize: 24,  }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ textAlign: 'center', marginTop: 30, marginBottom: 30, fontSize: 20, width: '80%', alignSelf: 'center' }}>{Identify.__('Are you sure want to Delete this Address?')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                <TouchableOpacity
                                    onPress={() => props.parent.deleteAddress(addressItem.entity_id)} 
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
            </Modal>
        </View>
    );
}

export default AddressItem;
