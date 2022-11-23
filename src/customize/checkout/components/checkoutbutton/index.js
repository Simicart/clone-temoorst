import React from 'react';
import { Text, Button, View, Input, Item, ActionSheet, Toast, Icon } from 'native-base';
import Identify from '@helper/Identify';
import NavigationManager from '@helper/NavigationManager';
import { address_book_mode, address_detail_mode, checkout_mode } from '@helper/constants';
import Events from '@helper/config/events';
import { Dimensions, Platform } from 'react-native';
import md5 from 'md5';
import material from '@theme/variables/material';

const Checkoutbutton = (props) => {

    // componentDidMount(){
    //   Toast.show({
    //       text: this.props.parent.props.data.message[0],
    //       textStyle: { color: "yellow" },
    //       buttonText: "Okay",
    //       type: 'warning',
    //       duration: 4000
    //   });
    // }
    console.log("props.parent.props.data.cart_total: ", props.parent.props.data.cart_total);
    const { checkout, paypal_express_config } = Identify.getMerchantConfig().storeview;

    function openAddressBook() {
        NavigationManager.openPage(props.parent.props.navigation, 'AddressBook', {
            mode: address_book_mode.checkout.select
        });
    }

    function openCheckoutPage(address) {
        NavigationManager.openPage(props.parent.props.navigation, 'Checkout', {
            mode: checkout_mode.exist_customer,
            shippingAddressParams: { entity_id: address.entity_id },
            billingAddressParams: { entity_id: address.entity_id },
            scroll_to_payment: true
        });
    }

    function showCheckoutOptions() {

        let data = {};
        data['event'] = 'cart_action';
        data['action'] = 'clicked_checkout_button';

        Events.dispatchEventAction(data, this);

        let BUTTONS = [Identify.__('Checkout as existing customer'), Identify.__('Checkout as new customer'), Identify.__('Checkout as guest'), Identify.__("Cancel")];
        let CANCEL_INDEX = 3;
        let routeName = null;
        if (checkout.enable_guest_checkout != "1") {
            BUTTONS = [Identify.__('Checkout as existing customer'), Identify.__('Checkout as new customer'), Identify.__("Cancel")]
            CANCEL_INDEX = 2;
            ActionSheet.show(
                {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                },
                buttonIndex => {
                    switch (buttonIndex) {
                        case 0:
                            routeName = 'Login';
                            params = {
                                isCheckout: true
                            };
                            break;
                        case 1:
                            routeName = 'NewAddress';
                            params = {
                                mode: address_detail_mode.checkout.as_new_customer.add_new
                            };
                            break;
                        default:
                            break;
                    }
                    if (routeName) {
                        NavigationManager.openPage(props.parent.props.navigation, routeName, params);
                    }
                }
            );
        } else {
            ActionSheet.show(
                {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                },
                buttonIndex => {
                    switch (buttonIndex) {
                        case 0:
                            routeName = 'Login';
                            params = {
                                isCheckout: true
                            };
                            break;
                        case 1:
                            routeName = 'NewAddress';
                            params = {
                                mode: address_detail_mode.checkout.as_new_customer.add_new
                            };
                            break;
                        case 2:
                            routeName = 'NewAddress';
                            params = {
                                mode: address_detail_mode.checkout.as_guest.add_new
                            };
                            break;
                        default:
                            break;
                    }
                    if (routeName) {
                        NavigationManager.openPage(props.parent.props.navigation, routeName, params);
                    }
                }
            );
        }

    }

    function dispatchPluginPaypalExpress() {
        let items = [];
        if (Events.events.paypal_express_cart && paypal_express_config && Identify.TRUE(paypal_express_config.show_on_cart)) {
            for (let i = 0; i < Events.events.paypal_express_cart.length; i++) {
                let node = Events.events.paypal_express_cart[i];
                if (node.active === true) {
                    let key = md5("action_cart" + i);
                    let Content = node.content;
                    items.push(<Content key={key} />)
                }
            }
        }
        return items;
    }

    let data = props.parent.props.data;
    let items = dispatchPluginPaypalExpress();
    if (!data.hasOwnProperty('is_can_checkout') || data.is_can_checkout == "1") {
        return (
            <View
                style={{
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    zIndex: 99,
                    elevation: 2,
                    width: '100%',
                    borderWidth: 0.3,
                    borderColor: '#e0e0e0',
                    height: 100,
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                }}
            >
                <View style={{
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' && Dimensions.get('window').height >= 812 ? 15 : 0,
                    flex: 1, flexDirection: 'row', padding: 15, borderTopLeftRadius: 12, borderTopRightRadius: 12, shadowColor: "#000",
                }}>
                    {items.length > 0 && items}
                    {items.length > 0 && <View style={{ width: 5 }} />}
                    <View onPress={() => {
                        if (checkout.checkout_webview && checkout.checkout_webview.enable == '1') {
                            NavigationManager.clearStackAndOpenPage(props.parent.props.navigation, 'CheckoutWebView', {
                                quote_id: data.quote_id
                            });
                        } else {
                            if (Identify.getCustomerData()) {
                                if (!data.hasOwnProperty('estimate_shipping') || !data.estimate_shipping.address || !data.estimate_shipping.shipping_method) {
                                    openAddressBook();
                                } else {
                                    openCheckoutPage(data.estimate_shipping.address);
                                }
                            } else {
                                showCheckoutOptions();
                            }
                        }
                    }} style={{ flex: 1, height: 50, borderRadius: 12, backgroundColor: Identify.theme.button_background, justifyContent: 'center', alignItems: 'center' }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: Identify.theme.button_text_color, fontFamily: material.fontBold, marginLeft: 7, marginRight: 7, fontSize: 16 }}>{Identify.__("Checkout")} ({props.parent.props.data.cart_total})</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    return null;
}

export default Checkoutbutton;