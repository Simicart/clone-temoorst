import React from 'react';
import BaseInput from './BaseInput';
import { LayoutAnimation } from 'react-native';
import { Item, Input, Label, Icon, View, Text } from 'native-base';
import Identify from '@helper/Identify';
import material from '@theme/variables/material';
import styles from './styles';

export default class FloatingInput extends BaseInput {

    constructor(props) {
        super(props);
        this.isSubmit = false;
        this.height = null;
    }
   
    addWarningIcon = () => {
        if (this.state.success === true) {
            return (<Icon style={{ fontSize: 22, marginLeft: Identify.isRtl() ? 10 : 0}} name={'ios-checkmark-circle'} />)
        } else if (this.state.error === true) {
            return (<Icon style={{ fontSize: 22, marginLeft: Identify.isRtl() ? 10 : 0}} name={'ios-close-circle'} />)
        }
        return null;
    }

    onInputValueChange(text) {
        if (text == ''){
            text = null;
        }
        this.state.value = text;
        let validateResult = this.validateInputValue(text);
        if (this.props.required === true || this.inputType === 'password' || this.inputType === 'email') {
            if (validateResult === true) {
                this.setState({ success: true, error: false });
            } else {
                this.setState({ success: false, error: true });
            }
        } else {
            this.setState({ success: true, error: false });
        }
        this.parent.updateFormData(this.inputKey, text, validateResult);
    }

    renderExtraIcon() {
        return (
            <View style={{ justifyContent: 'flex-end', alignItems: 'baseline', paddingLeft: 3, paddingRight: 3 }}>
                {this.props.extraIcon}
            </View>
        )
    }

    createInputLayout() {
        console.log(this.height);
        return (
            <View style={{ flexDirection: 'column', marginBottom: 10, paddingBottom: 10 }}>
                <Text style={{ alignSelf: 'flex-start' , marginStart: 3, paddingBottom: 8 }}>
                    {Identify.__(this.inputTitle)}
                    <Text style={{ color: 'red'}}> * </Text>
                </Text>
                <View style={styles.border}>
                    <Item error={this.state.error}
                        success={this.state.success}
                        disabled={this.disabled}
                        style={{ flexGrow: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center',  }}>
                        <Input
                            ref={(input) => { this.props.parent.listRefs[this.inputKey] = input }}
                            onSubmitEditing={() => { [this.submitEditing(), this.isSubmit = true] }}
                            returnKeyType={"done"}
                            disabled={this.disabled}
                            keyboardType={this.keyboardType}
                            textContentType={this.inputType === 'password' ? 'oneTimeCode' : 'none'}
                            defaultValue={this.state.value}
                            placeholder={'Please enter your ' + this.inputTitle.toLowerCase()}
                            clearButtonMode={'while-editing'}
                            secureTextEntry={this.inputType === 'password' ? true : false}
                            onChangeText={(text) => {
                                this.onInputValueChange(text);
                            }}
                            onFocus={() => {
                                if(this.props.inputKey == 'new_password') {
                                    this.props.setModalHeight(530)
                                }
                                else if(this.props.inputKey == 'com_password') {
                                    this.props.setModalHeight(630)
                                }
                                else {
                                    this.props.setModalHeight(470)
                                }
                            }}
                            onBlur={() => {
                                if((this.props.inputKey == 'new_password' && !this.isSubmit) || this.props.inputKey == 'com_password') {
                                    this.props.setModalHeight(470)
                                }
                                if(this.props.inputKey == 'new_password') this.isSubmit = false;
                            }}
                            style={[
                                this.disabled ? { color: 'gray', 
                                textAlign: Identify.isRtl() ? 'right' : 'left' } : { textAlign: Identify.isRtl() ? 'right' : 'left' }, 
                                {width: '100%'}]}
                            autoCapitalize='none'
                        />
                        {this.addWarningIcon()}
                    </Item>
                </View>
                {this.props.hasOwnProperty('extraIcon') && this.renderExtraIcon()}
            </View>
        );
    }

}