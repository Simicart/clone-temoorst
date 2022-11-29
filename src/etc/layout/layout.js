export default {
    simi_paypalexpress_40: {
        product: require('../../etc/layout/plugins/simi_paypalexpress_40/product').default
    },
    simi_fblogin_40: {
        login: require('../../etc/layout/plugins/simi_fblogin_40/login').default
    },
    simi_simivideo_40: {
        product: require('../../etc/layout/plugins/simi_simivideo_40/product').default,
    },
    simi_addressautofill_40: {
        address: require('../../etc/layout/plugins/simi_addressautofill_40/address').default,
    },
    simi_loyalty_40: {
        cart: require('../../etc/layout/plugins/simi_loyalty_40/cart').default,
        product: require('../../etc/layout/plugins/simi_loyalty_40/product').default,
        checkout: require('../../etc/layout/plugins/simi_loyalty_40/checkout').default,
        myaccount: require('../../etc/layout/plugins/simi_loyalty_40/myaccount').default
    },
    simi_simigiftcard_40: {
        myaccount: require('../../etc/layout/plugins/simi_simigiftcard_40/myaccount').default,
        cart: require('../../etc/layout/plugins/simi_simigiftcard_40/cart').default,
        checkout: require('../../etc/layout/plugins/simi_simigiftcard_40/checkout').default
    },
    simi_simicouponcode_40: {
        cart: require('../../etc/layout/plugins/simi_simicouponcode_40/cart').default,
        checkout: require('../../etc/layout/plugins/simi_simicouponcode_40/checkout').default,
    },
    simi_simiproductreview_40: {
        product: require('../../etc/layout/plugins/simi_simiproductreview_40/product').default
    },
    customize: {
        category: require('./customize/category').default,
        login: require('./customize/login').default,
        cart: require('./customize/cart').default,
        standard: require('./customize/standard').default,
        header: require('./customize/header').default,
        products: require('./customize/products').default,
        customer: require('./customize/customer').default,
        myaccount: require('./customize/myaccount').default,
        search: require('./customize/search').default,
        contactus: require('./customize/contactus').default,
        orders: require('./customize/orders').default,
        order: require('./customize/order').default,
    }
}
