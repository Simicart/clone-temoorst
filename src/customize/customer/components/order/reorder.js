import React from 'react';
import SimiComponent from '@base/components/SimiComponent';
import { Button, Text, View } from 'native-base';
import Identify from '@helper/Identify';

    const ReorderButton = (props) => {

    function onClickReOrder() {
         props.parent.onReorder();
    }

        if (Identify.getMerchantConfig().storeview.sales.sales_reorder_allow == '1') {
            return (
                <View style={{ 
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    height: 90,
                    borderWidth: 0.3, 
                    borderColor: 'gray',
                    borderRadius: 10, 
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5 }}>
                    <Button style={{ flex: 1, margin: 20, marginBottom: 30, borderRadius: 10 }}
                        full
                        onPress={() => {  onClickReOrder() }}>
                        <Text> {Identify.__('Reorder')} </Text>
                    </Button>
                </View>
            );
        } else {
            return (null);
        }
}

export default ReorderButton;