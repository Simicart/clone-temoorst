import React, { Component } from 'react'
import SearchList from '../../community/react-native-search-list/index';
import Identify from "@helper/Identify";
import { StatusBar } from 'react-native'
import { Text, View, Button } from 'native-base'
import variable from "@theme/variables/material";
import Item from './item';
import { FlatList } from 'react-native-gesture-handler';

export default class AdvanceList extends Component {
    constructor(props) {
        super(props);
    }


    formatData() {
        let formatted = [];
        let data = this.props.data;
        data.forEach(element => {
            if (element.searchStr) {
                let firstChar = element.searchStr.charAt(0).toUpperCase();
                let existed = false;
                if (formatted.length > 0) {
                    formatted.forEach(item => {
                        if (item.title == firstChar) {
                            existed = true;
                            item.data.push(element);
                            return;
                        }
                    });
                }
                if (!existed) {
                    formatted.push({
                        title: firstChar,
                        searchKey: Identify.makeid(),
                        data: [element]
                    });
                }
            }
        });
        formatted.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
            if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
            return 0;
        });
        return formatted;
    }

    // custom render row
    renderRow(item) {
        return (
            <Item parent={this.props.parent} item={item} />
        )
    }

    // render empty view when datasource is empty
    renderEmpty() {
        return (
            <View>
                <Text style={{ fontSize: variable.textSizeBigger, paddingTop: 20 }}> No Content </Text>
            </View>
        )
    }

    // render empty result view when search result is empty
    renderEmptyResult(searchStr) {
        return (
            <View>
                <Text style={{ fontSize: variable.textSizeBigger, paddingTop: 20 }}> No Result For <Text
                    style={{ fontSize: variable.textSizeBigger }}>{searchStr}</Text></Text>
                <Text style={{ fontSize: variable.textSizeBigger, alignItems: 'center', paddingTop: 10 }}>Please search again</Text>
            </View>
        )
    }

    renderBackButton() {
        return (
            <Button transparent onPress={() => { this.props.parent.showModal() }}><Text style={{ color: variable.btnPrimaryColor }}>{Identify.__('Cancel')}</Text></Button>
        )
    }
    renderRightButton() {
        return (
            <Button transparent onPress={() => { }}><Text style={{ color: variable.statusBarColor }}>{Identify.__('Cancel')}</Text></Button>
        )
    }
    renderTitle() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: variable.btnPrimaryColor }}>{Identify.__(this.props.title)}</Text></View>
        )
    }

    render() {
        return (
            <View>
                {this.props.showStatusBar && <StatusBar backgroundColor={variable.statusBarColor} barStyle='light-content' />}
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => this.renderRow(item)} />
            </View>
        );
    }
}
AdvanceList.defaultProps = {
    title: 'Search',
    data: [],
    value: '',
    showStatusBar: true,
    showToolBar: true,
    showSearchBar: true
};
