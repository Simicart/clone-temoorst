import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'native-base';
import Identify from '@helper/Identify';

const FilterTag = (props) => {
    const [filterTags, setFilterTags] = useState(props?.filterTag);
    useEffect(() => {
        setFilterTags(props?.filterTag);
    }, [props?.filterTag]);
    const handlerRemoveFilterTag = (item) => {
        let params = [];
        const index = filterTags.map((item) => item.attribute).indexOf(item.attribute);
        filterTags.splice(index, 1);
        if (filterTags.length > 0) {

            for (let i = 0; i < filterTags.length; i++) {
                let item = filterTags[i];
                // if (params.length > 0) {
                //     params += '&';
                // }
                if (item.attribute != 'cat') {
                    params['filter[layer][' + item.attribute + ']'] = item.value;
                }
            }
        }
        props.onFilterAction(params);
        props.onFilterTags(filterTags.length > 0 ? filterTags : null);
    }
    if (filterTags) {
        return (
            <View style={{ marginHorizontal: 15, marginBottom: 5, height: 50 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        filterTags.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handlerRemoveFilterTag(item)}>
                                <View style={{ padding: 5, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Identify.theme.button_background, borderRadius: 12, marginRight: 10 }}>
                                    <Text style={{ color: Identify.theme.button_text_color, marginRight: 3 }}>
                                        {item.attribute}: {item.label}
                                    </Text>
                                    <Icon style={{ fontSize: 16, color: Identify.theme.button_text_color }} type="AntDesign" name="close" />
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
    else {
        return null;
    }
}

export default FilterTag