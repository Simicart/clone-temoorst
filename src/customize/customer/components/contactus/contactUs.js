import React from 'react';
import {connect} from 'react-redux';
import { View, Dimensions, Text } from 'react-native';
import Identify from '@helper/Identify';
import ContactUsItem from './contactUsItem';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.listContactUs = [];
        this.merchant_configs = Identify.isEmpty(this.props.data.merchant_configs) ? null : this.props.data.merchant_configs;
        this.listEmail = Object.values(this.merchant_configs.storeview.contactus.listEmail);
        this.listHotline = Object.values(this.merchant_configs.storeview.contactus.listHotline);
        this.listSms = Object.values(this.merchant_configs.storeview.contactus.listSms);
        this.listWebsite = Object.values(this.merchant_configs.storeview.contactus.listWebsite);
        
        this.listEmail?.forEach(item => {
            this.listContactUs.push({type: 'email', data: item.contact_email})
        });
        this.listHotline?.forEach(item => {
            this.listContactUs.push({type: 'phone', data: item.contact_hotline})
        });
        this.listSms?.forEach(item => {
            this.listContactUs.push({type: 'sms', data: item.contact_sms})
        });
        this.listWebsite?.forEach(item => {
            this.listContactUs.push({type: 'web', data: item.contact_website})
        });
    }

    renderItem(item) {
        let icon_type, icon_name;
        switch(item.type){
            case 'email': 
                icon_type = 'MaterialCommunityIcons'
                icon_name = 'email-outline'
                break;
            case 'phone': 
                icon_type = 'AntDesign'
                icon_name = 'phone'
                break;
            case 'sms': 
                icon_type = 'FontAwesome5'
                icon_name = 'sms'
                break;
            case 'web': 
                icon_type = 'MaterialCommunityIcons'
                icon_name = 'web'
                break;
        }
        return(
            <ContactUsItem type={item.type} data={item.data} icon_type={icon_type} icon_name={icon_name} />
        )
    }
    
    render(){
        if(this.listContactUs.length > 0){
            return(
                <View style={{ width: width, height: height, marginTop: 20}}>
                    <ScrollView style={{ flex: 1 }}>
                        {
                            this.listContactUs.map((item, index)=> (
                                <View key={index}>
                                    {this.renderItem(item)}
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            )
        }else{
            return null;
        }
    }
}
const mapStateToProps = (state) => {
    return {data: state.redux_data};
}
export default connect(mapStateToProps)(ContactUs);
