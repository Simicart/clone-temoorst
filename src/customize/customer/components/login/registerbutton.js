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
        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
            <Text styles={{ fontWeight: 'bold' }}>Need an account? </Text>
            <TouchableOpacity onPress={() => {  onClickRegister() }}>
                <Text style={{ color: '#696969' }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RegisterButton;