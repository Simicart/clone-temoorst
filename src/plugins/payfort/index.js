import React from 'react';
import WebViewPayment from '@screens/webview/WebViewPayment';
import NewConnection from '@base/network/NewConnection';
import NavigationManager from '@helper/NavigationManager';

export default class PayFort extends WebViewPayment {
    constructor(props) {
        super(props);
        this.orderInfo = this.props.navigation.getParam('orderInfo');
        this.mode = this.props.navigation.getParam('mode');
    }

    addMorePropsToWebView() {
        return ({
            url: this.orderInfo.redirect_url,
            orderID: this.orderInfo.invoice_number,
            keySuccess: this.orderInfo.success_url,
        });
    }

    setData(data) {
        NavigationManager.clearStackAndOpenPage(this.props.navigation, 'Thankyou', {
            invoice: this.orderInfo.invoice_number,
            mode: this.mode
        });
    }

    handleWhenRequestFail(url) {
        NavigationManager.backToRootPage(this.props.navigation);
    }

    onSuccess() {
        if (this.orderInfo.invoice_number) {
            let params = {
                invoice_number: this.orderInfo.invoice_number
            }
            new NewConnection()
                .init('simiconnector/rest/v2/payfortapis/update_payment', 'payfort_update', this)
                .addGetData(params)
                .connect();
        }
        return true;
    }
}