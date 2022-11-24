import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { Text } from 'native-base'
import styles from './styles';
import NavigationManager from '@helper/NavigationManager';
import SimiCart from '@helper/simicart';

export default class CategoryItem extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            animatePress: new Animated.Value(1)
        }
    }

    animatePressIn(){
        Animated.timing(this.state.animatePress, {
            toValue: 0.9,
            duration: 200
        }).start();
    }

    animatePressOut(){
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
        if(!this.props.element.image?.includes("https")) 
            image = SimiCart.merchant_url + this.props.element.image;
        return(
            <TouchableOpacity
                key={this.props.element.entity_id}
                onPressIn={()=> this.animatePressIn() }
                onPressOut={() => this.animatePressOut() }
                onPress={() => this.onPressItem(this.props.element)}
                >
                <Animated.View style={{marginTop: 10, marginBottom: 10, transform: [{ scale: this.state.animatePress }] }}>
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