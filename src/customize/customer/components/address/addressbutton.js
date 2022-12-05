import React from 'react';
import { Button, Text, Card } from 'native-base';
import Identify from '@helper/Identify';

export default class AddressButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonEnabled: Object.keys(this.props.parent.state.address).length == 0 ? false : true
        }
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined)
        }
    }

    onSaveAddress() {
        this.props.parent.editNewAddress();
    }

    updateButtonStatus(status) {
        if(status != this.state.buttonEnabled) {
            this.setState({ buttonEnabled: status });
        }
    }

    render() {
        return (
            <Card style={{ 
                justifyContent: 'center', 
                alignContent: 'center', 
                height: 90,
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
                    disabled={!this.state.buttonEnabled}
                    onPress={() => { this.onSaveAddress() }}>
                    <Text> {Identify.__('Save')} </Text>
                </Button>
            </Card>
        );
    }
}