import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { View } from "native-base";
import { connect } from 'react-redux';
import Identify from '@helper/Identify';
import Item from './item';
import NavigationManager from '@helper/NavigationManager';
const listBottomButtons = [
    {
        key: 'home_bottom',
        route_name: "Home",
        icon: require('../images/home.png'),
        title: Identify.__('Home')
    },
    {
        key: 'root_cate',
        route_name: "Category",
        icon: require('../images/cate.png'),
        title: Identify.__('Category')
    },
    {
        key: 'cart_bottom',
        route_name: "Cart",
        icon: require('../images/cart.png'),
        title: Identify.__('Cart'),
    },
    {
        key: 'account_bottom',
        route_name: "MyAccount",
        icon: require('../images/account.png'),
        title: Identify.__('Account'),
    }
]

const BottomMenu = (props) => {
    const [check, setCheck] = useState(false);
    const [active, setActive] = useState('Home');
    const padding = useRef(new Animated.Value(5)).current;
    useEffect(() => {
        if (!listBottomButtons?.map((item) => item.route_name).includes(props.navigation.state.routeName)) {
            setCheck(true);
        }
        Animated.timing(padding, {
            toValue: 15,
            duration: 200
        }).start();
        if (props.navigation.state.routeName == 'MyAccount' && Identify.isEmpty(props.customer_data)) {
            NavigationManager.openPage(props.navigation, "Login");
        }
    }, [props.navigation.state.routeName]);

    useEffect(() => {
        if (!Identify.isEmpty(props.customer_data)) {
            let customer = props.customer_data;
            listBottomButtons.map((item) => {
                if (item.route_name === "MyAccount") {
                    item.title = customer.firstname + ' ' + customer.lastname;
                    return item;
                }
                return item;
            })
        }
    }, [])

    // useEffect(() => {
    //     Animated.timing(padding, {
    //         toValue: 15,
    //         duration: 200
    //     }).start();
    //     if (active == 'MyAccount' && Identify.isEmpty(props.customer_data)) {
    //         console.log("props.customer_data: ", props.customer_data);
    //         NavigationManager.openPage(props.navigation, "Login");
    //     }
    // }, [active])
    if (check) {
        return null;
    } else {
        return (
            <View style={{
                backgroundColor: 'white',
                padding: 10, paddingBottom: 30, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8
            }}>
                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {
                        listBottomButtons?.map((item, index) => (
                            <Item
                                data={item}
                                key={index}
                                routeName={props.navigation.state.routeName}
                                navigation={props.navigation}
                                padding={padding}
                                setActive={setActive}
                                active={active}
                            />
                        ))
                    }
                </View>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.redux_data.customize_show_noti_success,
        customer_data: state.redux_data.customer_data,
        redux_data: state.redux_data,
        quoteitems: state.redux_data.quoteitems
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu);