
import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import material from '@theme/variables/material';
import CategoryItem from './categoryItem';
import { FlatList } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Categories extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.parent.categoryData.categories);
        this.data = Object.values(this.props.parent.categoryData.categories);
        console.log(this.data);
        this.dataLength = this.data.length;
        this.qty = 12;
        this.stopLoadmore= true;
        this.count = 0;
        this.state = {
            data: this.data.slice(0, this.qty),
        }
    }

    renderCategoryItem(data) {
        return <CategoryItem element={data} {...this.props} />
    }

    handleOnEndReached() {
        if( this.count*this.qty < this.dataLength) {
            this.count ++;
            console.log(this.count);
            this.setState({data: [...this.state.data, ...this.data.slice(this.count*this.qty, (this.count+1)*this.qty)]})
        }
    }

    render() {
        let height = deviceHeight - parseInt(material.toolbarHeight) - parseInt(material.isIphoneX ? 76 : 56) - parseInt(material.isIphoneX ? 40 : 20);
        return (
            <View style={{ width: width, height: height }}>
                <FlatList 
                    style={styles.listCategories}
                    numColumns={2} 
                    onEndReached={() => this.handleOnEndReached()}
                    onEndReachedThreshold={0.5}
                    data={this.state.data}
                    renderItem={({item}) => this.renderCategoryItem(item)} />
            </View>
        );
    }
}
export default Categories;

