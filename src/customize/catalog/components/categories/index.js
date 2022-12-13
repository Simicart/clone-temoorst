
import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import material from '@theme/variables/material';
import CategoryItem from './categoryItem';
import { FlatList } from 'react-native-gesture-handler';
import { Spinner } from 'native-base';

const width = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Categories extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.parent.categoryData.categories);
        this.data = Object.values(this.props.parent.categoryData.categories);
        console.log(this.data);
        this.dataLength = this.data.length;
        this.qty = 8;
        this.stopLoadmore= true;
        this.count = 0;
        this.state = {
            data: this.data.slice(0, this.qty),
            loadingMore: false
        }
    }

    renderCategoryItem(data) {
        return <CategoryItem element={data} {...this.props} />
    }

    handleOnEndReached() {
        console.log(this.state.data)
        if( this.count*this.qty < this.dataLength) {
            this.count ++;
            this.setState({loadingMore: true})
            setTimeout(()=>{
                this.setState({loadingMore: false})
            },1000)
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
                    renderItem={({item}) => this.renderCategoryItem(item)} 
                    ListFooterComponent={()=>{
                        if(this.state.loadingMore){
                            return <Spinner />
                        }else{
                            return null;
                        }
                    }}
                />

            </View>
        );
    }
}
export default Categories;

