import Identify from '@helper/Identify';

export default {
    container: {
        
    },
    content: {
        default_profile: {
            active: true,
            sort_order: 1000,
            content: require('../../../customize/menu/BaseMenuItem').default,
            data: {
                keyItem: 'myaccount_profile',
                type: 'MaterialCommunityIcons',
                iconName: 'account-details-outline',
                label: 'Profile',
                extendable: true
            }
        },
        default_address: {
            active: true,
            sort_order: 2000,
            content: require('../../../customize/menu/BaseMenuItem').default,
            data: {
                keyItem: 'myaccount_address',
                type: 'MaterialCommunityIcons',
                iconName: 'map-marker-radius-outline',
                label: 'Address Book',
                extendable: true
            }
        },
        default_order_history: {
            active: true,
            sort_order: 3000,
            content: require('../../../customize/menu/BaseMenuItem').default,
            data: {
                keyItem: 'myaccount_orders',
                type: 'AntDesign',
                iconName: 'profile',
                label: 'Order History',
                extendable: true
            }
        },
        default_my_wishlist: {
            active: true,
            sort_order: 4000,
            content: require('../../../customize/menu/BaseMenuItem').default,
            data: {
                keyItem: 'myaccount_wishlist',
                type: 'AntDesign',
                iconName: 'hearto',
                label: 'My wishlist',
                extendable: true
            }
        },
        default_register_button: {
            active: true,
            sort_order: 5000,
            content: require('../../../customize/menu/BaseMenuItem').default,
            data: {
                keyItem: 'myaccount_logout',
                type: 'Octicons',
                iconName: 'sign-out',
                label: 'Sign Out',
                extendable: false
            }
        },
    }
}