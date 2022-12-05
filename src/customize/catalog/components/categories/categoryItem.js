import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { Text } from 'native-base'
import styles from './styles';
import NavigationManager from '@helper/NavigationManager';
import SimiCart from '@helper/simicart';
import SimiComponent from '../../../../core/base/components/SimiComponent';

const width = Dimensions.get('window').width;

export default class CategoryItem extends SimiComponent {
    constructor(props) {
        super(props),
            this.state = {
                animatePress: new Animated.Value(1)
            }
    }

    animatePressIn() {
        Animated.timing(this.state.animatePress, {
            toValue: 0.9,
            duration: 200
        }).start();
    }

    animatePressOut() {
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 200
        }).start();
    }

    onPressItem(item) {
        // this.props.parent.onSelectItem(item);cateDatcateDatcateDatccateDatccateDatca
        let cateData = {
            categoryId: item.entity_id,
            categoryName: item.name
        }
        this.handleViewAll(cateData);
    }

    handleViewAll = (cateData) => {
        NavigationManager.openPage(this.props.navigation, 'Products', cateData);
    }
    render() {
        let image = "";
        if (!this.props.element?.image_url?.includes("https")) {
            image = SimiCart.merchant_url + this.props.element?.image_url;
        } else {
            image = this.props.element?.image_url;
        }

        return (
            <TouchableOpacity
                key={this.props.element.entity_id}
                onPressIn={() => this.animatePressIn()}
                onPressOut={() => this.animatePressOut()}
                onPress={() => this.onPressItem(this.props.element)}
            >
                <Animated.View style={{ marginTop: 10, marginBottom: 10, marginLeft: width*0.03, marginRight: width*0.03, transform: [{ scale: this.state.animatePress }] }}>
                    <View style={styles.setShadowImage}>
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 5 }}>{this.props.element.name}</Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}