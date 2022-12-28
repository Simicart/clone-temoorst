import { StyleSheet } from "react-native"
import material from "@theme/variables/material";

export default StyleSheet.create({
  addToCart: {
    position: 'absolute',
    bottom: material.isIphoneX ? 15 : 0,
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  }
})
