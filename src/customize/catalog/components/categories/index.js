
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

    }

    renderCategoryItem(data) {
        return <CategoryItem element={data} {...this.props} />
    }

    render() {
        data = this.props.parent.categoryData.categories;
        let height = deviceHeight - parseInt(material.toolbarHeight) - parseInt(material.isIphoneX ? 76 : 56) - parseInt(material.isIphoneX ? 40 : 20);
        return (
            <View style={{ width: width, height: height }}>
                <FlatList 
                    style={styles.listCategories}
                    numColumns={2} 
                    initialNumToRender={12}
                    data={data}
                    renderItem={({item}) => this.renderCategoryItem(item)} />
            </View>
        );
    }
}
export default Categories;

