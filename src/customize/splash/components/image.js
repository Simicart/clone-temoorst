// import React from 'react';
// import { View, Image, Platform, Dimensions } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import {
    SafeAreaView,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import Device from '@helper/device';
import simicart from '@helper/simicart';

const ImageSplash = () => {
    // const opacityAnimate = useRef(new Animated.Value(0)).current;
    const widthAnimate = useRef(new Animated.Value(0)).current;
    const opactity = widthAnimate.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0.5]
    })
    useEffect(() => {
        Animated.loop(
            Animated.timing(widthAnimate, {
                duration: 500,
                toValue: 150,
                delay: 0,
                useNativeDriver: false,
            }),
        ).start();
    }, [widthAnimate]);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'relative', height: 50, width: 150 }}>
                <Animated.Image resizeMode='contain' style={{ height: 50, width: 150, opacity: opactity }} source={require('@media/logo.png')} />
                <Animated.View
                    style={{ height: 50, position: 'absolute', top: 0, left: 0, width: widthAnimate, opacity: 0.2, zIndex: 99, backgroundColor: '#e0e0e0' }}
                />
            </View>
        </View>
    );
}

export default ImageSplash;