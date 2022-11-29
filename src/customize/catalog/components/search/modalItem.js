import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Identify from '@helper/Identify';

const ModalItem = (props) => {
    const [totalItem, setTotalItem] = useState(1);
    const [selected, setSelected] = useState(props.sortBy ? props.sortBy : props.item[0]);
    let rotateValueHolder = useRef(new Animated.Value(0)).current;
    let heightAnimated = useRef(new Animated.Value(0)).current;
    const [check, setCheck] = useState(false);
    const handlerUp = () => {
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const handlerDown = () => {
        Animated.timing(rotateValueHolder, {
            toValue: 2,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const handlerHeightAnimation = (value) => {
        Animated.timing(heightAnimated, {
            toValue: value,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }

    useEffect(() => {
        setTotalItem(props.item.length);
    }, [props.item])
    const heightDownData = heightAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, totalItem * 55]
    })
    const heightUpData = heightAnimated.interpolate({
        inputRange: [1, 2],
        outputRange: [totalItem * 55, 0]
    })
    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0deg', '180deg', '360deg'],
    });

    useEffect(() => {
        if (selected) {
            props.setSelectedList((prevState) => {
                let newState;
                const index = prevState.map((item) => item.key).indexOf(props.item.key);
                // check TH selected co gia tri => check tiep trong TH trong mang co item khac voi item duoc chon thi replace lai  => neu khong co thi push them vao
                if (index > -1) {
                    newState = [];
                    for (let i = 0; i < prevState.length; i++) {
                        if (prevState[i].key == props.item.key && prevState[i].value !== selected.value) {
                            newState.push({
                                ...selected, attribute: props.item.key
                            });
                        } else if (prevState[i].key !== props.item.key) {
                            newState.push(prevState[i]);
                        }
                    }
                    return newState;
                } else {
                    newState = [...prevState, { ...selected, attribute: props.item.key }];
                    return newState;
                }
            })
        } else {
            // kiem tra xem TH selected = null ma trong mang co ton tai phan tu thi xoa no di
            props.setSelectedList((prevState) => {
                const index = prevState.map((item) => item.key).indexOf(props.item.key);
                if (index > 0) {
                    return prevState.splice(index, 1);
                } else {
                    return prevState;
                }
            })
        }
    }, [selected])

    return (
        <View style={{ borderBottomColor: '#e0e0e0', borderBottomWidth: 1, paddingVertical: 10, }}>

            <TouchableOpacity onPress={() => {
                if (check) {
                    handlerDown();
                    setCheck(false);
                    handlerHeightAnimation(2);
                    heightAnimated.setValue(0);
                } else {
                    handlerUp();
                    setCheck(true);
                    handlerHeightAnimation(1);
                }
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                            {Identify.__("Sort by")}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: Identify.theme.button_background, marginRight: 3 }}>
                                {selected.value} {selected.direction}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Animated.Image source={require('@customize/images/down.png')}
                            style={{
                                height: 20, width: 20, transform: [{ rotate: rotateData }],
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                {
                    check && props.item.length > 0 ? (
                        <Animated.View style={{ height: check ? heightDownData : heightUpData }}>
                            {
                                props.item.map((item, index) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelected((prevState) => {
                                                if (!prevState || prevState.direction !== item.direction || prevState.value !== item.value) {
                                                    props.handlerSortBy(item)
                                                    return item;
                                                }
                                                else {
                                                    return null;
                                                }
                                            });
                                        }}
                                        key={index}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, height: 30 }}>
                                            <View>
                                                <Text>
                                                    {item?.value} {item.direction}
                                                </Text>
                                            </View>
                                            <View style={{ borderWidth: 1, borderRadius: 99, height: 25, width: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: selected && selected.direction == item.direction && selected.value == item.value ? Identify.theme.button_background : 'black' }}>
                                                {selected && selected.direction == item.direction && selected.value == item.value ? <View style={{ width: 15, height: 15, backgroundColor: Identify.theme.button_background, borderRadius: 99 }} /> : null}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </Animated.View>
                    ) : null
                }
            </View>
        </View>
    )
}

export default ModalItem