import React, { useState } from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Card, CardItem, Icon, Text, Right, Thumbnail } from 'native-base';
import { TouchableOpacity, View, Animated } from 'react-native';
import Identify from '@helper/Identify';

const BaseMenuItem = (props) => {
    const [buttonColor, setButtonColor] = useState('white');
    if (props.hasOwnProperty('add_condition') && props.add_condition() == false) {
        return null;
    }
    
    return (
        <TouchableOpacity 
            style={{ flex: 1 }}
            onPressIn={() => setButtonColor('orange')}
            onPressOut={() => setButtonColor('white')}
            onPress={() => {
                if (!props.parent.onSelectMenuItem(props.keyItem)) {
                    props.onClick();
                }
            }}>
            <Animated.View style={{ borderBottomWidth: 0.5, borderBottomColor: '#c3c3c3' }}>
                <CardItem style={{ flex: 1, paddingTop: 20, paddingBottom: 20, alignItems: 'center', backgroundColor: buttonColor}}>
                    {props.iconName && <Icon type={props.type} name={props.iconName} style={{color: props.label === 'Sign Out' ? '#FF4040' : '#828282'}}/>}
                    {props.hasOwnProperty('image') && <Thumbnail
                        square
                        source={this.props.image}
                        style={{ width: 25, height: 25}} />}
                    <Text style={{ flex: 1, textAlign: 'left', marginLeft: 10, marginRight: 10 }}>{Identify.__(props.label)}</Text>
                    <Right>
                        {props.extendable && <Icon style={{ marginRight: 10 }} name={Identify.isRtl() ? 'ios-arrow-back' : "ios-arrow-forward"} />}
                    </Right>
                </CardItem>
            </Animated.View>
        </TouchableOpacity>
    );
}

export default BaseMenuItem;