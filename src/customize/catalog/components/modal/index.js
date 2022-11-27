import { View, Text, Modal, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon } from 'native-base';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Identify from '@helper/Identify';
import { TouchableOpacity } from 'react-native';
import ModalItem from './modalItem';
const ModalComponent = (props) => {
    const [layers, setLayers] = useState(props.layers);
    const [selectedList, setSelectedList] = useState(props?.filterTag ? props?.filterTag : []);
    const handlerFilter = () => {
        let params = [];
        for (let i = 0; i < selectedList.length; i++) {
            let item = selectedList[i];
            // if (params.length > 0) {
            //     params += '&';
            // }
            if (item.attribute != 'cat') {
                params['filter[layer][' + item.attribute + ']'] = item.value;
            }
        }
        props.onFilterAction(params);
        props.onFilterTags(selectedList);
        props.storeData('setModalVisible', false);
    }
    useEffect(() => {
        setLayers(props.layers)
    }, [props.layers])
    useEffect(() => {
        setSelectedList(props.filterTag ? props.filterTag : []);

    }, [props.filterTag])
    if (layers) {
        return (
            <Modal visible={props.modalVisible} style={{}} animationType="slide"
            >
                <View style={{ height: height - 50, width: width, borderRadius: 12, marginTop: 50, borderWidth: 1, borderColor: '#e0e0e0', borderTopRightRadius: 25, borderTopLeftRadius: 25, position: 'relative' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, height: 70, alignItems: 'center' }}>
                        <View />
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Filter</Text>
                        </View>
                        <TouchableOpacity onPress={() => props.storeData('setModalVisible', false)}>
                            <Icon style={{ textAlign: 'right', marginLeft: 0, marginRight: 0, fontSize: 25, color: 'black' }} type="AntDesign" name="close" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ paddingHorizontal: 20, height: height - 300 }}>
                        {
                            layers?.layer_filter.map((item, index) => (
                                <ModalItem item={item} {...props} key={index} setSelectedList={setSelectedList} selectedList={selectedList} />
                            ))
                        }
                    </ScrollView>
                    <View style={{
                        height: 100, width: '100%', borderColor: '#E0E0E0', borderWidth: 1, borderTopLeftRadius: 12, borderTopRightRadius: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10,
                        // position: 'absolute', bottom: 0, right: 0, left: 0
                    }}>
                        <TouchableOpacity onPress={() => handlerFilter()}>
                            <View style={{ borderRadius: 12, backgroundColor: 'red', height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: "bold", color: "white", width: width - 50 }}>
                                    {Identify.__("APPLY")}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        )
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    return { modalVisible: state.redux_data.modalVisible };
}
//Save to redux.
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);