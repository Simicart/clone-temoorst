import { products } from '@helper/constants';
import Device from '@helper/device';

export default {
    container : {

    },
    content : {
        default_catalog_header : {
            active: false,
            sort_order: 1000,
            content: require('../../../core/screens/catalog/components/categories/categoriesHeader').default
        },
        default_categories: {
            active: true,
            sort_order: 3000,
            content: require('../../../customize/catalog/components/categories').default
        }
    }
}
