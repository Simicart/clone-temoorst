import { View, Text, TouchableOpacity, Animated, Image } from 'react-native'
import React, { useRef, useEffect } from 'react'
import material from "@theme/variables/material";
import NavigationManager from '@helper/NavigationManager';
import { Badge } from 'native-base'
import { connect } from 'react-redux';
import Identify from '@helper/Identify';

const Item = (props) => {
    const padding = useRef(new Animated.Value(5)).current;
    useEffect(() => {
        Animated.timing(padding, {
            toValue: 15,
            duration: 200
        }).start();
        // if (props.bottomAction == 'MyAccount' && Identify.isEmpty(props.customer_data)) {
        //     NavigationManager.openPage(props.navigation, "Login");
        // }
    }, [props.bottomAction]);
    return (
        <TouchableOpacity
            onPress={() => {
                props.storeData('bottomAction', props?.data?.route_name);
                NavigationManager.openRootPage(props?.navigation, props?.data?.route_name, {});
            }}
        >
            <View style={{ paddingHorizontal: 10 }}>
                {
                    props?.bottomAction === props?.data?.route_name ? (
                        <View style={{}}>
                            <Animated.View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ff9800', padding: 5, paddingHorizontal: props?.padding, borderRadius: 8 }}>
                                <View style={{ marginRight: 10 }}>
                                    <Image
                                        source={props?.data?.icon}
                                        style={{ height: 30, width: 30, tintColor: 'white' }}
                                    />
                                </View>
                                <Text style={{ color: 'white' }}>
                                    {props?.data?.title}
                                </Text>
                            </Animated.View>
                        </View>
                    ) : (
                        <View style={{ position: 'relative' }}>
                            <Image
                                source={props?.data?.icon}
                                style={{ height: 30, width: 30 }}
                            />
                        </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Item); 