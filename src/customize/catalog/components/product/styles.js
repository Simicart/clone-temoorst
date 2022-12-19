import { StyleSheet, Dimensions } from "react-native";
import material from '@theme/variables/material';
import Identify from '@helper/Identify'

const width = Dimensions.get('window').width;

export default StyleSheet.create({
    bannerCard: {
        flex: 1,
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 0,
        overflow: 'hidden'
    },
    bannerImage: {
        flex: 1,
        borderRadius: 10, 
        marginBottom: 20,
        marginTop: 20
    },
    outOfStock: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        fontWeight: "bold"
    },
    card: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        flex: 1,
        textAlign: 'left'
    },
    extendIcon: {
        marginLeft: 5,
        fontSize: 20,
        color: '#c9c9c9'
    },
    contentDescription: {
        fontSize: material.textSizeSmall,
        flex: 1,
        textAlign: 'left'
    },
    price: {
        fontSize: 1,
        fontWeight: '100'
    },
    addToCart: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    scroll: {
        paddingBottom: 60
    },
})
