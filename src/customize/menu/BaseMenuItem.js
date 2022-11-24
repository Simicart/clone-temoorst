import React, { useState } from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card, CardItem, Icon, Text, Right, Thumbnail } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
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
            }}
            >
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#c3c3c3' }}>
                <CardItem style={{ flex: 1, paddingTop: 20, paddingBottom: 20, alignItems: 'center'}}>
                    {props.iconName && <Icon name={props.iconName}/>}
                    {props.hasOwnProperty('image') && <Thumbnail
                        square
                        source={this.props.image}
                        style={{ width: 25, height: 25}} />}
                    <Text style={{ flex: 1, textAlign: 'left', marginLeft: 10, marginRight: 10 }}>{Identify.__(props.label)}</Text>
                    <Right>
                        {props.extendable && <Icon style={{ marginRight: 10 }} name={Identify.isRtl() ? 'ios-arrow-back' : "ios-arrow-forward"} />}
                    </Right>

                </CardItem>
            </View>
        </TouchableOpacity>
    );
}

export default BaseMenuItem;