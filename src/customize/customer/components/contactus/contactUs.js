import React from 'react';
import {connect} from 'react-redux';
import { View, Dimensions } from 'react-native';
import Identify from '@helper/Identify';
import ContactUsItem from './contactUsItem';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.merchant_configs = Identify.isEmpty(this.props.data.merchant_configs) ? null : this.props.data.merchant_configs;
        this.email = this.merchant_configs.storeview.contactus.listEmail['1600319182_0'].contact_email;
        this.hotline = this.merchant_configs.storeview.contactus.listHotline['1600319182_0'].contact_hotline;
        this.sms = this.merchant_configs.storeview.contactus.listSms['1600319182_0'].contact_sms;
        this.website = this.merchant_configs.storeview.contactus.listWebsite['1600319182_0'].contact_website;
    }
    
    render(){
        return(
            <View style={{ width: width, height: height, marginTop: 20}}>
                <ContactUsItem type='email' data={this.email} icon_type='MaterialCommunityIcons' icon_name='email-outline' />
                <ContactUsItem type='phone' data={this.hotline} icon_type='AntDesign' icon_name='phone' />
                <ContactUsItem type='sms' data={this.sms} icon_type='FontAwesome5' icon_name='sms' />
                <ContactUsItem type='web' data={this.website} icon_type='MaterialCommunityIcons' icon_name='web' />
            </View>
        )
    }
}

// class Language extends React.Component {
//   constructor(props) {
//     super(props);
//     this.simicart_config = Identify.isEmpty(this.props.data.dashboard_configs) ? null : this.props.data.dashboard_configs;
//     this.merchant_configs = Identify.isEmpty(this.props.data.merchant_configs) ? null : this.props.data.merchant_configs;
//     this.text = this.props.text;
//     this.style = this.props.style ?  this.props.style : {};
//   }
//   render(){
//     let config = null;
//     if (this.simicart_config !== null) {
//         config = this.simicart_config['app-configs'][0] || null;
//     }
//     if ((config !== null && config.language) && (this.merchant_configs && this.merchant_configs.storeview.hasOwnProperty('base')
//             && this.merchant_configs.storeview.base.hasOwnProperty('locale_identifier'))) {
//         let languageCode = this.merchant_configs.storeview.base.locale_identifier;
//         if (config.language.hasOwnProperty(languageCode)) {
//             let language = config.language;
//             let laguageWithCode = language[languageCode];
//             if (laguageWithCode && laguageWithCode.hasOwnProperty(this.text)) {
//                 return (
//                   <Text style={this.style}>{laguageWithCode[this.text].toUpperCase()}</Text>
//                 )
//             }
//         }
//     }
//     return (
//       <Text style={this.style}>{this.text}</Text>
//     );
//   }
// }
const mapStateToProps = (state) => {
    return {data: state.redux_data};
}
export default connect(mapStateToProps)(ContactUs);
