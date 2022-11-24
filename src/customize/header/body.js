import React from 'react';
import { Title } from 'native-base';
import HeaderBody from '@base/components/layout/header/body';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import variable from "@theme/variables/material";
import NavigationManager from '@helper/NavigationManager';
import Identify from '@helper/Identify';

const CustomizeHeaderBody = (props) => {
    function renderShowTitle() {
        return (
            <Title style={{ color: variable.toolbarBtnColor, textAlign: 'center', width: '100%' }}>{Identify.__(props.parent.props.title)}</Title>
        );
    }

    function renderShowLogo() {
        return (
            <TouchableHighlight onPress={() => {
                NavigationManager.openPage(props.navigation, 'Home');
            }} underlayColor="white">
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: 200, }}>
                    <Image source={require('@media/logo.png')} style={{ height: 50, width: 200, resizeMode: 'contain', width: '100%' }} />
                </View>
            </TouchableHighlight>
        );
    }


    if (props.parent.props.title) {
        return (
            <View style={[{ flexGrow: 1, flex: 1 }]}>
                {renderShowTitle()}
            </View>
        );
    } else {
        return (
            <View style={[{ flexGrow: 1, flex: 1, zIndex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                {renderShowLogo()}
            </View>
        );
    }

}

export default CustomizeHeaderBody;