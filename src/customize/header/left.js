import React, { useEffect } from 'react';
import { Icon } from 'native-base';
import { View, Alert } from 'react-native'
import variable from "@theme/variables/material";
import Identify from '@helper/Identify';
import Events from '@helper/config/events';
import NavigationManager from '@helper/NavigationManager';
import { connect } from 'react-redux';
const LeftHeader = (props) => {
    useEffect(() => {
        console.log("props in left header: ", props);
    }, [props.navigation])
    const routeName = props.navigation.state.routeName;
    function dispatchCheckRootPages(routeName) {
        for (let i = 0; i < Events.events.root_pages.length; i++) {
            let rootPage = Events.events.root_pages[i];
            if (rootPage == routeName) {
                return true;
            }
        }
        return false;
    }

    function backAction() {
        if (props.parent.props.obj && props.parent.props.obj.isPaymentWebview === true) {
            Alert.alert(
                Identify.__('Warning'),
                Identify.__('Are you sure you want to cancel this order') + '?',
                [
                    { text: Identify.__('Cancel'), onPress: () => { style: 'cancel' } },
                    {
                        text: Identify.__('OK'), onPress: () => {
                            if (props.parent.props.obj.cancelOrder) {
                                props.parent.props.obj.cancelOrder();
                            } else {
                                props.parent.goBack();
                            }
                        }
                    },
                ],
                { cancelable: true }
            );
        }
        else if (props.navigation.state.routeName === 'Login') {
            props.storeData('bottomAction', 'Home');
            NavigationManager.openPage(props.navigation, 'Home', {});
        }
        else {
            props.storeData('bottomAction', props.navigation.state.params.previousRoute);
            props.parent.goBack();
        }
    }

    function createBackButton() {
        return (
            <View>
                <Icon name={Identify.isRtl() ? "ios-arrow-forward" : 'ios-arrow-back'}
                    style={{ color: variable.toolbarBtnColor, padding: 7, paddingLeft: 10, paddingRight: 10, fontSize: 25 }}
                    onPress={() => backAction()} />
            </View>
        );
    }

    function createDrawerButton() {
        return (
            <View style={{}}>
                <Icon name="menu"
                    style={{ color: variable.toolbarBtnColor, padding: 7, paddingLeft: 10, paddingRight: 10, fontSize: 25 }}
                    onPress={() => props.parent.props.navigation.openDrawer()} />
            </View>
        );
    }

    if (routeName === 'Home' || routeName === 'Category' || routeName === 'Cart' || routeName === 'MyAccount' || dispatchCheckRootPages(routeName)) {
        return createDrawerButton();
    } else if (props.parent.props.back) {
        return createBackButton();
    } else if (props.parent.props.show_menu) {
        return createDrawerButton();
    } else {
        return null
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftHeader);