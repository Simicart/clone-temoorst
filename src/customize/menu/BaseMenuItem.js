import React, { useState } from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card, CardItem, Icon, Text, Right, Thumbnail } from 'native-base';
import { TouchableOpacity, View, Animated } from 'react-native';
import Identify from '@helper/Identify';

const BaseMenuItem = (props) => {
    if (props.hasOwnProperty('add_condition') && props.add_condition() == false) {
        return null;
    }
    return (
        <TouchableOpacity 
            style={{ flex: 1 }}
            onPress={() => {
                if (!props.parent.onSelectMenuItem(props.keyItem)) {
                    props.onClick();
                }
            }}>
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: Identify.theme.line_color }}>
                <CardItem style={{ flex: 1, paddingTop: 20, paddingBottom: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                    {props.iconName && <Icon type={props.type} name={props.iconName} style={{color: props.label === 'Sign Out' ? '#FF4040' : Identify.theme.icon_color}}/>}
                    {props.hasOwnProperty('image') && <Thumbnail
                        square
                        source={this.props.image}
                        style={{ width: 25, height: 25}} />}
                    <Text style={{ flex: 1, textAlign: 'left', marginHorizontal: 20 }}>{Identify.__(props.label)}</Text>
                    <View style={{ alignItems: 'flex-end' }}>
                        {props.extendable && <Icon style={{ marginHorizontal: 10 }} name={Identify.isRtl() ? 'ios-arrow-back' : "ios-arrow-forward"} />}
                    </View>
                </CardItem>
            </View>
        </TouchableOpacity>
    );
}

export default BaseMenuItem;