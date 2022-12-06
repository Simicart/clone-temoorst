import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import material from '@theme/variables/material';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
    setShadowImage: {
        width: width*0.4, 
        height: width*0.4, 
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.14,
    },
    image: {
        width: '100%', 
        height: '100%', 
        borderRadius: 15,
    },
    listCategories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginLeft: width*0.04,
        marginTop: 10,
    }
})
