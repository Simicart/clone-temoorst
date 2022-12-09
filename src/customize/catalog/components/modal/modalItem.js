import { View, Text, TouchableOpacity, Animated, Easing, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Icon } from 'native-base';
import Identify from '@helper/Identify';
const ModalItem = (props) => {
  const index = props.selectedList.map((item) => item.attribute).indexOf(props.item.attribute);
  const [selected, setSelected] = useState(null);
  const [check, setCheck] = useState(false);

  let rotateValueHolder = useRef(new Animated.Value(0)).current;

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

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '180deg', '360deg'],
  });

  useEffect(() => {
    if (!selected) {
      const index = props.selectedList.map((item) => item.attribute).indexOf(props.item.attribute);
      if (index > -1) {
        setSelected(props.selectedList[index]);
      }
    }
  }, [props.selectedList])

  useEffect(() => {
    if (selected) {
      props.setSelectedList((prevState) => {
        let newState;
        const index = prevState.map((item) => item.attribute).indexOf(props.item.attribute);
        // check TH selected co gia tri => check tiep trong TH trong mang co item khac voi item duoc chon thi replace lai  => neu khong co thi push them vao
        if (index > -1) {
          newState = prevState;
          for (let i = 0; i < prevState.length; i++) {
            if (prevState[i].attribute == props.item.attribute && prevState[i].value !== selected.value) {
              newState.push({
                ...selected, attribute: props.item.attribute
              });
            } else if (prevState[i].attribute !== props.item.attribute) {
              newState.push(prevState[i]);
            }
          }
          return newState;
        } else {
          newState = [...prevState, { ...selected, attribute: props.item.attribute }];
          return newState;
        }
      })
    } else {
      // kiem tra xem TH selected = null ma trong mang co ton tai phan tu thi xoa no di
      props.setSelectedList((prevState) => {
        const index = prevState.map((item) => item.attribute).indexOf(props.item.attribute);
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {props.item.title}
          </Text>
          <Text style={{ color: "#ffa100" }}>
            {selected && selected ? selected.label : "Any "} {props.item.title}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => {
            if (check) {
              handlerDown();
              setCheck(false);
            } else {
              handlerUp();
              setCheck(true);
            }
          }}>
            <Animated.Image source={require('../../../images/down.png')}
              style={{
                height: 20, width: 20, transform: [{ rotate: rotateData }],
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {
          check && props.item?.filter.length > 0 ? (
            <View>
              {
                props.item.filter.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected((prevState) => {
                        if (!prevState || prevState.value !== item.value) {
                          return item;
                        }
                        else {
                          return null;
                        }
                      });
                    }}
                    key={index}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                      <View>
                        <Text>
                          {item.label}
                        </Text>
                      </View>
                      <View style={{ borderWidth: 1, borderRadius: 99, height: 25, width: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: selected && selected.value == item.value ? Identify.theme.button_background : 'black' }}>
                        {selected && selected.value == item.value ? <View style={{ width: 15, height: 15, backgroundColor: Identify.theme.button_background, borderRadius: 99 }} /> : null}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          ) : null
        }
      </View>
    </View>
  )
}

export default ModalItem