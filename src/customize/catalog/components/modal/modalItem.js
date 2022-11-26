import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon } from 'native-base';
import Identify from '@helper/Identify';
const ModalItem = (props) => {
  const [selected, setSelected] = useState(null);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (selected) {
      props.setSelectedList((prevState) => {

        let newState;
        const index = prevState.map((item) => item.attribute).indexOf(props.item.attribute);
        if (index > -1) {
          newState = prevState.map((item) => {
            if (item.attribute == props.item.attribute) {
              return {
                ...selected, attribute: props.item.attribute
              };
            }
            return item;
          })
          return newState;

        } else {
          newState = [...prevState, { ...selected, attribute: props.item.attribute }];
          return newState;
        }
      })
    }
  }, [selected])

  // const onSelectFilter =(selection)  =>{
  //   let params = {};
  //   params['filter[layer][' + attribute.attribute + ']'] = selection.value;

  //   if (selected) {
  //     for (let i = 0; i < selected.length; i++) {
  //       let item = selected[i];
  //       if (item.attribute != 'cat') {
  //         params['filter[layer][' + item.attribute + ']='] = item.value;
  //       }
  //     }
  //   }

  //   // this.onFilterAction(params);
  // }
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
            setCheck(!check)
          }}>
            {
              check ? (
                <Icon style={{ textAlign: 'right', marginLeft: 0, marginRight: 0, fontSize: 16, color: 'black' }} type="AntDesign" name="up" />
              ) : (
                <Icon style={{ textAlign: 'right', marginLeft: 0, marginRight: 0, fontSize: 16, color: 'black' }} type="AntDesign" name="down" />
              )
            }
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
                      setSelected(item);
                    }}
                    key={index}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                      <View>
                        <Text>
                          {item.label}
                        </Text>
                      </View>
                      <View style={{ borderWidth: 1, borderRadius: 99, height: 25, width: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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