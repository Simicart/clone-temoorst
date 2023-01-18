import React from 'react';
import Abstract from "../base/Abstract";
import { Modal, TouchableOpacity, Dimensions } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button';
import Identify from "@helper/Identify";
import { FlatList } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window')

class Options extends Abstract {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            modalVisible: false,
            label: 'Choose a ' + props.data.label,
            selected: null,
        };
        this.attribute_id = this.props.attribute_id;
        this.defaultValue = this.parent.selected_options[this.attribute_id] ? this.parent.selected_options[this.attribute_id] : null;
        this.defaultIndex = null;
        this.dataLength = this.props.data.options.length
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    updateCheck = (index, val) => {
        this.parent.updateSelectedOptions(this.attribute_id, val.id);
        //this.updateSelected(this.key,val);
    };
    showModal(){
        let { data } = this.props;
        let items = null;
        items = this.renderOptions(data);
        return(
            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
                activeOpacity={1}
                onPress={() => this.setState({modalVisible: false})}>
                    <TouchableOpacity 
                        style={{ height: this.dataLength>1 ? 85+this.dataLength*50 : 165, width: '100%', backgroundColor: Identify.theme.app_background, borderRadius: 15 }}
                        activeOpacity={1}>
                        <View 
                            style={{
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                marginHorizontal: 15,
                                paddingTop: 15, 
                                paddingBottom: 15,
                                borderBottomWidth: 0.5, 
                                borderBottomColor: Identify.theme.line_color  }}>        
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{Identify.__('Choose a ' + data.label)}</Text>
                            <TouchableOpacity onPress={() => this.setState({modalVisible: false})}>
                                <Icon name='close' type='AntDesign' style= {{ color: Identify.theme.icon_color, fontSize: 24 }} />
                            </TouchableOpacity>
                        </View>
                        {items}
                        {/* {this.renderOptions(this.props.data)} */}
                    </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    renderOptions(data) {
        let values = data.options;
        let canValues = this.parent.can_select[this.attribute_id];
        // if (this.parent.can_select.length > 0) {
        //     for (let j in this.parent.can_select) {
        //         let selected = this.parent.can_select[j];
        //         if (this.attribute_id == selected.id) {
        //             canValues = selected.products;
        //         }
        //     }
        // }
        let conunt = 0;
        let items = values.map((item, index) => {
            if (item.id == this.defaultValue) this.defaultIndex = conunt;
            conunt++;
            let prices = 0;
            if (item.price) {
                prices = item.price;
            } else if (item.price_including_tax) {
                prices = item.price_including_tax.price;
            }
            if (canValues.length > 0) {
                if (canValues.indexOf(item.id) >= 0) {
                    //can select
                    return (
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={() => [this.setState({ label: Identify.isRtl() ? (item.label + ' :' + this.props.data.label) : (this.props.data.label + ': ' + item.label), selected: item.label, modalVisible: false }), this.updateCheck(index, item) ]}>
                            <View style={{ width: width*0.9, height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: Identify.theme.line_color }}>
                                <Text >{Identify.__(item.label)}</Text>
                                {item.label == this.state.selected ?
                                    <Icon type='MaterialIcons' name='radio-button-on' style={{color: Identify.theme.button_background, fontSize: 20}} /> 
                                    : <Icon type='Ionicons' name='radio-button-off' style={{ fontSize: 20 }}/> 
                                }
                            </View>
                        </TouchableOpacity>
                    )
                } else {
                    if (this.parent.selected_options[this.attribute_id] && this.parent.selected_options[this.attribute_id] == item.id) {
                        //remove selected
                        this.parent.selected_options[this.attribute_id] = null;
                        this.defaultIndex = null;
                        this.parent.done = false;
                    }
                    return (
                        // <RadioButton
                        //     key={Identify.makeid()}
                        //     value={item.id}
                        //     color='#039BE5'
                        //     disabled={true}
                        //     iconStyle={{
                        //         marginRight: Identify.isRtl() ? 0 : 16,
                        //         marginLeft: Identify.isRtl() ? 16 : 0
                        //     }}>
                        //     {this.renderLableItem(item.label, prices, { color: '#dedede' })}
                        // </RadioButton>
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={() => [this.setState({ label: this.props.data.label + ': ' + item.label, selected: item.label, modalVisible: false }), this.updateCheck(index, item) ]}>
                            <View style={{ width: width*0.9, height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: Identify.theme.line_color }}>
                                <Text >{Identify.__(item.label)}</Text>
                                {item.label == this.state.selected ?
                                    <Icon type='MaterialIcons' name='radio-button-on' style={{color: Identify.theme.button_background, fontSize: 20}} /> 
                                    : <Icon type='Ionicons' name='radio-button-off' style={{ fontSize: 20 }}/> 
                                }
                            </View>
                        </TouchableOpacity>
                    )
                }
            }
            return (
                // <RadioButton
                //     key={Identify.makeid()}
                //     value={item.id}
                //     iconStyle={{
                //         marginRight: Identify.isRtl() ? 0 : 16,
                //         marginLeft: Identify.isRtl() ? 16 : 0
                //     }}>
                //     {this.renderLableItem(item.label, prices, {})}
                // </RadioButton>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => [this.setState({ label: this.props.data.label + ': ' + item.label, selected: item.label, modalVisible: false }), this.updateCheck(index, item) ]}>
                    <View style={{ width: width*0.9, height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: Identify.theme.line_color }}>
                        <Text >{Identify.__(item.label)}</Text>
                        {item.label == this.state.selected ?
                            <Icon type='MaterialIcons' name='radio-button-on' style={{color: Identify.theme.button_background, fontSize: 20}} /> 
                            : <Icon type='Ionicons' name='radio-button-off' style={{ fontSize: 20 }}/> 
                        }
                    </View>
                </TouchableOpacity>
            )
        })
        return items;
    };

    render() {
        let { data } = this.props;
        let items = null;
        items = this.renderOptions(data);
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => this.setState({modalVisible: !this.state.modalVisible})}
                    style={{ width: 250, borderRadius: 10, borderWidth: 0.8, borderColor: this.state.selected ? Identify.theme.button_background : '#333333', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', marginHorizontal: 15, marginTop: 10, alignItems: 'center', paddingVertical: 8 }}>
                    <Text style={{color: '#595656', fontSize: 14}}>{Identify.__(this.state.label)}</Text>
                    {Identify.isRtl() ? (<Icon name='ios-chevron-back' type='Ionicons' style={{ color: Identify.theme.icon_color, fontSize: 14 }}/>): 
                    (<Icon name='ios-chevron-forward' type='Ionicons' style={{ color: Identify.theme.icon_color, fontSize: 14 }}/>)}
                </TouchableOpacity>
                <Modal 
                    visible={this.state.modalVisible}
                    animationType='slide'
                    transparent={true}>
                        {this.showModal()}
                </Modal>
                {/* <RadioGroup style={{ marginLeft: 10 }}
                    color='#039BE5'
                    thickness={2}
                    selectedIndex={this.defaultIndex}
                    onSelect={(index, val) => { this.updateCheck(index, val) }}
                    name="radioOptions">
                    {items}
                </RadioGroup> */}
            </View>

        );
    }
}

export default Options;
