import { View, Text, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import styles from './styles'
const WishlistItem = (props) => {
    console.log("props in item: ", props);
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.95];
    const scaleAnimation = animation.interpolate({ inputRange, outputRange });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };
    return (
        <Animated.View
            style={{ transform: [{ scale: scaleAnimation }], }}
        >
            <TouchableOpacity
                onPress={() => { props.parent.openProduct(props.item) }}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Animated.View key={props.item.wishlist_item_id} style={{
                    borderRadius: 12, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    borderColor: "#e0e0e0",
                    borderWidth: 1,
                    elevation: 2,
                    marginBottom: 15,
                    transform: [{ scale: scaleAnimation }],

                }}>
                    <View style={[styles.itemView, { borderRadius: 12 }]}>
                        {props.renderWishListItemImage}
                        {props.renderItemRight}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
}

export default WishlistItem