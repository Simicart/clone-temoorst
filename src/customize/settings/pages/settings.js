import React from 'react';
import { connect } from 'react-redux';
import { Linking, Modal, NativeModules, Platform, Dimensions, Text, View, TouchableOpacity, Image } from 'react-native';
import Identify from '@helper/Identify';
import AdvanceList from '../../advancelist';
import { Container, Content, Icon } from "native-base";
import Connection from '@base/network/Connection';
import NewConnection from '@base/network/NewConnection';
import { storeviews } from '@helper/constants';
import AppStorage from '@helper/storage';
import RNRestart from 'react-native-restart';
import { I18nManager } from 'react-native';
import SimiPageComponent from "@base/components/SimiPageComponent";
import variable from '@theme/variables/material';
import SimiCart from '../../../core/helper/simicart';

const h = Dimensions.get('window').height;

const NativeMethod = Platform.OS === 'ios' ? NativeModules.NativeMethod : NativeModules.NativeMethodModule;

class Viewsettings extends SimiPageComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modalVisible: false,
            data: [], title: "Search"
        };
        this.stores = null;
        this.baseStore = this.props.data.storeview.base;
        let stores = null;
        this.storeName = '';
        if (!Identify.isEmpty(this.props.data.storeview.stores) && parseInt(this.props.data.storeview.stores.total) >= 1) {
            stores = this.props.data.storeview.stores.stores;
        }
        stores.forEach(item => {
            if (item.group_id == this.baseStore.group_id) {
                this.storeName = item.name
            }
        })
    }

    setModalVisible(value) {
        this.setState({
            modalVisible: value
        })
    }

    getDataToShow(key, hasDataInParent) {
        if (key) {
            return this.baseStore[key]
        } else if (hasDataInParent) {
            return this.storeName
        } else return null
    }
    getDefaultStoreViewByGroupId(value) {
        let stores = this.props.data.storeview.stores.stores
        for (let i in stores) {
            let store = stores[i];
            if (store.group_id == value) return store.default_store_id;
        }
        return null;
    }
    //0 - store, 1 lanauge, 2 currency.
    handleSelected(type, value, item = null) {
        // this.props.storeData('showLoading', { type: 'dialog' });
        this.state.modalVisible = false;
        this.showLoading('dialog');

        let api = storeviews;
        if (!value) return;
        let keys = [
            { key: 'currency_code' }
        ];
        let connection = new NewConnection();
        if (type == 0) {
            if (value == this.baseStore.group_id) {
                this.showLoading('none', true);
                return;
            }
            let storeDefaultId = this.getDefaultStoreViewByGroupId(value);
            if (storeDefaultId == null) return;
            api += "/" + storeDefaultId;
            Identify.store_id = storeDefaultId;
        } else if (type == 1) {
            if (value == this.baseStore.store_id) {
                this.showLoading('none', true);
                return;
            }
            api += "/" + value;
            Identify.store_id = value;
        } else {
            if (value == this.baseStore.currency_code) {
                this.showLoading('none', true);
                return;
            }
            api += "/" + this.baseStore.store_id;
            connection.addGetData({
                currency: value
            })
        }
        connection.init(api, 'get_store_config', this)
            .connect();

    }
    setData(data) {
        this.props.clearData();
        Connection.setMerchantConfig(data);
        Identify.setMerchantConfig(data);

        if (data.storeview.hasOwnProperty('base') && data.storeview.base.hasOwnProperty('locale_identifier')) {
            Identify.locale_identifier = data.storeview.base.locale_identifier;
        }

        this.showLoading('none', false);
        this.props.storeData('merchant_configs', data);

        if (data.storeview.base.is_rtl == '1') {
            I18nManager.forceRTL(true);
            AppStorage.saveData('appIsRtl', 'yes');
        } else {
            I18nManager.forceRTL(false);
            AppStorage.saveData('appIsRtl', 'no');
        }

        this.props.navigation.goBack(null)
        //
        AppStorage.saveData('store_id', data.storeview.base.store_id).then(
            () => {
                AppStorage.saveData('currency_code', data.storeview.base.currency_code).then(
                    () => { RNRestart.Restart() }
                )
            }
        )
    }
    showModal(data = "", title = "") {
        this.setState(previousState => { return { modalVisible: !previousState.modalVisible, data: data, title: title }; });
    }

    renderModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { }}>
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
                    activeOpacity={1}
                    onPress={() => this.setModalVisible(false)}>
                        <TouchableOpacity 
                            style={{ height: this.dataLength>1 ? 85+this.dataLength*50 : 165, width: '100%', backgroundColor: Identify.theme.app_background, borderRadius: 15 }}
                            activeOpacity={1}>
                            <View 
                                style={{
                                    flexDirection: Identify.isRtl() ? 'row-reverse' : 'row', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between', 
                                    paddingTop: 15, 
                                    paddingBottom: 15,
                                    borderBottomWidth: 0.5, 
                                    borderBottomColor: Identify.theme.line_color  }}>        
                                <Text style={{ fontSize: 22, fontWeight: 'bold', marginRight: Identify.isRtl() ? 15 : 0, marginLeft: Identify.isRtl() ? 0 : 15 }}>{Identify.__(this.state.title)}</Text>
                                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                                    <Icon name='close' type='AntDesign' style= {{ color: Identify.theme.icon_color, fontSize: 24, marginRight: Identify.isRtl() ? 0 : 15, marginLeft: Identify.isRtl() ? 15 : 0 }} />
                                </TouchableOpacity>
                            </View>
                            <AdvanceList parent={this} data={this.state.data} title={this.state.title} value={this.state.value} />
                        </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );
    }

    generateActionForModal(dataContainer, title, keyItem, type, noMatch = false, extraData = { searchStr: '', baseData: '' }) {
        let compareData = noMatch ? this.baseStore[extraData.baseData] : this.baseStore[keyItem];
        let data = [];
        for (let i in dataContainer) {
            let sv = dataContainer[i];
            let ssv = { searchStr: noMatch ? sv[extraData.searchStr] : sv.name, key: sv[keyItem], selected: false, type };
            if (sv[keyItem] == compareData) {
                ssv['selected'] = true;
            }
            data.push(ssv);
        }
        this.showModal(data, title)
    }

    itemAction(keyItem, title) {
        switch (keyItem) {
            case 'store':
                let stores = null;
                if (!Identify.isEmpty(this.props.data.storeview.stores) && parseInt(this.props.data.storeview.stores.total) >= 1) {
                    stores = this.props.data.storeview.stores.stores;
                }
                if (stores.length > 1) {
                    this.generateActionForModal(stores, title, 'group_id', 0)
                }
                return null;
                break;
            case 'language':
                let storeView = null;
                if (!Identify.isEmpty(this.props.data.storeview.stores) && parseInt(this.props.data.storeview.stores.total) >= 1) {
                    this.stores = this.props.data.storeview.stores.stores;
                    let groupId = this.baseStore.group_id;
                    for (let i in this.stores) {
                        let store = this.stores[i];
                        if (store.group_id == groupId) {
                            storeView = parseInt(store.storeviews.total) >= 1 ? store.storeviews.storeviews : null;
                        }
                    }
                }

                if (storeView) {
                    let storeViewActives = [];
                    for (let j in storeView) {
                        let store = storeView[j];
                        if (store.is_active == '1') {
                            storeViewActives.push(store);
                        }
                    }
                    if (storeViewActives.length >= 1) {
                        this.dataLength = storeViewActives.length;
                        this.generateActionForModal(storeViewActives, title, 'store_id', 1, null, null)
                    }
                }
                return null;
                break;
            case 'currency':
                let currenies = null;
                if (!Identify.isEmpty(this.baseStore.currencies)) {
                    currenies = this.baseStore.currencies;
                }
                if (currenies && currenies.length >= 1) {
                    this.dataLength = currenies.length;
                    this.generateActionForModal(currenies, title, 'value', 2, true, { searchStr: 'title', baseData: 'currency_code' })
                }
                return null;
                break;
            default:
                // NativeMethod.openSetting();
                Linking.openSettings();
                break;
        }
    }

    renderPhoneLayout() {
        console.log(SimiCart.appVersion);
        return (
            <Container style={{ paddingLeft: 15, paddingRight: 15, backgroundColor: variable.appBackground }}>
                {this.renderModal()}
                <Content style={{ flex: 1, paddingTop: 15 }}>
                    {this.renderLayoutFromConfig('setting_layout', 'content')}
                </Content>
                {this.renderLayoutFromConfig('setting_layout', 'container')}
                <TouchableOpacity onPress={() => Linking.openURL(SimiCart.ourPage_url)}>
                    <View style={{justifyContent: 'flex-end', alignItems: 'center', marginBottom: 30}}>
                        <View style={{flexDirection: Identify.isRtl() ? 'row-reverse' : 'row', paddingBottom: 5}}>
                            <Text>{Identify.__('Powered By ')}</Text>
                            <Image style={{ height: 25, width: 100, paddingBottom: 10 }} source={require('@media/logo.png')}/>
                        </View>
                        <Text>{Identify.__('Copyright 2022 SimiCart. Version ' + SimiCart.appVersion)}</Text>
                    </View>
                </TouchableOpacity>
            </Container>
        )
    }
}

//export default Settings;
const mapStateToProps = (state) => {
    return { data: state.redux_data.merchant_configs };
}
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        },
        clearData: () => {
            dispatch({ type: 'clear_all_data' })
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewsettings);
