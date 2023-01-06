import React, { useEffect } from 'react';
import { Title } from 'native-base';
import HeaderBody from '@base/components/layout/header/body';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import variable from "@theme/variables/material";
import NavigationManager from '@helper/NavigationManager';
import Identify from '@helper/Identify';
import { listBottomButtons } from '@customize/bottomMenu';
import { connect } from 'react-redux';
const CustomizeHeaderBody = (props) => {
    function renderShowRouteName() {
        let title = '';
        let routeName = props.navigation.state.routeName;
        title += routeName[0];
        for(let i=1; i<routeName.length; i++) {
            if(routeName[i].toUpperCase() === routeName[i]) {
                title += ' ' + routeName[i];
            }
            else title += routeName[i];
        }
        return (
            <Title style={{ color: variable.toolbarBtnColor, textAlign: 'center', width: '100%' }}>{Identify.__(title)}</Title>
        );
    }
    function renderShowTitle() {
        return (
            <Title style={{ color: variable.toolbarBtnColor, textAlign: 'center', width: '100%' }}>{Identify.__(props.parent.props.title ? props.parent.props.title : props.parent.props?.state?.title)}</Title>
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


    if (props.parent.props.title || props.parent.props?.state?.title) {
        return (
            <View style={[{ flexGrow: 1, flex: 1 }]}>
                {renderShowTitle()}
            </View>
        );
    } else if (listBottomButtons?.map((item) => item.route_name).includes(props.navigation.state.routeName)) {
        props.storeData('bottomAction', props.navigation.state.routeName);
        return (
            <View style={[{ flexGrow: 1, flex: 1, zIndex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                {renderShowLogo()}
            </View>
        );
    } else {
        return (
            <View style={[{ flexGrow: 1, flex: 1 }]}>
                {renderShowRouteName()}
            </View>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        bottomAction: state.redux_data.bottomAction,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeHeaderBody);