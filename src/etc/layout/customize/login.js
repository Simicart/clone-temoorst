import { products } from '@helper/constants';
import Device from '@helper/device';

export default {
    container : {

    },
    content: {
        default_login_form: {
            active: true,
            sort_order: 1000,
            content: require('../../../customize/customer/components/login/loginform').default
        },
        default_remember_email_pass: {
            active: true,
            sort_order: 2000,
            content: require('../../../customize/customer/components/login/remember').default,
            left: true
        },
        default_forgot_password:{
            active: false,
            sort_order: 2000,
            content: require('../../../customize/customer/components/login/forgotPass').default,
            right: true
        },
        default_login_button: {
            active: true,
            sort_order: 3000,
            content: require('../../../customize/customer/components/login/loginbutton').default
        },
        
        default_register_button: {
            active: true,
            sort_order: 8000,
            content: require('../../../customize/customer/components/login/registerbutton').default
        }
    }
}
