import { View, Text, TouchableOpacity, Animated, Image } from 'react-native'
import React from 'react'
import material from "@theme/variables/material";
import NavigationManager from '@helper/NavigationManager';
import { Badge } from 'native-base'
const Item = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                console.log("props in Item onPress: ", props);
                console.log("active onPress: ", props?.data?.route_name);
                props.setActive(props?.data?.route_name);
                NavigationManager.openRootPage(props?.navigation, props?.data?.route_name, {});
            }}
        >
            <View style={{ paddingHorizontal: 10 }}>
                {
                    props?.routeName === props?.data?.route_name ? (
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

export default Item