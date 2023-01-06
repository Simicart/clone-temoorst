import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card, CardItem, Text, H3 } from 'native-base';
import Identify from '@helper/Identify';
import styles from './detailStyles';
import material from '@theme/variables/material';


const OrderShipping = (props) => {

    function renderName(item) {
        let name = '';
        if (item.prefix !== undefined && item.prefix !== null && item.prefix !== '') {
            name += item.prefix + ' ';
        }

        if (item.firstname !== undefined && item.firstname !== null && item.firstname !== '') {
            name += item.firstname + ' ';
        }

        if (item.lastname !== undefined && item.lastname !== null && item.lastname !== '') {
            name += item.lastname + ' ';
        }

        if (item.suffix !== undefined && item.suffix !== null && item.suffix !== '') {
            name += item.suffix;
        }
        return(
            <CardItem style={{ flexDirection: 'row' }}>
                <Text style={[styles.title, {color: '#595656', flex: 3, textAlign: 'left'}]}>{Identify.__('Name')}</Text>
                <Text style={{ flex: 7, marginHorizontal: 10, textAlign: 'left' }}>{name}</Text>
            </CardItem>
        )
    }

    function renderCompany(item) {
        let company = '';
        if (item.company !== undefined && item.company !== null && item.company !== '') {
            company = item.company
        }
        return(
            <CardItem style={{ flexDirection: 'row' }}>
                <Text style={[styles.title, {color: '#595656', flex: 3, textAlign: 'left'}]}>{Identify.__('Company')}</Text>
                <Text style={{ flex: 7, marginHorizontal: 10, textAlign: 'left' }}>{company}</Text>
            </CardItem>
        )
    }

    function renderStreet(item) {
        let street = '';
        if (item.street !== undefined && item.street !== null && item.street !== '') {
            street = item.street
        }
        return(
            <CardItem style={{ flexDirection: 'row' }}>
                <Text style={[styles.title, {color: '#595656', flex: 3, textAlign: 'left'}]}>{Identify.__('Street')}</Text>
                <Text style={{ flex: 7, marginHorizontal: 10, textAlign: 'left' }}>{street}</Text>
            </CardItem>
        )
    }

    function renderCityStatePostCode(item) {
        let info = '';
        if (item.city !== undefined && item.city !== null && item.city !== '') {
            info += item.city + ', ';
        }
        if (item.region !== undefined && item.region !== null && item.region !== '') {
            info += item.region + ', ';
        }
        if (item.postcode !== undefined && item.postcode !== null && item.postcode !== '') {
            info += item.postcode;
        }
        return(
            <CardItem style={{ flexDirection: 'row' }}>
                <Text style={[styles.title, {color: '#595656', flex: 3, textAlign: 'left'}]}>{Identify.__('City')}</Text>
                <Text style={{ color: props.order.status === 'canceled' ? 'red' : '', flex: 7, marginHorizontal: 10, textAlign: 'left' }}>{info}</Text>
            </CardItem>
        )
    }

    function renderCountry(item) {
        let country = '';
        if (item.country_name !== undefined && item.country_name !== null && item.country_name !== '') {
            country = item.country_name;
            return(
                <CardItem style={{ flexDirection: 'row' }}>
                    <Text style={[styles.title, {color: '#595656', flex: 3, textAlign: 'left'}]}>{Identify.__('Country')}</Text>
                    <Text style={{ flex: 7, marginHorizontal: 10, textAlign: 'left' }}>{country}</Text>
                </CardItem>
            )
        }
        else return null;
        
    }

    function renderPhone(item) {
        let telephone = '';
        if (item.telephone !== undefined && item.telephone !== null && item.telephone !== '') {
            telephone = item.telephone;
        }
        return(
            <CardItem style={{ flexDirection: 'row' }}>
                <Text style={[styles.title, {color: '#595656', flex: 3, textAlign: 'left'}]}>{Identify.__('Phone')}</Text>
                <Text style={{ flex: 7, marginHorizontal: 10, textAlign: 'left' }}>{telephone}</Text>
            </CardItem>
        )
    }

    function renderEmail(item) {
        let email = '';
        if (item.email !== undefined && item.email !== null && item.email !== '') {
            email = item.email;
        }
        return(
            <CardItem style={{ flexDirection: 'row' }}>
                <Text style={[styles.title, {color: '#595656', flex: 3, textAlign: 'left'}]}>{Identify.__('Email')}</Text>
                <Text style={{ flex: 7, marginHorizontal: 10, textAlign: 'left' }}>{email}</Text>
            </CardItem>
        )
    }

    let address = props.order.shipping_address;
    return (
        <Card style={{ flex: 1, borderColor: 'white', shadowColor: '#fff', borderBottomWidth: 2, borderBottomColor:Identify.theme.line_color }} key={'shipping'}>
            { renderName(address)}
            { renderCompany(address)}
            { renderStreet(address)}
            { renderCityStatePostCode(address)}
            { renderCountry(address)}
            { renderPhone(address)}
            { renderEmail(address)}
        </Card>
    );
}

export default OrderShipping;