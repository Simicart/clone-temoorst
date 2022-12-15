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
                <Content>
                    <View style={{ flex: 1, paddingBottom: 60 }}>
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