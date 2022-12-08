import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Identify from '@helper/Identify';

const HeaderProducts = (props) => {
    if (props.cateChilds) {
        return (
            <View style={{ height: 40, marginVertical: 15 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
                    {
                        props.cateChilds.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => props.onSelectedCategory(item)}>
                                <View style={{ paddingHorizontal: 20, backgroundColor: props.selectedCate.entity_id == item.entity_id ? Identify.theme.button_background : '#f8e4dc', borderRadius: 25, marginRight: 15, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: props.selectedCate.entity_id == item.entity_id ? "white" : Identify.theme.button_background, fontWeight: "bold", }}>
                                        {
                                            item.name.toUpperCase()
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        )
    } else {
        return null
    }

}

export default HeaderProducts