import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { TouchableOpacity, Alert, View } from 'react-native';
import { Card, CardItem, Text, Button, Icon } from 'native-base';
import Identify from '@helper/Identify';

const AddressItem = (props) => {

    const addressItem = props.address;

    function showDeleteItemPopup(data) {
        Alert.alert(
            Identify.__('Warning'),
            Identify.__('Are you sure you want to delete this item?'),
            [
                { text: Identify.__('Cancel'), onPress: () => { style: 'cancel' } },
                {
                    text: Identify.__('OK'), onPress: () => {
                        props.parent.deleteAddress(addressItem.entity_id);
                    }
                },
            ],
            { cancelable: true }
        );
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
            return <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                    Name:
                </Text>
                <Text>
                    {name}
                </Text>
            </View>
        }
    }

    function renderCompany() {
        let company = '';
        if (addressItem.company !== undefined && addressItem.company !== null && addressItem.company !== '') {
            company = addressItem.company
        }
        if (company !== '') {
            return <Text>{company}</Text>
        }
    }

    function renderStreet() {
        let street = '';
        if (addressItem.street !== undefined && addressItem.street !== null && addressItem.street !== '') {
            street = addressItem.street + ', ';
        }
        if (addressItem.city !== undefined && addressItem.city !== null && addressItem.city !== '') {
            street += addressItem.city + ', ';
        }
        if (addressItem.country_name !== undefined && addressItem.country_name !== null && addressItem.country_name !== '') {
            street += addressItem.country_name;
        }
        if (street !== '') {
            return <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                    Adress:
                </Text>
                <Text>
                    {street}
                </Text>
            </View>
        }
    }



    function renderPhone() {
        let telephone = '';
        if (addressItem.telephone !== undefined && addressItem.telephone !== null && addressItem.telephone !== '') {
            telephone = addressItem.telephone;
        }
        if (telephone !== '') {
            return <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                    Phone:
                </Text>
                <Text>
                    {telephone}
                </Text>
            </View>
        }
    }

    function renderEmail() {
        let email = '';
        if (addressItem.email !== undefined && addressItem.email !== null && addressItem.email !== '') {
            email = addressItem.email;
        }
        if (email !== '') {
            return <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                    Email:
                </Text>
                <Text>
                    {email}
                </Text>
            </View>
        }
    }

    function onChooseAddress() {
        props.parent.onSelectAddress(addressItem);
    }

    return (
        <TouchableOpacity onPress={() => { onChooseAddress() }}>
            <View style={{
                marginVertical: 10, borderRadius: 12, borderColor: '#e0e0e0', borderWidth: 1, padding: 15, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 2,
            }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    {renderName()}
                    {/* {renderCompany()} */}
                    {renderStreet()}
                    {/* {renderCityStatePostCode()}                     */}
                    {renderPhone()}
                    {renderEmail()}
                </View>
                {!props.parent.mode.includes('checkout') && <Button style={{ position: 'absolute', top: 0, right: 0 }} transparent
                    onPress={() => { showDeleteItemPopup() }}>
                    <Icon name="ios-trash" />
                </Button>}
            </View>
        </TouchableOpacity>
    );
}

export default AddressItem;
