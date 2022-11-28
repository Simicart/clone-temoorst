import { View, Text, Modal } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
const ModalSearch = (props) => {
    console.log("props in ModalSearch: ", props);
    return (
        <Modal visible={props.modalVisible} style={{}} animationType="slide"
        >
            <Text>modal search</Text>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return { modalVisible: state.redux_data.modalVisible };
}
//Save to redux.
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSearch);