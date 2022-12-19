import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Fab, Icon, Button, Card } from "native-base";
import { View } from 'react-native';
import Events from '@helper/config/events';
import md5 from 'md5';
import Identify from '@helper/Identify';
import material from '@theme/variables/material';
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles';


export default class FabProduct extends SimiComponent {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    dispatchAddButtons() {
        let plugins = Events.events.product_buttons;
        plugins.sort(function (a, b) {
            return parseInt(b.position) - parseInt(a.position);
        });
        let buttons = [];
        for (let i = 0; i < plugins.length; i++) {
            let node = plugins[i];
            if (node.active === true) {
                let key = md5("modules_product_buttons" + i);
                let Content = node.content;
                if(node.content.displayName === 'SocialShare' || node.content.displayName === 'Connect(AddWishlist)') {
                    buttons.push(
                        <View style={{ padding: 5 }}>
                            <Button 
                                key={key} 
                                style={{ 
                                    backgroundColor: Identify.theme.app_background,
                                    borderRadius: 10,
                                    padding: 5, 
                                    marginLeft: Identify.isRtl() ? 0 : (i !== 0 ? 20 : 0),
                                    marginRight: Identify.isRtl() ? (i !== 0 ? 20 : 0) : 0}}>
                                <Content obj={this} product={this.props.parent.product} />
                            </Button>
                        </View>
                    );
                }
            }
        }
        return buttons;
    }

    render() {
        let buttons = this.dispatchAddButtons();

        if (!this.props.parent.product) {
            return (null);
        }
        return (
            <Card style={styles.card}>
                <FlatList 
                    numColumns={2} 
                    data={buttons} 
                    renderItem={({ item }) => item} />
            </Card>
        );
    }

}