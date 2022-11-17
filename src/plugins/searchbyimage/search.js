import React from 'react';
import SimiComponent from "@base/components/SimiComponent";
import { Icon , Toast } from 'native-base';
import { Keyboard , PermissionsAndroid , Platform } from 'react-native';
import NavigationManager from '@helper/NavigationManager';
import Identify from "../../core/helper/Identify";
import material from "../../../native-base-theme/variables/material";


export default class VoiceSearch extends SimiComponent {

    renderPhoneLayout() {
        return (
            <Icon style={{ marginLeft: 5, fontSize: 21, marginRight: 5, paddingLeft: 10 }}
                name='ios-camera' onPress={() => {
                    Keyboard.dismiss();
                    if(Platform.OS === 'ios'){
                        NavigationManager.openPage(this.props.navigation, 'GoogleVision', {})
                    }else {
                        PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.CAMERA]).then(res => {
                            Object.keys(res).forEach(key => {
                                if(res[key] === 'granted'){
                                    NavigationManager.openPage(this.props.navigation, 'GoogleVision', {})
                                }else {
                                    Toast.show({text: Identify.__('You need to grant permission to use this feature'), type: 'danger', duration: 3000, textStyle: {fontFamily: material.fontFamily}})
                                }
                            })
                        });
                    }
                }} />
        );
    }
}