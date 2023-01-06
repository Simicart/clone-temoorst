import React from 'react';
import SimiComponent from "@base/components/SimiComponent";
import { Card, H3, Icon } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import NavigationManager from '@helper/NavigationManager';
import Identify from '@helper/Identify';
import styles from './styles';
import Events from '@helper/config/events';
import HTML from 'react-native-render-html';

const ProductDescriptionComponent = (props) => {

    function openDescription() {
        if (props.product.description) {
            let code = Identify.isRtl() ? "rtl" : "ltr";
            // let html = '<html dir="' + code + '" lang=""><body>' + props.product.description + "</body></html>";
            // NavigationManager.openPage(props.navigation, 'WebViewPage', {
            //     html: html,
            // });
            let params = {};
            params['event'] = 'product_action';
            params['action'] = 'selected_product_description';
            params['product_name'] = props.product.name;
            params['product_id'] = props.product.entity_id;
            params['sku'] = props.product.sku;
            Events.dispatchEventAction(params, this);
        }
    }

    function renderDescriptionView(showDescription) {
        let code = Identify.isRtl() ? "rtl" : "ltr"
        let html = '<html dir="' + code + '" lang=""><body>' + showDescription + "</body></html>";
        return (
            <View >
                <Card style={styles.card}>
                    <View style={styles.cardContainer}>
                        <View style={{ flex: 1 }}>
                            <H3 style={styles.title}>{Identify.__('Description')}</H3>
                            <HTML html={showDescription ? html : null} tagsStyles={{ body: { textAlign: 'left' } }}/>
                        </View>
                        {/* {props.product.description && <Icon style={styles.extendIcon} name={Identify.isRtl() ? 'ios-arrow-back' : "ios-arrow-forward"} />} */}
                    </View>
                </Card>
            </View>
        );
    }

    if (!props.parent.state.reRender) {
        return (
            renderDescriptionView(null)
        );
    }
    let showDescription = props.product.description;
    if (!showDescription) {
        return null;
    }
    return (
        renderDescriptionView(showDescription)
    );

}

export default ProductDescriptionComponent;