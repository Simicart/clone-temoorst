import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Container, View, Icon, Input, List, Text } from 'native-base';
import Identify from '@helper/Identify';
import styles from '../../pages/search/styles';
import variable from '@theme/variables/material';
import md5 from 'md5';
import SimiPageComponent from "@base/components/SimiPageComponent";
import Events from '@helper/config/events';
import NavigationManager from "@helper/NavigationManager";
import AppStorage from '@helper/storage';
import { debounce } from 'lodash';
export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            showClear: false
        }
    }
    debounceSearch = debounce(text => this.props.parent.openSearchResults(text), 1000);
    onChangeText(txt) {
        this.props.parent.onChangeSearch(txt)
        this.state.text = txt;
        this.textInput.setNativeProps({ text: txt })
        if (this.state.showClear && this.state.text.length == 0) {
            this.setState({ showClear: false });
        } else if (!this.state.showClear && this.state.text.length > 0) {
            this.setState({ showClear: true });
        }
        if (this.state.text.length > 2) {
            this.debounceSearch(this.state.text);
            this.props.parent.onRecentVisiable(false);
        } else {
            this.props.parent.onRecentVisiable(true);
        }
    }
    componentDidUpdate() {
        console.log("this: ", this);
        if (this.props.parent.state.search && this.props.parent.state.search !== this.state.text) {
            this.textInput.setNativeProps({ text: this.props.parent.state.search })
            this.setState({ text: this.props.parent.state.search });
            if (this.props.parent.state.search.length > 2) {
                this.debounceSearch(this.props.parent.state.search);
                this.props.parent.onRecentVisiable(false);
            }
        }
    }
    onEndEditing() {
        this.props.parent.openSearchResults(this.state.text);
    }

    render() {
        let voiceSearch = this.dispatchAddItem();
        return (
            <View style={[styles.container, { backgroundColor: variable.getsearchbackgroundcColor }]}>
                <View regular style={[styles.search, { backgroundColor: variable.getsearchbackgroundcColor }]}>
                    <Icon name='search' style={[styles.icon, { color: variable.toolbarDefaultBg == '#ffffff' ? variable.toolbarBtnColor : variable.toolbarDefaultBg }]} />
                    <View style={styles.inputContainer}>
                        <Input style={{ flex: 1, color: variable.searchtextColor }}
                            placeholderTextColor={variable.searchtextColor}
                            placeholder={Identify.__('What are you looking for?')}
                            autoFocus={true}
                            ref={input => { this.textInput = input }}
                            onChangeText={(txt) => {
                                this.onChangeText(txt)
                            }}
                            returnKeyType='search'
                            onSubmitEditing={() => { this.onEndEditing() }} />
                        {this.state.showClear && <Icon style={styles.clearIcon} name='md-close' onPress={() => {
                            this.textInput.setNativeProps({ text: '' })
                            this.setState({ text: '', showClear: false });
                            this.props.parent.onRecentVisiable(true);
                            this.props.parent.onChangeSearch('');
                        }} />}
                        {voiceSearch}
                    </View>
                </View>
            </View>
        );
    }

    dispatchAddItem() {
        let plugins = [];
        for (let i = 0; i < Events.events.search_page.length; i++) {
            let node = Events.events.search_page[i];
            if (node.active === true) {
                let key = md5("pages_search_items" + i);
                let Content = node.content;
                plugins.push(<View style={{ marginBottom: 10, marginTop: 10, alignItems: 'baseline' }} key={key}>
                    <Content obj={this} />
                </View>);
            }
        }
        return plugins;
    }
}