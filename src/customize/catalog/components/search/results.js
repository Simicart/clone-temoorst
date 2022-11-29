import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { View, Icon, Text, Container } from 'native-base';
import Identify from '@helper/Identify';
import variable from '@theme/variables/material';
import SimiComponent from "@base/components/SimiComponent";
import AppStorage from '@helper/storage';
import VerticalProductItem from '../verticalproducts/item';
import Device from '@helper/device';
import styles from '../verticalproducts/styles'
class ResultsSearch extends SimiComponent {

    constructor(props) {
        super(props);
        this.products = null;
        this.state = {
            showList: false,
        }
    }
    componentDidMount() {

    }
    componentDidUpdate() {
        if (this.products !== this.props.state.products) {
            this.products = this.props.state.products;
        }
    }
    formatData = (data, numColumns) => {
        let numOfFullRow = Math.floor(data.length / numColumns);
        let numOfItemOnLastRow = data.length - numOfFullRow * numColumns;
        while (numOfItemOnLastRow !== numColumns && numOfItemOnLastRow !== 0) {
            ///remove this sec if don't have loadMore
            if (this.props.parent?.state?.loadMore) {
                for (let i = 0; i < data.length - 1; i++) {
                    if (data[i].empty) {
                        data.splice(i, 1);
                    }
                }
            }
            ///
            data.push({ entity_id: Identify.makeid(), empty: true, app_prices: { has_special_price: null } })
            numOfItemOnLastRow = numOfItemOnLastRow + 1;
        }
        return data;
    }

    createListProps() {
        let showList = false
        let numColumns = (showList && !Device.isTablet()) ? 1 : ((showList && Device.isTablet() || !showList && !Device.isTablet()) ? 2 : 4)
        return {
            style: styles.verticalList,
            data: this.formatData(this.products, numColumns),
            // extraData: this.props.parent?.state?.data,
            showsVerticalScrollIndicator: false,
            keyExtractor: (item) => item.entity_id,
            numColumns: numColumns,
            key: (showList) ? 'ONE COLUMN' : 'TWO COLUMN'
        };
    }

    renderItem(item) {
        return (<VerticalProductItem
            layout={this.layout}
            product={item}
            navigation={this.props.navigation}
            showList={this?.state?.showList}
            itemStyle={{ flex: 1 }}
        />);
    }

    renderPhoneLayout() {
        let data = this.products;
        if (data && data.length > 0) {
            return (
                <View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            {Identify.__("Filter results")}
                        </Text>
                    </View>
                    <FlatList
                        {...this.createListProps()}
                        renderItem={({ item }) => {
                            if (item.empty) {
                                return <View style={{ flex: 1 }} />
                            }
                            return (
                                this.renderItem(item)
                            );
                        }
                        } />
                    <View style={{ height: 60 }} />
                </View>
            )
        } else if (data && data.length == 0) {
            return (
                <Container>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: "bold", fontSize: 18 }}>
                            {Identify.__("No Result")}
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            {Identify.__("Sorry, there is nothing for the result, please try again")}
                        </Text>
                    </View>
                </Container>
            )
        } else {
            return null;
        }
    }
}

export default ResultsSearch;