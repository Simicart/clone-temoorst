export default {
    container: {
        default_list: {
            active: true,
            sort_order: 1000,
            content: require('@customize/customer/components/address/list').default,
        },
        default_action: {
            active: true,
            sort_order: 2000,
            content: require('@customize/customer/components/address/action').default,
        },

    },
    content: {

    }
}
