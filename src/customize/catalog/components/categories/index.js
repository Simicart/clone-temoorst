
import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import material from '@theme/variables/material';
import CategoryItem from './categoryItem';

const width = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Categories extends React.Component {
    constructor(props) {
        super(props);

    }

    renderCategoryItems(data) {
        let views = [];
        if (data.length > 0) {
            data.forEach(element => {
                views.push(
                    <CategoryItem element={element} {...this.props} />
                )
            });
        }
        return views;
    }

    render() {
        data = this.props.parent.categoryData.categories;
        let height = deviceHeight - parseInt(material.toolbarHeight) - parseInt(material.isIphoneX ? 76 : 56) - parseInt(material.isIphoneX ? 40 : 20);
        return (
            <View style={{ width: width, height: height }}>
                <ScrollView scrollEnabled={true} style={{ flex: 1 }}>
                    <View style={styles.listCategories} >
                        {this.renderCategoryItems(data)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default Categories;

