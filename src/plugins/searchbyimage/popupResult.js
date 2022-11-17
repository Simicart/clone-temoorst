import React from 'react'
import {Text, View, H3, Button} from 'native-base'
import {Modal, StyleSheet, TouchableOpacity, FlatList , ScrollView } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import material from '../../../native-base-theme/variables/material';
import Identify from "../../core/helper/Identify";
import NavigationManager from "../../core/helper/NavigationManager";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialog: {
        position: 'absolute',
        bottom: 0,
        zIndex: 9999,
        width: material.deviceWidth,
        alignItems: 'center',
        alignSelf: 'baseline',
        backgroundColor: 'white',
        paddingLeft: scale(15),
        paddingRight: scale(15),
        paddingBottom: verticalScale(15),
        paddingTop: verticalScale(15)
    },
});

export default class PopUpResult extends React.Component{
    renderItem(item, specialStyle , index){
        return (
            <TouchableOpacity
                style={{
                    opacity: index === 0 ? 1 : 0.6,
                    maxWidth: material.deviceWidth/2,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: Identify.theme.button_background,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 10,
                    paddingTop: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginLeft: 5, marginRight: 5,
                    backgroundColor: specialStyle ? Identify.theme.button_background : 'white'
                }}
                onPress={() => {
                    this.handleCloseUpdate();
                    NavigationManager.openPage(this.props.navigation, 'Products', {query: item.description.replace(/\n/g, " ")})
                }}
            >
                <Text numberOfLines={1} style={{textAlign: 'center', fontWeight: '900', color: specialStyle ? 'white' : Identify.theme.content_color }}>{item.description.replace(/\n/g, " ")}</Text>
            </TouchableOpacity>
        )
    }
    renderList(data, specialStyle=false){
        return (
            <ScrollView
                style={{
                    width: '100%',
                    marginTop: 15
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showVerticalScrollIndicator={false}
            >
                <FlatList
                    contentContainerStyle={{ flex: 1, flexDirection: 'row' , marginTop: 15}}
                    data={data}
                    scrollEnabled={false}
                    keyExtractor={() => Identify.makeid()}
                    renderItem={({ item , index }) => {
                        return this.renderItem(item, specialStyle , index)

                    }} />
            </ScrollView>
        )
    }
    handleCloseUpdate(){
        this.props.parent.setState({showModal: false, imageTaken: ''});
    }
    render(){
        if(this.props.parent.state.showModal === true){
            return(
                <View>
                    <Modal onRequestClose={() => null} visible={true} transparent={true} animationType="fade">
                        <View activeOpacity={1} style={styles.container}>
                            <View style={styles.dialog}>
                                <H3 style={{color: Identify.theme.button_background, fontSize: 18}}>{Identify.__('Please select for better result')}</H3>
                                {this.renderList(this.props.data.textAnnotations)}
                                {this.renderList(this.props.data.labelAnnotations, true)}
                            </View>
                            <TouchableOpacity style={{flexGrow: 1, width: '100%'}} onPress={() => {this.handleCloseUpdate()}}/>
                        </View>
                    </Modal>
                </View>
            )
        }
        return null;
    }
}