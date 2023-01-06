import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import SimiForm from '@base/components/form/SimiForm';
import BorderedInput from '../../../form/BorderedInput';
import AppStorage from '@helper/storage';
import Identify from "@helper/Identify";
import { View, Text } from 'react-native'

export default class LoginForm extends SimiComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.getParam('email'),
            password: this.props.navigation.getParam('password')
        };
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this)
        }

        if (!this.props.navigation.getParam('email')) {
            AppStorage.getCustomerRemebermeLoginInfo().then((rememberInfo) => {
                if (rememberInfo && rememberInfo.email) {
                    this.fillLoginData(rememberInfo);
                    this.props.parent.setState({ rememberMeEnable: true, enableSignIn: true });
                }
            });
        }
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined)
        }
    }

    updateButtonStatus(status) {
        this.props.parent.updateButtonStatus(status);
    }

    fillLoginData(loginData) {
        this.setState(loginData);
        for (let key in loginData){
            this.form.updateFormData(key, loginData[key], true)
        }
    }
    
    createFields() {
        let fields = [];
        fields.push(this.createInput('email', 'email', Identify.__('email'), 'email', null, this.state.email, true, true, 'Email'));
        fields.push(this.createInput('password', 'password', Identify.__('password'), 'password', null, this.state.password, true, false, 'Password'));
        return fields;
    }

    createInput(key, inputKey, inputTitle, inputType, iconName, inputValue, required, needWarning, header) {
        return(
            <BorderedInput key={key}
                            inputKey={inputKey}
                            inputTitle={inputTitle}
                            inputType={inputType}
                            iconName={iconName}
                            inputValue={inputValue}
                            required={required}
                            needWarning={needWarning}
                            extraIcon={undefined} 
                            header={header}/>
        );
    }

    renderPhoneLayout() {
        return (
            <View>
                <View style={{ alignItems: 'flex-start', marginStart: 3 }}>
                    <Text style = {{ fontWeight: 'bold'}}>{Identify.__('Please login to continue!')}</Text>
                </View>
                <SimiForm fields={this.createFields()} initData={this.state} parent={this} onRef={ref => (this.form = ref)} />
            </View>
        );
    }

    getLoginData() {
        return this.form.getFormData();
    }
}