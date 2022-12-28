import React from 'react';
import { Container, List, Icon } from "native-base";
import { routes, routes_login } from '../../../router/config';
import Identify from '@helper/Identify';
import { connect } from 'react-redux';
import variable from '@theme/variables/material';
import Events from '@helper/config/events';
import Item from './item';
import { View, Text, Image } from 'react-native'

const DrawerItems = [
    {
        route_name: "OrderHistory",
        label: Identify.__("Track Order"),
        image: require('../images/clipboard.png'),
    },
    {
        route_name: "ContactUs",
        label: Identify.__("Contact Us"),
        image: require('../images/phone.png'),
    },
    {
        route_name: "AboutUs",
        label: Identify.__("About Us"),
        image: require('../images/info.png'),
    },
    {
        route_name: "TermsConditions",
        label: Identify.__("Terms & Conditions"),
        image: require('../images/list.png'),
    },
    {
        route_name: "PrivacyPolicy",
        label: Identify.__("Privacy Policy"),
        image: require('../images/checked.png'),
    },
    {
        route_name: "Settings",
        label: Identify.__("Settings"),
        image: require('../images/setting.png'),
    },
]
class Drawer extends React.Component {

    initData() {
        let items = DrawerItems;
        items = [{ image_log_url: require('../../../media/logo.png') }, ...items, ...this.addCms()];
        return items;
    }

    checkDisableItem(key) {
        let plugins = Events.events.menu_left_disable_items;
        if (plugins.indexOf(key) >= 0) {
            return true;
        }
        return false;
    }

    addCms() {
        let cmsItems = [];
        let cmsList = this.props.merchant_configs.storeview.cms.cmspages;
        if (cmsList) {
            cmsList.forEach(element => {
                if (element.key !== "item_login") {
                    cmsItems.push({
                        active: true,
                        key: 'item_cms_id_' + element.cms_id,
                        route_name: "WebViewPage",
                        params: {
                            html: element.cms_content,
                            label: element.cms_title,
                        },
                        label: element.cms_title,
                        image: element.cms_image,
                        is_extend: false,
                        is_more: false,
                        position: 701 + cmsList.indexOf(element)
                    });
                }
            });
        }
        return cmsItems;
    }

    dispatchEventAddItems() {
        let plugins = Events.events.menu_left_items;
        let items = [];
        if (plugins) {
            for (let i = 0; i < plugins.length; i++) {
                let item = plugins[i];
                let passRequireLogin = true;
                if (item.hasOwnProperty('require_logged_in') && item.require_logged_in == true && Identify.isEmpty(this.props.customer_data)) {
                    passRequireLogin = false;
                }
                let passAdditionalCondition = true;
                if (item.hasOwnProperty('add_condition') && item.add_condition() == false) {
                    passAdditionalCondition = false;
                }
                if (item.active && passRequireLogin && passAdditionalCondition) {
                    items.push(item);
                }
            }
        }
        return items;
    }

    render() {
        if (Identify.theme === null) {
            return (null);
        }
        let items = this.initData();
        return (
            <View style={{ paddingTop: 30, borderRadius: 20, flex: 1 }}>
                <View style={{ alignItems: 'center', flex: 1, }}>
                    <View style={{ height: '90%', width: '100%', backgroundColor: 'white' }}>
                        {
                            items?.map((item, index) => {
                                if (index !== items.length - 1 && !item.is_separator) {
                                    return (
                                        <Item data={item} navigation={this.props.navigation} />
                                    )
                                }
                            })
                        }
                    </View>
                    <View style={{ height: '10%', width: '100%' }}>
                        {
                            items?.map((item, index) => {
                                if (index === items.length - 1 && !item.is_separator) {
                                    return (
                                        <Item data={item} navigation={this.props.navigation} />
                                    )
                                }
                                return null
                            })
                        }
                    </View>
                </View>
            </View>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        customer_data: state.redux_data.customer_data,
        merchant_configs: state.redux_data.merchant_configs,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);