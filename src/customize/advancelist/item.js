import React, { PureComponent } from 'react';
import Touchable from '../../community/react-native-search-list/utils/Touchable';
import { HighlightableText } from '../../community/react-native-search-list/index';
import Identify from "@helper/Identify";
import variable from "@theme/variables/material";
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    iconStyle: {
        right: 0
    },
    iconStyleRtl: {
        right: 0
    }
})

export default class AdvanceListItem extends PureComponent {

    render() {
        let item = this.props.item;
        return (
            <Touchable key={Identify.makeid()} onPress={() => { this.props.parent.handleSelected(item.type, item.key, item) }}>
                <View style={{ flex: 1, marginLeft: 20, marginRight: 20, height: 50, justifyContent: Identify.isRtl() ? 'flex-end' : 'flex-start', alignItems: 'center', flexDirection: Identify.isRtl() ? 'row-reverse' : 'row', borderBottomWidth: 0.5, borderBottomColor: Identify.theme.line_color }}>
                    <Text style={{ flex: 1, textAlign: Identify.isRtl() ? 'right' : 'left' }}>{Identify.__(item.searchStr)}</Text>
                    {item.selected == true ?
                        <Icon type='MaterialIcons' name='radio-button-on' style={[Identify.isRtl() ? styles.iconStyleRtl : styles.iconStyle, {color: Identify.theme.button_background}]} /> 
                        : <Icon type='Ionicons' name='radio-button-off' style={Identify.isRtl() ? styles.iconStyleRtl : styles.iconStyle} /> 
                    }
                </View>
            </Touchable>
        );
    }

}