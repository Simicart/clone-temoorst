import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { ListItem, View, Text, Right, Icon } from 'native-base'
import Language from '../../core/base/components/language/index';
import variable from '@theme/variables/material';
import Identify from '@helper/Identify';
import NavigationManager from "../../core/helper/NavigationManager";
import Events from '@helper/config/events';
import material from '../../../native-base-theme/variables/material';

export default class DrawerItemCustomize extends React.Component {

    getConfigData(keyBase) {
        let config = Identify.getMerchantConfig().storeview.base;
        return config[keyBase]
    }
    tracking() {
        let params = {};
        params['event'] = 'menu_action';
        params['action'] = 'clicked_menu_item';
        params['menu_item_name'] = this.props.data.key;
        Events.dispatchEventAction(params);
    }

    onSelectItem() {
        this.tracking();
        if (this.props.data.hasOwnProperty('onClick')) {
            this.props.data.onClick();
        } else {
            if (this.props.data.key === 'item_home') {
                NavigationManager.backToRootPage(this.props.navigation);
            } else if (this.props.data.key === 'item_image_search') {
                this.props.navigation.closeDrawer();
                this.props.parent.props.storeData('showModal', { show: true, key: this.props.data.key })
            } else {
                NavigationManager.openPage(this.props.navigation, this.props.data.route_name, this.props.data.params ? this.props.data.params : {});
            }
        }
    }

    renderItemImage() {
        return (
            <TouchableOpacity
                onPress={() => { NavigationManager.openRootPage(this.props?.navigation, "Home", {}); }}
            >
                <View style={{ margin: 30, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                    <Image source={require('../../../media/logo.png')} style={{ height: 60, resizeMode: 'contain', width: '100%' }} />
                </View>
            </TouchableOpacity>
        )
    }

    renderItem() {
        return (
            <TouchableOpacity
                onPress={() => { this.onSelectItem() }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingLeft: 40 }}>
                    <View style={{ marginRight: 15 }}>
                        {
                            this.props.data.image ? (
                                <Image resizeMode="cover" source={this.props.data.image} style={{ height: 22, width: 22 }} />
                            ) : <Icon name={this.props.data.icon} style={{ color: 'black', fontSize: 22, width: 22 }} />
                        }
                    </View>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>
                        {this.props.data?.label}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        if (this.props.data.image_log_url) {
            return (
                <View>
                    {this.renderItemImage()}
                </View>
            );
        }

        return (
            <View>
                {this.renderItem()}
            </View>
        );

    }
}