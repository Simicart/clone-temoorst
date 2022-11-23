import React from 'react';
import NavigationManager from '@helper/NavigationManager';
import Identify from '@helper/Identify';
import styles from './styles';
import { Image, FlatList, TouchableOpacity } from 'react-native';
import { View, Text, H3, Icon } from 'native-base';
import { connect } from 'react-redux';
import Events from '@helper/config/events';
import material from '@theme/variables/material';

class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.listCategories = this.props.data;
        this.listCategories.sort(function (a, b) {
            return parseInt(a.sort_order) - parseInt(b.sort_order);
        });
    }

    tracking(item) {
        let data = {};
        data['event'] = 'home_action';
        data['action'] = 'selected_category';
        data['category_id'] = item.category_id;
        data['category_name'] = item.cat_name;
        Events.dispatchEventAction(data, this);
    }
    onClickCategory(item) {

        if (item.has_children) {
            routeName = 'Category';
            params = {
                categoryId: item.category_id,
                categoryName: item.cat_name,
            };
        } else {
            routeName = 'Products';
            params = {
                categoryId: item.category_id,
                categoryName: item.cat_name,
            };
        }
        this.tracking(item);
        NavigationManager.openPage(this.props.navigation, routeName, params);
    }
    renderCategoriesItem(item) {
        return (
            <TouchableOpacity onPress={() => { this.onClickCategory(item) }}>
                <View style={{ width: 120, height: 120, marginBottom: 10, marginRight: 10 }}>
                    <View >
                        {item.simicategory_filename ? <Image resizeMode='stretch' source={{ uri: item.simicategory_filename }} style={{ width: '100%', height: '100%', borderRadius: 10 }} /> : null}
                    </View>
                </View>
                <View style={{ width: '100%' }}>
                    <Text style={styles.textListItem}>{item.cat_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    generatePropsFlatlist() {
        return {
            style: styles.list,
            data: this.listCategories,
            horizontal: true,
            showsHorizontalScrollIndicator: false
        }
    }
    render() {
        if (!this.listCategories || Identify.isEmpty(this.listCategories)) {
            return (
                <View />
            );
        } else {
            return (
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15, height: 30 }}>
                        <View>
                            <H3 style={styles.title}>{Identify.__('Categories')}</H3>
                        </View>
                        <TouchableOpacity
                            onPress={() => { NavigationManager.openRootPage(this.props.navigation, "Category", {}); }}
                        >
                            <View style={{ flexDirection: 'row', height: 30, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ ...styles.title, fontSize: 14, marginRight: 3 }}>
                                    {Identify.__('See All')}
                                </Text>
                                <Icon type="MaterialCommunityIcons" style={{ fontSize: 16, color: 'red' }} name="greater-than" size={14} color="red" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        {...this.generatePropsFlatlist()}
                        keyExtractor={(item) => item.category_id}
                        renderItem={({ item }) =>
                            this.renderCategoriesItem(item)
                        }
                    />
                </View>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return { data: state.redux_data.home_data.home.homecategories.homecategories };
}
export default connect(mapStateToProps)(Categories);
//export default Categories;