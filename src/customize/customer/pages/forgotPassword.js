import React from 'react'
import SimiPageComponent from "@base/components/SimiPageComponent";
import Identify from "@helper/Identify";
import { Container, Content, Form, Item, Input, Label, H3, Text, Button, Toast, View} from 'native-base';
import { TouchableOpacity } from 'react-native'
import { forgotpassword } from '@helper/constants';
import NewConnection from '@base/network/NewConnection';
import NavigationManager from "@helper/NavigationManager";
import Events from '@helper/config/events';
import material from "@theme/variables/material";

export default class ForgotPassWordPage extends SimiPageComponent{
    constructor(props) {
        super(props)
        this.isBack = true
        this.state = {
            ...this.state,
            email: ''
        };
        this.dispatchSplashCompleted();
    }

    dispatchSplashCompleted() {
        if (Identify.getMerchantConfig().storeview.base.force_login && Identify.getMerchantConfig().storeview.base.force_login == '1') {
            this.isRight = false;
            this.isMenu = false;
        }

        for (let i = 0; i < Events.events.splash_completed.length; i++) {
            let node = Events.events.splash_completed[i];
            if (node.force_login && node.force_login === true) {
                this.isRight = false;
                this.isMenu = false;
            }
        }
    }

    validateEmail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false)
            return false;
        else
            return true;
    }

    setData(data, requestID) {
        if (!data.errors) {
            Toast.show({ text: Identify.__('Please check your email to reset password'), type: "success", duration: 3000, textStyle: { fontFamily: material.fontFamily } })
            NavigationManager.backToPreviousPage(this.props.navigation)
        }
    }

    resetPassword = () => {
        if (this.state.email === '' || this.state.email === null) {
            Toast.show({ text: Identify.__('This field is required'), duration: 3000, type: 'warning', textStyle: { fontFamily: material.fontFamily } })
        } else {
            if (this.validateEmail(this.state.email)) {
                let param = {
                    email: this.state.email
                }
                new NewConnection()
                    .init(forgotpassword, 'reset_password', this)
                    .addGetData(param)
                    .connect();
            } else {
                this.setState({ email: '' });
                Toast.show({ text: Identify.__('Check your email and try again'), duration: 3000, type: 'warning', textStyle: { fontFamily: material.fontFamily } })
            }
        }
    }

    renderFormForgot = () => {
        return <Form style={{ marginLeft: Identify.isRtl() ? 20 : 0 }}>
            <Label style={{ width: '100%', fontWeight: 'bold' }}>{Identify.__('Forgot password')}</Label>
            <View style={{ flexDirection: 'row',  marginTop: 20 }}>
                <Text>Email</Text>
                <Text style={{ color: 'red' }}> *</Text>
            </View>
            <Input
                style={{
                    flex: 1,
                    borderWidth: 0.5,
                    borderColor: '#c3c3c3',
                    borderRadius: 5,
                    paddingStart: 15,
                    paddingEnd: 15,
                    marginTop: 10,
                    marginBottom: 20
                }}
                placeholder={Identify.__('Please enter your email')}
                value={this.state.email}
                onChangeText={(text) => { this.setState({ email: text }); }} />
            <View 
                style = {{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.14,
            }}>
                <Button
                    disabled={!this.validateEmail(this.state.email)}
                    style={{ width: '100%', marginTop: 15, justifyContent: 'center', borderRadius: 10 }}
                    title='reset password'
                    onPress={() => { this.resetPassword() }}
                >
                    <Text style={{ textAlign: 'center' }}>{Identify.__('Send')}</Text>
                </Button>
            </View>
        </Form>
    }

    onClickLogin = () => {
        NavigationManager.backToPreviousPage(this.props.navigation)
    }
   
    renderPhoneLayout() {
        return (
            <Container>
                <Content style={{ padding: 12 }}>
                    {this.renderFormForgot()}
                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                        <Text styles={{ fontWeight: 'bold' }}>Have your password? </Text>
                        <TouchableOpacity onPress={() => { this.onClickLogin() }}>
                            <Text style={{ color: '#696969' }}>Sign In</Text>
                        </TouchableOpacity>
                    </View> 
                </Content>
            </Container>
        )
    }
}