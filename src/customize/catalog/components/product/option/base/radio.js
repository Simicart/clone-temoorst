import React from 'react';
import { TouchableOpacity, Modal, Dimensions } from 'react-native'
import Abstract from "./Abstract";
import { View, Text, Icon } from 'native-base';
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button';
import Identify from "@helper/Identify";

const {width} = Dimensions.get('window')

class RadioField extends Abstract {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            label: props.data.title,
            labelSelected: null,
            modalVisible: false
        };
        this.showTier = false;
        if(this.props.parent.getProductType() === 'bundle') this.dataLength = Object.keys(props.data.selections).length;
    }

    getValues() {
        return this.state.selected;
    }

    onSelect = (index, value) => {
        this.state.selected = index;
        this.parent.updatePrices();
    };

    showModal(items){
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
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{Identify.__(this.props.data.title)}</Text>
                            <TouchableOpacity onPress={() => this.setState({modalVisible: false})}>
                                <Icon name='close' type='AntDesign' style= {{ color: Identify.theme.icon_color, fontSize: 24 }} />
                            </TouchableOpacity>
                        </View>
                        {items}
                    </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    renderWithBundle = (data) => {
        let options = data.selections;
        let values = data.values;
        let items = [];
        for (let i in options) {
            let item = options[i];

            let selected = false;
            if (values && values.indexOf(i.toString()) >= 0) {
                selected = true;
            }
            let price = 0;
            if (item.price) {
                price = item.price;
            }
            if (item.priceInclTax) {
                price = item.priceInclTax;
            }
            // if (Identify.magentoPlatform() === 2) {
            //     price = item.prices.finalPrice.amount;
            // }
            if (item.tierPrice && item.tierPrice.length > 0) {
                this.showTier = true;
            }
            let app_tier_prices = null;
            if (item.app_tier_prices && item.app_tier_prices.length > 0) {
                app_tier_prices = item.app_tier_prices[0];
            }
            let label = this.parent.renderLabelOption(item.name, price, item.qty, app_tier_prices);
            let element = (
                // <RadioButton
                //     key={Identify.makeid()}
                //     value={i}
                //     color='#039BE5'>
                //     {label}
                // </RadioButton>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => [this.setState({ label: item.name, labelSelected: item.name, modalVisible: false }), this.onSelect(i, item) ]}>
                    <View style={{ width: width*0.9, height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: Identify.theme.line_color }}>
                        <Text >{Identify.__(item.name)}</Text>
                        {item.name == this.state.labelSelected ?
                            <Icon type='MaterialIcons' name='radio-button-on' style={{color: Identify.theme.button_background, fontSize: 20}} /> 
                            : <Icon type='Ionicons' name='radio-button-off' style={{ fontSize: 20 }}/> 
                        }
                    </View>
                </TouchableOpacity>
            );
            items.push(element);
        }
        return items;
    };

    renderWithCustom = (data) => {
        let values = data.values;
        let items = values.map(item => {
            let prices = 0;
            if (item.price) {
                prices = item.price;
            } else if (item.price_including_tax) {
                prices = item.price_including_tax.price;
            }
            return (
                <RadioButton
                    key={Identify.makeid()}
                    value={item.id}
                    color='#039BE5'>
                    {this.renderLableItem(item.title, prices)}
                </RadioButton>
            )
        })
        return items;
    };

    render = () => {
        let { data } = this.props;
        let type_id = this.props.parent.getProductType();
        let items = null;
        if (type_id === 'bundle') {
            items = this.renderWithBundle(data);
        }
        else {
            items = this.renderWithCustom(data);
        }
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => this.setState({modalVisible: !this.state.modalVisible})}
                    style={{ width: 250, borderRadius: 10, borderWidth: 0.8, borderColor: this.state.labelSelected ? Identify.theme.button_background : '#333333', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', marginHorizontal: 15, marginTop: 10, alignItems: 'center', paddingVertical: 8 }}>
                    <Text style={{color: '#595656', fontSize: 14}}>{Identify.__(this.state.label)}</Text>
                    {Identify.isRtl() ? (<Icon name='ios-chevron-back' type='Ionicons' style={{ color: Identify.theme.icon_color, fontSize: 14 }}/>): 
                    (<Icon name='ios-chevron-forward' type='Ionicons' style={{ color: Identify.theme.icon_color, fontSize: 14 }}/>)}
                </TouchableOpacity>
                <Modal 
                    visible={this.state.modalVisible}
                    animationType='slide'
                    transparent={true}>
                        {this.showModal(items)}
                </Modal>
                {/* <RadioGroup style={{ marginLeft: 10, marginRight: 10 }}
                    color='#039BE5'
                    thickness={2}
                    ref={(radio) => this.Radio = radio}
                    onSelect={(index, value) => this.onSelect(index, value)}>
                    {items}
                </RadioGroup> */}
            </View>

        );
    }
}
RadioField.defaultProps = {
    type: 1
};
export default RadioField;
