import WebViewPayment from '@screens/webview/WebViewPayment';
import Identify from '@helper/Identify';

export default class CCAvenuePayment extends WebViewPayment {

    constructor(props) {
        super(props);
        this.payment = this.props.navigation.getParam('payment');
        this.orderInfo = this.props.navigation.getParam('orderInfo');
    }

    addMorePropsToWebView() {
        return ({
            url: this.orderInfo.url_action,
            orderID: this.orderInfo.invoice_number,
            keySuccess: 'onepage/success',
            messageSuccess: Identify.__('Complete order Successfully. Thank your for purchase'),
            keyError: 'simiavenue/api/index',
            messageError: Identify.__('Have some errors, please try again'),
            keyReview: 'onepage/review',
            messageReview: Identify.__('The order changes to reviewed'),
            keyFail: 'onepage/failure',
            messageFail: Identify.__('Failure: Your order has been canceled'),
        });
    }
}
