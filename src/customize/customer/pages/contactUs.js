import React from 'react';
import { connect } from 'react-redux';
import SimiPageComponent from '@base/components/SimiPageComponent';
import { View, Image, Dimensions} from 'react-native';
import { Container, Content } from 'native-base';
import NewConnection from '@base/network/NewConnection';
import { order_history, quoteitems } from '@helper/constants';
import variable from '@theme/variables/material';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class ContactUs extends SimiPageComponent {

    renderPhoneLayout() {
        return (
            <Container style={{ backgroundColor: variable.appBackground }}>
                <View style={{ width: width*0.4, height: width*0.3, alignSelf: 'center', justifyContent: 'center' }}>
                    <Image style={{height: 60, width: 200, resizeMode: 'contain', alignSelf: 'center' }} source={require('@media/logo.png')}/>
                </View>
                <Content>
                    <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingBottom: 60 }}>
                        {this.renderLayoutFromConfig('contactus_layout', 'content')}
                    </View>
                </Content>
                {this.renderLayoutFromConfig('contactus_layout', 'container')}
            </Container>
        );
    }
}

//Save to redux.
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(null, mapDispatchToProps)(ContactUs);