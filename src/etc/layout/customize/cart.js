export default {
    container: {
        default_checkout_button: {
            active: true,
            sort_order: 1000,
            content: require('../../../customize/checkout/components/checkoutbutton').default
        },
    },
    content: {
        default_estimate_shipping: {
            active: true,
            sort_order: 1,
            content: require('../../../customize/checkout/components/estimateshipping').default,
            left: true
        },
        default_list: {
            active: true,
            sort_order: 1000,
            content: require('../../../customize/checkout/components/quoteitem/list').default,
            left: true
        },
        default_total: {
            active: true,
            sort_order: 3000,
            content: require('../../../customize/checkout/components/totals').default,
            left: false
        }
    }
}
