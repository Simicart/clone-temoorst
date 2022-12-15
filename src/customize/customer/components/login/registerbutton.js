import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Text, View } from 'native-base';
import Identify from '@helper/Identify';
import NavigationManager from '@helper/NavigationManager';
import material from '@theme/variables/material';
import { TouchableOpacity } from 'react-native';

const RegisterButton = (props) => {

    function onClickRegister() {
        NavigationManager.openPage( props.navigation, 'Customer', {
            isEditProfile: false
        });
    }

    return (
        <View style={{ 
                flexDirection: Identify.isRtl() ? 'row-reverse' : 'row', 
                marginTop: 30, 
                marginBottom:30, 
                justifyContent: 'center' }}>
            <Text styles={{ fontWeight: 'bold' }}>{Identify.__('Need an account?')}</Text>
            <TouchableOpacity onPress={() => {  onClickRegister() }}>
                <Text style={{ color: Identify.theme.button_background, fontWeight: 'bold', marginLeft: Identify.isRtl() ? 0 : 5, marginRight: Identify.isRtl() ? 5 : 0  }}>{Identify.__('Sign Up')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RegisterButton;