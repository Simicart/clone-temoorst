import React from 'react';
import { View, Text, Linking, Platform } from 'react-native';
import { Icon } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Identify from '@helper/Identify';

export default class ContactUsItem extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }
    render() {
        switch (this.props.type) {
            case 'web':
                this.data = "Visit our website";
                this.action = () =>{
                    Linking.openURL(this.props.data)
                }
                break;
            case 'phone':
                let data = this.props.data;
                let number = '0';
                for (var i = 4; i < data.length; i++) {
                    if (data.charAt(i) !== ' ') number += data.charAt(i);
                }
                let phoneNumber;
                if (Platform.OS === 'android') phoneNumber = `tel:${number}`;
                else phoneNumber = `telprompt:${number}`
                this.data = "Call us " + this.props.data;
                this.action = () =>{
                    Linking.openURL(phoneNumber)
                }
                break;
            case 'email':
                let email=`mailto:${this.props.data}`;
                this.data = "Email us";
                this.action = () =>{
                    Linking.openURL(email)
                }
                break;
            case 'sms':
                let dataSms = this.props.data;
                let smsNumber = '0';
                for (var i = 4; i < dataSms.length; i++) {
                    if (dataSms.charAt(i) !== ' ') smsNumber += dataSms.charAt(i);
                }
                let SmsNumber = `sms:${smsNumber}`;
                this.data = "Message us"
                this.action = () =>{
                    Linking.openURL(SmsNumber)
                }
                break;
        }
        return (
            <TouchableOpacity 
                style={{ 
                    flexDirection: 'row', 
                    paddingTop: 20, 
                    paddingBottom: 20, 
                    marginLeft: 30,
                    borderBottomColor: Identify.theme.line_color, 
                    borderBottomWidth: 0.5, 
                    alignItems: 'center'}}
                onPress={() => this.action() }>
                    <Icon type={this.props.icon_type} name={this.props.icon_name} style={{ color: Identify.theme.icon_color }}></Icon>
                    <Text style={{ marginHorizontal: 20 }}>{Identify.__(this.data)}</Text>
            </TouchableOpacity>
        )
    }
}
