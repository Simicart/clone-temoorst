import React from 'react';
import SimiComponent from "@base/components/SimiComponent";
import { Card, H3, Icon } from 'native-base';
import { TouchableOpacity, View, Text } from 'react-native';
import NavigationManager from '@helper/NavigationManager';
import Identify from '@helper/Identify';
import styles from './styles';
import Events from '@helper/config/events';
import HTML from 'react-native-render-html';

const ProductTechSpecsComponent = (props) => {

    // function tracking() {
    //     let params = {};
    //     params['event'] = 'product_action';
    //     params['action'] = 'selected_product_tech_specs';
    //     params['product_name'] = props.product.name;
    //     params['product_id'] = props.product.entity_id;
    //     params['sku'] = props.product.sku;
    //     Events.dispatchEventAction(params, this);
    // }

    function renderContent(data, style) {
        let styleContent = style;
        if (data.includes('<')) {
            delete styleContent['textAlign']
            return <HTML containerStyle={styleContent} tagsStyles={{ p: { textAlign: 'left' }, span: { textAlign: 'left' } }} html={data} baseFontStyle={{ fontFamily: material.fontFamily }} />
        } else {
            return <Text style={styleContent}>{Identify.__(data)}</Text>
        }
    }
    function createContent() {
        let rows = [];
        let additional = props.product.additional;
        let shouldHightlight = true;
        for (let key in additional) {
            let item = additional[key];
            rows.push(
                <View key={key} style={{ backgroundColor: (shouldHightlight) ? '#EDEDED' : 'white', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                    { renderContent(item.label, { flex: 2, fontWeight: 'bold', textAlign: 'left' })}
                    { renderContent(item.value, { flex: 3, marginLeft: 5, textAlign: 'left' })}
                </View>
            );
            shouldHightlight = !shouldHightlight;
        }
        return (rows);
    }

    function openTeachSpecs() {
        NavigationManager.openPage(props.navigation, 'TechSpecs', {
            additional: props.product.additional,
        });
    }

    if (!Identify.isEmpty(props.product.additional)) {
        return (
            <View>
                <Card style={styles.card}>
                    <View style={[styles.cardContainer, {flexDirection: 'column'}]}>
                        <H3 style={[styles.title, {marginBottom: 20}]}>{Identify.__('Tech Specs')}</H3>
                        { createContent()}
                    </View>
                </Card>
            </View>
        );
    } else {
        return (null);
    }
}
export default ProductTechSpecsComponent;