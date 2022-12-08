import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Icon } from 'native-base';
import Connection from '@base/network/Connection';
import NewConnection from '@base/network/NewConnection';
import NavigationManager from '@helper/NavigationManager';
import AppStorage from '@helper/storage';
import { customer_logout, address_book_mode, quoteitems } from '@helper/constants';
import SimiPageComponent from '@base/components/SimiPageComponent';
import variable from '@theme/variables/material';
import Identify from '@helper/Identify';
import Events from '@helper/config/events';
import { Modal, Text, View, TouchableOpacity } from 'react-native'

class MyAccountPage extends SimiPageComponent {

    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            modalVisible: false
        }
    }
    logout() {
        try {
            this.props.storeData('showLoading', { type: 'dialog' });
            new NewConnection()
                .init(customer_logout, 'customer_logout', this)
                .connect();
        } catch (e) {
            console.log(e.message);
        }
    }

    getQuoteItems() {
        new NewConnection()
            .init(quoteitems, 'get_quoteitems', this)
            .connect();
    }

    setData(data, requestID) {
        if(requestID == 'customer_logout') {
            this.props.storeData('actions', [
                { type: 'showLoading', data: { type: 'none' } },
                { type: 'clear_all_data', data: null },
            ]);
            Identify.setCustomerData(null);
            Identify.setCustomerParams(null);
            Connection.setCustomer(null);
            AppStorage.removeAutologinInfo();
            AppStorage.removeData(['credit_card']);
            AppStorage.saveData('quote_id', '');
    
            this.getQuoteItems();
    
            NavigationManager.backToRootPage(this.props.navigation);
            this.dispatchLogout();
        } else {
            if (data.quote_id && data.quote_id != null && data.quote_id != '') {
                AppStorage.saveData('quote_id', data.quote_id);
            }
        }
    }

    dispatchLogout() {
        if (Identify.getMerchantConfig().storeview.base.force_login && Identify.getMerchantConfig().storeview.base.force_login == '1') {
            if (Identify.isEmpty(Identify.getCustomerData())) {
                NavigationManager.openRootPage(this.props.navigation, 'Login');
                return;
            }
        }

        for (let i = 0; i < Events.events.splash_completed.length; i++) {
            let node = Events.events.splash_completed[i];
            if (node.force_login && node.force_login === true) {
                if (Identify.isEmpty(Identify.getCustomerData())) {
                    NavigationManager.openRootPage(this.props.navigation, 'Login');
                    return;
                }
            }
        }
    }

    setModalVisible(value) {
        this.setState({
            modalVisible: value
        })
    }

    onSelectMenuItem(keyItem) {
        switch (keyItem) {
            case 'myaccount_logout':
                this.setModalVisible(!this.state.modalVisible);
                
                // this.logout();
                break;
            case 'myaccount_address':
                NavigationManager.openPage(this.props.navigation, 'AddressBook', {
                    mode: address_book_mode.normal
                });
                break;
            case 'myaccount_orders':
                NavigationManager.openPage(this.props.navigation, 'OrderHistory');
                break;
            case 'myaccount_wishlist':
                NavigationManager.openPage(this.props.navigation, 'Wishlist');
                break;
            case 'myaccount_profile':
                NavigationManager.openPage(this.props.navigation, 'Customer', {
                    isEditProfile: true
                });
                break;
            case 'my_rewardpoint':
                NavigationManager.openPage(this.props.navigation, 'MyReward');
                break;
            default:
                return false;
        }
        return true;
    }

    renderPhoneLayout() {
        return (
            <Container style={{ paddingLeft: 15, paddingRight: 15, backgroundColor: variable.appBackground }}>
                <Content style={{ flex: 1, paddingTop: 15 }}>
                    {this.renderLayoutFromConfig('myaccount_layout', 'content')}
                </Content>
                {this.renderLayoutFromConfig('myaccount_layout', 'container')}
                <Modal 
                visible={this.state.modalVisible} 
                animationType='slide'
                transparent={true}>
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} 
                    onPress={() => this.setModalVisible(false)}>
                        <TouchableOpacity 
                            style={{ height: '27%', width: '100%', backgroundColor: Identify.theme.app_background, borderRadius: 15 }}
                            activeOpacity={1}>
                            <View 
                                style={{
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between', 
                                    paddingTop: 15, 
                                    paddingBottom: 15,
                                    borderBottomWidth: 0.5, 
                                    borderBottomColor: Identify.theme.line_color  }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 15 }}>{Identify.__('Sign Out')}</Text>
                                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                                    <Icon name='close' type='AntDesign' style= {{ color: Identify.theme.icon_color, fontSize: 24, marginRight: 15 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ textAlign: 'center', marginTop: 30, marginBottom: 30, fontSize: 20 }}>{Identify.__('Are you sure want to sign out?')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                <TouchableOpacity
                                    onPress={() => this.logout()} 
                                    style= {{width: '40%', height: 50, borderWidth: 3, borderColor: Identify.theme.button_background, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: Identify.theme.button_background, fontSize: 16, fontWeight: 'bold' }}>{Identify.__('Yes')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                    style= {{width: '40%', height: 50, borderWidth: 3, borderColor: Identify.theme.button_background, borderRadius: 10, alignItems: 'center', backgroundColor: Identify.theme.button_background, justifyContent: 'center' }}>
                                    <Text style={{ color: Identify.theme.button_text_color, fontSize: 16, fontWeight: 'bold' }}>{Identify.__('No')}</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>                        
                </TouchableOpacity>
            </Modal>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { data: state.redux_data.customer_data };
}

//Save to redux.
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage);