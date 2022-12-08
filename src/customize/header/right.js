// import React from 'react';
// import { Icon, Badge, Text } from 'native-base';
// import variable from "@theme/variables/material";
// import { StyleSheet, Platform, TouchableHighlight, View } from 'react-native';
// import NavigationManager from '@helper/NavigationManager';
// import Device from '@helper/device';
// import { products_mode } from "@helper/constants";
// import Events from '@helper/config/events';
// import md5 from 'md5';
// import Identify from '@helper/Identify';
// import { connect } from 'react-redux';

// const RightHeader = (props) => {
//     function renderQty() {
//         let qtyStyle = { position: 'absolute', right: -5, top: 0, height: 20, paddingBottom: 2 }
//         let textQtyStyle = Platform.OS === "ios" ? { fontSize: 7, lineHeight: 0 } : { fontSize: 8 };
//         let qty = props.parent.props.data.cart_total ? (
//             <TouchableHighlight style={qtyStyle}
//                 onPress={() => { NavigationManager.openPage(props.navigation, 'Cart', {}); }}>
//                 <Badge style={{ height: 20, alignItems: "center", justifyContent: 'center' }}>
//                     <Text style={textQtyStyle}>{props.parent.props.data.cart_total}</Text>
//                 </Badge>
//             </TouchableHighlight>
//         ) : null;
//         return (qty);
//     }

//     function renderCart() {
//         return (
//             <Icon name="cart"
//                 style={{ color: variable.toolbarBtnColor, fontSize: 25, padding: 7, paddingLeft: 10, paddingRight: 10, transform: [{ scaleX: Identify.isRtl() ? -1 : 1 }] }}
//                 onPress={() => {
//                     NavigationManager.openPage(props.navigation, 'Cart', {});
//                 }} />
//         );
//     }

//     function renderSearch() {
//         let search = props.parent.props.showSearch ? <Icon name='search'
//             style={{ fontSize: 25, color: variable.toolbarBtnColor, marginRight: Device.isTablet() ? 5 : 0, padding: 7, paddingLeft: 10, paddingRight: 10 }}
//             onPress={() => {
//                 openSearchPage();
//             }} /> : null;
//         return (search);
//     }


//     if (props.parent.props.show_right == false) {
//         return (
//             <View style={{ width: 30, height: 40 }} />
//         );
//     }
//     let plugins = dispatchEventAddItems();

//     function openSearchPage() {
//         if (props.navigation.getParam("query")) {
//             NavigationManager.backToPreviousPage(props.navigation);
//         } else {
//             let mode = props.navigation.getParam("mode");
//             if (mode && mode === products_mode.spot) {
//                 props.navigation.state.routeName = 'SearchProducts';
//                 params = {
//                     mode: mode,
//                 };
//             } else {
//                 props.navigation.state.routeName = 'SearchProducts';
//                 params = {
//                     categoryId: props.navigation.getParam("categoryId"),
//                     categoryName: props.navigation.getParam("categoryName"),
//                 };
//             }
//             console.log("vao openSearchPage");
//             NavigationManager.openPage(props.navigation, props.navigation.state.routeName, params);
//         }
//     }

//     function renderFilter() {
//         return (
//             <Icon name='filter'
//                 style={{ fontSize: 25, color: variable.toolbarBtnColor, marginRight: Device.isTablet() ? 5 : 0, padding: 7, paddingLeft: 10, paddingRight: 10 }}
//                 onPress={() => {
//                     props.storeData('setModalVisible', true);
//                 }} />
//         );
//     }

//     function dispatchEventAddItems() {
//         let events = Events.events.header_items_right;

//         let items = [];
//         if (events) {
//             for (let i = 0; i < events.length; i++) {
//                 let item = events[i];
//                 if (item.active == true) {
//                     let key = md5("header_right" + i);
//                     let Content = item.content;
//                     items.push(<Content obj={this} navigation={props.navigation} key={key} />);
//                 }
//             }
//         }
//         return items;
//     }
//     if (props.navigation.state.routeName === "Home" || props.navigation.state.routeName === "Category" || props.navigation.state.routeName === "Cart" || props.navigation.state.routeName === "MyAccount") {
//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 {/* {plugins} */}
//                 {renderSearch()}
//             </View>
//         )
//     } else if (props.navigation.state.routeName === "ProductDetail") {
//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 {/* {plugins} */}
//                 {renderCart()}
//                 {renderQty()}
//             </View>
//         )
//     }
//     else if (props.navigation.state.routeName === "Products") {
//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 {renderFilter()}
//                 {renderCart()}
//                 {renderQty()}
//             </View>
//         )
//     }
//     else if (props.navigation.state.routeName === "SearchProducts") {
//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 {renderFilter()}
//             </View>
//         )
//     } else {
//         return (
//             <View />
//         );
//     }


// }

// export const styles = StyleSheet.create({
//     bothLeftRight: {
//         zIndex: 999,
//     },
//     qty: {
//         position: 'absolute', right: -8, top: 3, height: 20, marginBottom: 2
//     }
// });

// //Save to redux.
// const mapDispatchToProps = (dispatch) => {
//     return {
//         storeData: (type, data) => {
//             dispatch({ type: type, data: data })
//         }
//     };
// };

// export default connect(null, mapDispatchToProps)(RightHeader);

import React from 'react';
import { Icon, Badge, Text } from 'native-base';
import variable from "@theme/variables/material";
import { StyleSheet, Platform, TouchableHighlight, View } from 'react-native';
import NavigationManager from '@helper/NavigationManager';
import Device from '@helper/device';
import { products_mode } from "@helper/constants";
import Events from '@helper/config/events';
import md5 from 'md5';
import Identify from '@helper/Identify';
import { listBottomButtons } from '@customize/bottomMenu';
import { connect } from 'react-redux';
const RightHeader = (props) => {

    function renderQty() {
        let qtyStyle = { position: 'absolute', right: -5, top: 0, height: 20, paddingBottom: 2 }
        let textQtyStyle = Platform.OS === "ios" ? { fontSize: 7, lineHeight: 0 } : { fontSize: 8 };
        let qty = props.parent.props.data.cart_total ? (
            <TouchableHighlight style={qtyStyle}
                onPress={() => { NavigationManager.openPage(props.navigation, 'Cart', {}); }}>
                <Badge style={{ height: 20, alignItems: "center", justifyContent: 'center' }}>
                    <Text style={textQtyStyle}>{props.parent.props.data.cart_total}</Text>
                </Badge>
            </TouchableHighlight>
        ) : null;
        return (qty);
    }
    function renderFilter() {
        return (
            <Icon name='filter'
                style={{ fontSize: 25, color: variable.toolbarBtnColor, marginRight: Device.isTablet() ? 5 : 0, padding: 7, paddingLeft: 10, paddingRight: 10 }}
                onPress={() => {
                    props.storeData('setModalVisible', true);
                }} />
        );
    }
    function renderCart() {
        return (
            <Icon name="cart"
                style={{ color: variable.toolbarBtnColor, fontSize: 23, padding: 7, paddingLeft: 10, paddingRight: 10, transform: [{ scaleX: Identify.isRtl() ? -1 : 1 }] }}
                onPress={() => {
                    NavigationManager.openPage(props.navigation, 'Cart', {});
                }} />
        );
    }

    function renderSearch() {
        let search = props.parent.props.showSearch ? <Icon name='search'
            style={{ fontSize: 23, color: variable.toolbarBtnColor, marginRight: Device.isTablet() ? 5 : 0, padding: 7, paddingLeft: 10, paddingRight: 10 }}
            onPress={() => {
                openSearchPage();
            }} /> : null;
        return (search);
    }


    if (props.parent.props.show_right == false) {
        return (
            <View style={{ width: 30, height: 40 }} />
        );
    }
    let plugins = dispatchEventAddItems();
    // return (
    //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         {/* {plugins} */}
    //         {renderSearch()}
    //         {renderCart()}
    //         {renderQty()}
    //     </View>
    // )
    if (listBottomButtons?.map((item) => item.route_name).includes(props.bottomAction)) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* {plugins} */}
                {renderSearch()}
            </View>
        )
    } else if (props.navigation.state.routeName === "ProductDetail") {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* {plugins} */}
                {renderCart()}
                {renderQty()}
            </View>
        )
    }
    else if (props.navigation.state.routeName === "Products") {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {renderFilter()}
                {renderCart()}
                {renderQty()}
            </View>
        )
    }
    else if (props.navigation.state.routeName === "SearchProducts") {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {renderFilter()}
            </View>
        )
    } else {
        return (
            <View />
        );
    }

    function openSearchPage() {
        if (props.navigation.getParam("query")) {
            NavigationManager.backToPreviousPage(props.navigation);
        } else {
            let mode = props.navigation.getParam("mode");
            if (mode && mode === products_mode.spot) {
                routeName = 'SearchProducts';
                params = {
                    mode: mode,
                };
            } else {
                routeName = 'SearchProducts';
                params = {
                    categoryId: props.navigation.getParam("categoryId"),
                    categoryName: props.navigation.getParam("categoryName"),
                };
            }
            NavigationManager.openPage(props.navigation, routeName, params);
        }
    }

    function dispatchEventAddItems() {
        let events = Events.events.header_items_right;

        let items = [];
        if (events) {
            for (let i = 0; i < events.length; i++) {
                let item = events[i];
                if (item.active == true) {
                    let key = md5("header_right" + i);
                    let Content = item.content;
                    items.push(<Content obj={this} navigation={props.navigation} key={key} />);
                }
            }
        }
        return items;
    }
}

export const styles = StyleSheet.create({
    bothLeftRight: {
        zIndex: 999,
    },
    qty: {
        position: 'absolute', right: -8, top: 3, height: 20, marginBottom: 2
    }
});
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

export default connect(mapStateToProps, mapDispatchToProps)(RightHeader);