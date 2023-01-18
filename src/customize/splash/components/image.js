import React from 'react';
import { View, Image, Platform, Dimensions } from 'react-native';
import Device from '@helper/device';
import simicart from '@helper/simicart';

const platform = Platform.OS;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const ImageSplash = () => {
    if (platform === "ios") {
        // if (Platform.isPad) {
        //     if (deviceHeight > deviceWidth) {
        //         return (
        //             <Image source={require('@media/Images/Default-Portrait~ipad.png')} />
        //         )
        //     } else {
        //         return (
        //             <Image source={require('@media/Images/Default-Landscape~ipad.png')} />
        //         )
        //     }
        // } else {
        //     if (deviceHeight == 568) {
        //         return (
        //             <Image source={require('@media/Images/Default-568h.png')} />
        //         )
        //     } else if (deviceHeight == 667) {
        //         return (
        //             <Image source={require('@media/Images/Default-667h.png')} />
        //         )
        //     } else if (deviceHeight == 736) {
        //         return (
        //             <Image source={require('@media/Images/Default-736h.png')} />
        //         )
        //     } else if (deviceHeight == 812) {
        //         return (
        //             <Image source={require('@media/Images/Default-812h.png')} />
        //         )
        //     } else
        //         return (
        //             <Image source={require('@media/Images/Default.png')} />
        //         )
        // }
        return (
            <Image source={require('@media/logo.png')} style={{ height: 50, resizeMode: 'contain', width: 200 }} />
        )
    } else {
        //android
        if (simicart.fullSplash == '1') {
            let source = null;
            if (Device.isTablet()) {
                // source = require('@media/splash_tablet.png');
                source = require('@media/logo.png');
            } else {
                // source = require('@media/splash.png');
                source = require('@media/logo.png');
            }
            return (
                <Image source={source} style={{ height: 50, resizeMode: 'contain', width: 200 }} />
            )
        } else {
            return (<Image source={require('@media/logo.png')} style={{ height: 50, resizeMode: 'contain', width: 200 }} />)
        }
    }
    return null;
}

export default ImageSplash;
