import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Button, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native'
import Identify from '@helper/Identify';
import { times } from 'lodash';
import NavigationManager from '@helper/NavigationManager';


export default class CustomerButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonEnabled: this.props.navigation.getParam('isEditProfile') ? true : false
        }
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined)
        }
    }

    onClickButton() {
        this.props.parent.onCustomerAction();
    }

    updateButtonStatus(status) {
        if (status !== this.state.buttonEnabled) {
            this.setState({ buttonEnabled: status });
        }
    }

    render() {
        let text = 'Register';
        if (this.props.navigation.getParam('isEditProfile')) {
            text = 'Save';
        }
        return (
            <View>
                <Button style={{ width: '100%', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}
                    full
                    disabled={!this.state.buttonEnabled}
                    onPress={() => { this.onClickButton() }}>
                    <Text> {Identify.__(text)} </Text>
                </Button>
                {text == 'Save' ? null : 
                    <View style={{ 
                        flexDirection: 'row',
                        marginTop: 30, 
                        marginBottom: 30, 
                        justifyContent: 'center' }}>
                        <Text styles={{ fontWeight: 'bold' }}>{Identify.__('Already have an account?')}</Text>
                        <TouchableOpacity onPress={() => {  NavigationManager.openPage( this.props.navigation, 'Login'); }}>
                            <Text style={{ color: Identify.theme.button_background, fontWeight: 'bold', marginHorizontal: 5 }}>{Identify.__('Sign In')}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            
        );
    }
}