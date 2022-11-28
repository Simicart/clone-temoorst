import React from 'react';
import { View, Text, Linking, Platform} from 'react-native';
import { Icon } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ContactUsItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buttonColor: 'white'
        }
    }
    render() {
        switch(this.props.type){
            case 'web':
                this.action = () =>{
                    Linking.openURL(this.props.data)
                }
                break;
            case 'phone':
                let data = this.props.data;
                let number = '0';
                for(var i=4; i<data.length; i++) {
                    if(data.charAt(i) !== ' ') number += data.charAt(i);
                }
                let phoneNumber;
                if(Platform.OS === 'android') phoneNumber = `tel:${number}`;
                else phoneNumber = `telprompt:${number}`
                this.action = () =>{
                    Linking.openURL(phoneNumber)
                }
                break;
            case 'email':
                let email=`mailto:${this.props.data}`;
                this.action = () =>{
                    Linking.openURL(email)
                }
                break;
            case 'sms':
                let dataSms = this.props.data;
                let smsNumber = '0';
                for(var i=4; i<dataSms.length; i++) {
                    if(dataSms.charAt(i) !== ' ') smsNumber += dataSms.charAt(i);
                }
                let SmsNumber = `sms:${smsNumber}`;
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
                marginLeft: 20, 
                borderBottomColor: '#828282', 
                borderBottomWidth: 0.5, 
                alignItems: 'center', 
                backgroundColor: this.state.buttonColor }}
            onPressIn={() => this.setState({ buttonColor: 'orange' })}
            onPressOut={() => this.setState({ buttonColor: 'white' })}
            onPress={() => this.action() }>
                <Icon type={this.props.icon_type} name={this.props.icon_name} stype={{ color: '#828282' }}></Icon>
                <Text style={{ marginLeft: 20 }}>{this.props.data}</Text>
            </TouchableOpacity>
        )
    }
}
