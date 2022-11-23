import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import material from '@theme/variables/material';

export default StyleSheet.create({
    setShadowImage: {
        width: 150, 
        height: 150, 
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        justifyContent: 'space-around'
    }
})
