import React, { Children } from 'react';
import SimiComponent from '@base/components/SimiComponent';
import SimiForm from '@base/components/form/SimiForm';
import FloatingInput from '../../../form/FloatingInput';
import PickerInput from '@base/components/form/PickerInput';
import DateInput from '@base/components/form/DateInput';
import DropDownInput from '@base/components/form/DropDownInput';
import CheckboxInput from '@base/components/form/CheckBoxInput'
import Identify from '@helper/Identify';
import { ScrollView, TouchableOpacity, View, Text, Modal, Keyboard, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Icon, Left, Button } from 'native-base';
import { Platform, NativeModules, LayoutAnimation } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const height = Dimensions.get('window').height;
const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class CustomerForm extends SimiComponent {

    constructor(props) {
        super(props);
        this.isEditProfile = this.props.navigation.getParam('isEditProfile');
        this.data = this.props.parent.props.data;
        this.initData = {};
        let json = Identify.getMerchantConfig();
        this.address_option = json.storeview.customer.address_option;
        this.account_option = json.storeview.customer.account_option;
        this.gender_value = json.storeview.customer.address_option.gender_value;
        this.social_login = false;
        if (this.data && this.data.social_login === true) {
            this.social_login = true;
        }
        this.modalHeight = 470;
        this.state = {
            buttonColor: Identify.theme.app_background,
            modalVisible: false,
            modalHeight: 470,
        }
    }

    setModalHeight = (value) => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
              200,
              'linear', 
              'opacity',
            ),
          );
        this.setState({modalHeight: value})
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }
    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined)
        }
    }

    setModalVisible(value) {
        this.setState({
            modalVisible: value
        })
    }
    updateButtonStatus(status) {
        this.props.parent.updateButtonStatus(status);
    }

    signUpPassword(fields) {
        if (!this.social_login) {
            fields.push(
                this.renderField('password', 'password', Identify.__('Password'), 'req')
            );
            fields.push(
                this.renderField('password', 'com_password', Identify.__('Confirm Password'), 'req')
            );
        }
    }

    changePasswordFields() {
        let changePassField = [];
        if (!this.social_login) {
            let labelPassword = Identify.__('Password');
            changePassField.push(
                this.renderField('password', 'password', Identify.__('Current Password'), 'opt')
            );
            changePassField.push(
                this.renderField('password', 'new_password', Identify.__('New Password'), 'opt')
            );
            changePassField.push(
                this.renderField('password', 'com_password', Identify.__('Confirm Password'), 'opt')
            );
        }
        return changePassField;
    }

    createFields() {
        let fields = [];

        if (this.isEditProfile) {
            fields.push(
                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Icon type='FontAwesome' name='user-circle-o' style={{ color: Identify.theme.top_menu_icon_color, fontSize: 80 }} ></Icon>
                </View>
            )
        }
        if (!this.isEditProfile && !this.social_login) {
            if (Platform.OS === 'ios') fields.push(
                <View style={{ paddingTop: 15, paddingBottom: 15, marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left' }}>{Identify.__('Create account')}</Text>
                </View>
            )
        }
        fields.push(
            this.renderField('text', 'prefix', Identify.__('Prefix'), this.address_option.prefix_show)
        );
        fields.push(
            this.renderField('text', 'firstname', Identify.__('First Name'), 'req')
        );
        fields.push(
            this.renderField('text', 'lastname', Identify.__('Last Name'), 'req')
        );
        fields.push(
            this.renderField('text', 'suffix', Identify.__('Suffix'), this.address_option.suffix_show)
        );
        fields.push(
            this.renderField('email', 'email', Identify.__('Email'), 'req')
        );
        fields.push(
            this.renderField('datetime', 'dob', Identify.__('Date of Birth'), this.address_option.dob_show)
        );
        let genderValues = this.address_option.gender_value;
        for (let index in genderValues) {
            let values = genderValues[index];
            values.strString = values.label;
        }
        fields.push(
            this.renderField('dropdown', 'gender', Identify.__('Gender'), this.address_option.gender_show, genderValues, 'label', 'value')
        );
        fields.push(
            this.renderField('text', 'taxvat', Identify.__('Tax/VAT number'), this.address_option.taxvat_show)
        );
        if (this.isEditProfile) {
            fields.push(
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 15, paddingBottom: 15,
                        marginBottom: 10,
                        borderTopWidth: 0.5,
                        borderTopColor: Identify.theme.line_color,
                        backgroundColor: this.state.buttonColor
                    }}
                    onPressIn={() => this.setState({ buttonColor: Identify.theme.button_background })}
                    onPressOut={() => this.setState({ buttonColor: Identify.theme.app_background })}
                    onPress={() => [this.setModalHeight(470) ,this.setModalVisible(true)]}>
                    <Text style={{ fontSize: 16, marginHorizontal: 3 }}>{Identify.__('Change Password')}</Text>
                    <Icon type='Feather' name={Identify.isRtl() ? 'chevron-left' : 'chevron-right'} stype={{ color: Identify.theme.icon_color }}></Icon>
                </TouchableOpacity>
            )
        }
        if (!this.isEditProfile) {
            this.signUpPassword(fields);
        }

        else if (this.isEditProfile) {
            fields.push(
                <Modal
                    visible={this.state.modalVisible}
                    animationType='slide'
                    transparent={true}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', }}>
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
                        activeOpacity={1}
                        onPress={() => this.setModalVisible(false)}>

                        {/* <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={{ height: 0.6 * height, width: '100%', backgroundColor: Identify.theme.app_background, borderRadius: 15, paddingHorizontal: 15 }}
                        > */}
                        <View
                            style={{ height: this.state.modalHeight, width: '100%', backgroundColor: Identify.theme.app_background, borderRadius: 15, paddingHorizontal: 15 }}
                            activeOpacity={1}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 15,
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: Identify.theme.line_color,
                                }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{Identify.__('Change Password')}</Text>
                                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                                    <Icon name='close' type='AntDesign' style={{ color: Identify.theme.icon_color, fontSize: 24 }} />
                                </TouchableOpacity>
                            </View>
                            <KeyboardAwareScrollView
                                style={{ flex: 1 }}
                                // enableResetScrollToCoords={true}
                                enableAutomaticScroll={false}
                                keyboardOpeningTime={0.5}
                                keyboardShouldPersistTaps='never'
                                keyboardDismissMode="interactive"
                                // extraScrollHeight={20}
                            // behavior={Platform.OS === "ios" ? "padding" : "height"}
                            // style={{ flex: 1 }}
                            >
                                <SimiForm
                                    fields={this.changePasswordFields()}
                                    parent={this}
                                    onRef={ref => (this.formNew = ref)}
                                    initData={this.initData}
                                    style={{ marginBottom: 20 }} />
                                <Button style={{ width: '100%', marginTop: 16, borderRadius: 10, padding: 8 }}
                                    full
                                    onPress={() => { this.onClickButton() }}>
                                    <Text style={{ fontSize: 15, lineHeight: 24, color: '#FFF' }}>{Identify.__('Save')}</Text>
                                </Button>
                            </KeyboardAwareScrollView>

                        </View>

                        {/* </KeyboardAvoidingView> */}
                    </TouchableOpacity>
                </Modal>
            )
        }

        if (this.account_option.show_newsletter === '1') {
            if (!this.isEditProfile) {
                fields.push(
                    this.renderField('checkbox', 'news_letter', Identify.__('Sign Up for Newsletter'), 'opt')
                );
            }
        }

        fields = fields.filter(function (element) {
            return element !== undefined;
        });

        return fields;
    }

    renderField = (inputType = 'text', inputKey, inputTitle, show = 'req', pickerData = [], pickerKeyDisplay = '', pickerKeySave = '') => {
        if (show !== "") {
            let required = false;
            if (show === 'req') {
                required = true;
            }

            let inputValue = undefined;
            if (this.data) {
                inputValue = this.data[inputKey];
                this.initData[inputKey] = inputValue;
            }

            switch (inputType) {
                case 'select':
                    return (
                        <PickerInput
                            key={inputKey}
                            inputType={inputType}
                            inputKey={inputKey}
                            inputValue={inputValue}
                            inputTitle={inputTitle}
                            required={required}
                            parent={this}
                            keyForDisplay={pickerKeyDisplay}
                            keyForSave={pickerKeySave}
                            dataSource={pickerData}
                        />
                    );
                case 'dropdown':
                    return (
                        <DropDownInput
                            key={inputKey}
                            inputType={inputType}
                            inputKey={inputKey}
                            inputValue={inputValue}
                            inputTitle={inputTitle}
                            required={required}
                            parent={this}
                            keyForDisplay={pickerKeyDisplay}
                            keyForSave={pickerKeySave}
                            dataSource={pickerData}
                        />
                    );
                case 'datetime':
                    return (
                        <DateInput key={inputKey}
                            inputType={inputType}
                            inputKey={inputKey}
                            inputValue={inputValue}
                            inputTitle={inputTitle}
                            required={required}
                            parent={this} />
                    );
                case 'checkbox':
                    return (
                        <CheckboxInput
                            key={inputKey}
                            inputType={inputType}
                            inputKey={inputKey}
                            inputValue={inputValue}
                            inputTitle={inputTitle}
                            required={required}
                            parent={this}
                        />
                    )
                default:
                    return (
                        <FloatingInput
                            key={inputKey}
                            inputType={inputType}
                            inputKey={inputKey}
                            inputValue={inputValue}
                            inputTitle={inputTitle}
                            required={required}
                            modalHeight={this.modalHeight}
                            setModalHeight={this.setModalHeight}
                            parent={this}
                            disabled={this.isEditProfile && inputKey === 'email' ? true : false} />
                    );
            }
        }
    };

    onClickButton() {
        this.props.parent.editProfileWithData(this.formNew.getFormData());
    }

    renderPhoneLayout() {
        return (

                <SimiForm fields={this.createFields()}
                    parent={this}
                    onRef={ref => (this.form = ref)}
                    initData={this.initData} />
        );
    }

    getCustomerData() {
        return this.form.getFormData();
    }
}