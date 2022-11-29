import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import SimiForm from '@base/components/form/SimiForm';
import FloatingInput from '@base/components/form/FloatingInput';
import PickerInput from '@customize/form//PickerInput';
import DateInput from '@customize/form/DateInput';
import Identify from '@helper/Identify';
import CountryStateField from '@screens/customer/components/address/countrystate';
// import CountryStateField from './countrystate';
import BorderedInput from '@customize/form/BorderedInput';
export default class AddressForm extends SimiComponent {

    constructor(props) {
        super(props);
        this.initData = {};
        let json = Identify.getMerchantConfig();
        this.address_option = json.storeview.customer.address_option;
        this.account_option = json.storeview.customer.account_option;
        this.gender_value = json.storeview.customer.address_option.gender_value;
        this.mode = this.props.navigation.getParam('mode');
        this.address = {};
        this.state = {};
        if (Object.keys(this.address).length > 0) {
            this.initData['entity_id'] = this.address.entity_id;
        }
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

    updateButtonStatus(status) {
        this.props.parent.updateButtonStatus(status);
    }

    createFields() {
        let fields = [];

        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'prefix', Identify.__('Prefix'), null, this.address_option.prefix_show, 'req', true, Identify.__('Prefix'))
        );
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'firstname', Identify.__('First Name'), null, '', 'req', true, Identify.__('First Name'))
        );
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'lastname', Identify.__('Last Name'), null, '', 'req', true, Identify.__('Last Name'))
        );
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'suffix', Identify.__('Suffix'), null, this.address_option.suffix_show, 'req', true, Identify.__('Suffix'))
        );
        if (this.mode.includes('checkout') && !this.mode.includes('exist_customer') && !this.mode.includes('new_customer_edit_shipping')) {
            fields.push(
                this.createInput(inputKey = 'email', inputTitle = 'email', Identify.__('Email'), null, '', 'req', true, Identify.__('Email'))
            );
        }
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'company', Identify.__('Company'), null, this.address_option.company_show, 'req', true, Identify.__('Company'))
        );
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'street', Identify.__('Street'), null, this.address_option.street_show, 'req', true, Identify.__('Street'))
        );
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'vat_id', Identify.__('VAT Number'), null, this.address_option.taxvat_show, 'req', true, Identify.__('VAT Number'))
        );
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'city', Identify.__('City'), null, this.address_option.city_show, 'req', true, Identify.__('City'))
        );
        if (this.address_option.country_id_show !== "" || this.address_option.region_id_show !== "") {
            fields.push(<CountryStateField key={'country_state'} inputKey={'country_state'} parent={this} address={this.address} required={false} address_option={this.address_option} />);
        }
        // fields.push(
        //     this.renderField('select', 'country_id', Identify.__('Country'), this.address_option.country_id_show || "req", this.allowed_countries, 'country_name', 'country_code')
        // );
        // if (this.allowed_states.length > 0) {
        //     fields.push(
        //         this.renderField('select', 'region_id', Identify.__('State'), "req", this.allowed_states, 'state_name', 'state_id')
        //     );
        // } else {
        //     fields.push(
        //         this.renderField('text', 'region', Identify.__('State'), "opt")
        //     );
        // }
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'postcode', Identify.__('Post/Zip Code'), null, this.address_option.zipcode_show, 'req', true, Identify.__('Post/Zip Code'))
        );
        fields.push(
            this.createInput(inputKey = 'phone', inputTitle = 'telephone', Identify.__('Phone'), null, this.address_option.telephone_show, 'req', true, Identify.__('Phone'))
        );
        fields.push(
            this.createInput(inputKey = 'text', inputTitle = 'fax', Identify.__('Fax'), null, this.address_option.fax_show, 'req', true, Identify.__('Fax'))
        );

        if (this.mode.includes('checkout')) {
            fields.push(
                this.renderField('datetime', 'dob', Identify.__('Date of Birth'), null, this.address_option.dob_show)
            );
            for (let index in this.gender_value) {
                let values = this.gender_value[index];
                values.strString = values.label;
            }
            fields.push(
                this.createInput(inputKey = 'select', inputTitle = 'gender', Identify.__('Gender'), null, this.address_option.gender_show, this.gender_value, 'label', 'value', true, Identify.__('Gender'))
            );
            fields.push(
                this.createInput(inputKey = 'text', inputTitle = 'tax', Identify.__('Tax/VAT number'), null, this.account_option.taxvat_show == '1' ? 'opt' : '', 'req', true, Identify.__('Tax/VAT number'))
            );
            if (this.mode.includes('new_customer_add_new') || this.mode.includes('new_customer_edit_billing')) {
                fields.push(
                    this.createInput(inputKey = 'password', inputTitle = 'customer_password', Identify.__('Password'), null, '', "req", true, Identify.__('Password'))
                );
                fields.push(
                    this.createInput(inputKey = 'password', inputTitle = 'confirm_password', Identify.__('Confirm Password'), null, '', "req", true, Identify.__('Confirm Password'))
                );
            }
        }

        fields = fields.filter(function (element) {
            return element !== undefined;
        });

        if (this.address_option.hasOwnProperty('custom_fields')) {
            this.addCustomFields(fields);
        }

        return fields;
    }

    createInput(inputKey, inputTitle, inputType, iconName, inputValue, required, needWarning, header) {
        return (
            <BorderedInput
                inputKey={inputKey}
                inputTitle={inputTitle}
                inputType={inputType}
                iconName={iconName}
                inputValue={inputValue}
                required={required}
                needWarning={needWarning}
                extraIcon={undefined}
                header={header} />
        );
    }

    addCustomFields(fields) {
        this.address_option.custom_fields.forEach(element => {
            if (element.type == 'single_option') {
                fields.splice(parseInt(element.position) - 1, 0,
                    this.renderField('select', element.code, Identify.__(element.title), element.required, element.option_array, 'label', 'value')
                );
            } else {
                fields.splice(parseInt(element.position) - 1, 0,
                    this.renderField('text', element.code, Identify.__(element.title), element.required)
                );
            }
        });
    }

    renderField = (inputType = 'text', inputKey, inputTitle, show = 'req', pickerData = [], pickerKeyDisplay = '', pickerKeySave = '') => {
        if (show !== "") {
            let required = false;
            if (show === 'req') {
                required = true;
            }

            let inputValue = undefined;
            if (this.address.hasOwnProperty(inputKey)) {
                inputValue = this.address[inputKey];
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
                default:
                    return (
                        <FloatingInput
                            key={inputKey}
                            inputType={inputType}
                            inputKey={inputKey}
                            inputValue={inputValue}
                            inputTitle={inputTitle}
                            required={required}
                            parent={this} />
                    );
            }
        }
    };

    renderPhoneLayout() {
        this.address = this.props.parent.state.address;
        return (
            <SimiForm fields={this.createFields()}
                parent={this}
                onRef={ref => (this.form = ref)}
                initData={this.initData} />
        );
    }

    getAddressData() {
        return this.form.getFormData();
    }
}