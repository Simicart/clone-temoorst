import React from 'react';
import { Item, Input } from 'native-base';
import styles from './styles';
import {Icon} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Identify from '@helper/Identify';

class Quantity extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      checkoutQty: 1
    }
    this.checkoutQty = '1';
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  getCheckoutQty() {
    return this.state.checkoutQty.toString();
  }

  render() {
    return (
      <Item regular style={styles.container}>
        <TouchableOpacity 
          disabled={ this.state.checkoutQty === 1  ? true : false }
          // style={{ opacity: this.state.checkoutQty === 1 ? 0.5 : 1 }}
          onPress={() => this.setState({ checkoutQty: this.state.checkoutQty - 1 })}>
          <Icon name='minus' type='AntDesign' style={{ color: Identify.theme.button_background, opacity: this.state.checkoutQty === 1 ? 0.3 : 1 }}/>
        </TouchableOpacity>
        <Input
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={(txt) => {
            this.state.checkoutQty = parseInt(txt)
          }}>{this.state.checkoutQty}</Input>
        <TouchableOpacity onPress={() => this.setState({ checkoutQty: this.state.checkoutQty + 1 })}>
          <Icon name='plus' type='AntDesign' style={{ color: Identify.theme.button_background }}/>
        </TouchableOpacity>
      </Item>
    );
  }

}

export default Quantity;
