import React, { Component } from "react";
import { I18nManager, Platform, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
// import Splash from '../src/core/screens/splash/pages/index';
import Splash from '../src/customize/splash/pages/index';
import Maintain from '../src/core/screens/splash/pages/maintain';
// import Category from '../src/core/screens/catalog/pages/categories/catagories';
import Category from '../src/customize/catalog/pages/categories/catagories';
// import Home from '../src/core/screens/home/pages';
import Home from '../src/customize/home/pages';
// import Products from '../src/core/screens/catalog/pages/products/products';
import Products from '../src/customize/catalog/pages/products/products';
import Settings from '../src/customize/settings/pages/settings';
import Sort from '../src/core/screens/catalog/pages/products/sort';
import Filter from '../src/core/screens/catalog/pages/products/filter';
import FilterSelection from '../src/core/screens/catalog/pages/products/selection';
// import Drawer from '../src/core/base/components/drawer';
import Drawer from '../src/customize/drawer';
// import Login from '../src/core/screens/customer/pages/login';
import Login from '../src/customize/customer/pages/login';


// import ProductDetail from '../src/core/screens/catalog/pages/product/product';
import ProductDetail from '../src/customize/catalog/pages/product/product';
// import Cart from '../src/core/screens/checkout/pages/cart';
import Cart from '../src/customize/checkout/pages/cart';
import Checkout from '../src/core/screens/checkout/pages/checkout';
import CheckoutWebView from '../src/core/screens/checkout/pages/webview';
import Thankyou from '../src/core/screens/checkout/pages/thankyou';
import NewAddress from '../src/customize/customer/pages/address';
import OrderHistory from '../src/customize/customer/pages/orders';
import OrderHistoryDetail from '../src/customize/customer/pages/order';
import MyAccount from '../src/customize/customer/pages/myaccount';
import AddressBook from '../src/customize/customer/pages/addressbook';
import WebViewPage from '../src/core/screens/webview';
import WebAppPage from '../src/core/screens/webview/WebApp';
import TechSpecs from '../src/core/screens/catalog/pages/product/techspecs';
import FullImage from '../src/core/screens/catalog/pages/product/fullimage';
// import SearchProducts from '../src/core/screens/catalog/pages/search';
import SearchProducts from '../src/customize/catalog/pages/search';
import Customer from '../src/customize/customer/pages/customer';
import NotificationHistory from '../src/core/screens/notification/pages';
import CreditCard from '../src/core/screens/checkout/pages/creditcard';

import CustomPayment from '../src/plugins/custompayments/page';
import PaypalExpressWebView from '../src/plugins/paypalexpress/pages/webview';
import PayPalExpressAddress from '../src/plugins/paypalexpress/pages/address';
import PayPalExpressShipping from '../src/plugins/paypalexpress/pages/shipping';
import BraintreePayment from '../src/plugins/braintree';
import CCAvenuePayment from '../src/plugins/ccavenue';

// import ContactUs from '../src/plugins/contactus';
import ContactUs from "../src/customize/customer/pages/contactUs";
import StoreLocator from '../src/plugins/storelocator';
import StoreLocatorDetail from '../src/plugins/storelocator/detail';
import StoreLocatorSearch from '../src/plugins/storelocator/search';
// import Wishlist from '../src/plugins/wishlist';
import Wishlist from '../src/customize/wishlist';
import BarCode from '../src/plugins/barcode';
import MyReward from '../src/plugins/rewardpoint/MyReward';
import SettingReward from '../src/plugins/rewardpoint/SettingReward';
import RewardHistory from '../src/plugins/rewardpoint/RewardHistory';

import MyGiftCard from '../src/plugins/giftcard/MyGiftCard'
import MyGiftCardDetail from '../src/plugins/giftcard/MyGiftCardDetail'
import AddRedeemGiftCard from '../src/plugins/giftcard/AddRedeemGiftCard';
import ListGiftCardProducts from '../src/plugins/giftcard/products/ListGiftCardProducts';
import ProductGiftCardDetail from '../src/plugins/giftcard/products/Detail'
import MyGiftCardItemDetail from '../src/plugins/giftcard/ItemDetail'
import CheckGiftCode from '../src/plugins/giftcard/checkGiftCode';

import ReviewDetail from '../src/plugins/review/reviewDetail';
import ReviewPage from '../src/plugins/review/reviewPage';
import AddReview from '../src/plugins/review/addreview/addReview';

// import ForgotPassword from '../src/core/screens/customer/pages/forgotPassword';
import ForgotPassword from '../src/customize/customer/pages/forgotPassword';

//payfort
import SimiPayfort from '../src/plugins/payfort';
import GoogleVision from '../src/plugins/searchbyimage/index';

const Stack = createStackNavigator(
    {
        Splash: { screen: Splash },
        Home: { screen: Home },
        Category: { screen: Category },
        Products: { screen: Products },
        Sort: { screen: Sort },
        Filter: { screen: Filter },
        FilterSelection: { screen: FilterSelection },
        ProductDetail: { screen: ProductDetail },
        WebViewPage: { screen: WebViewPage },
        TechSpecs: { screen: TechSpecs },
        FullImage: { screen: FullImage },
        Login: { screen: Login },
        NewAddress: { screen: NewAddress },
        OrderHistory: { screen: OrderHistory },
        OrderHistoryDetail: { screen: OrderHistoryDetail },
        MyAccount: { screen: MyAccount },
        AddressBook: { screen: AddressBook },
        SearchProducts: { screen: SearchProducts },
        Cart: { screen: Cart },
        Checkout: { screen: Checkout },
        CheckoutWebView: { screen: CheckoutWebView },
        Thankyou: { screen: Thankyou },
        Customer: { screen: Customer },
        Settings: { screen: Settings },
        NotificationHistory: { screen: NotificationHistory },
        CustomPayment: { screen: CustomPayment },
        PaypalExpressWebView: { screen: PaypalExpressWebView },
        PayPalExpressAddress: { screen: PayPalExpressAddress },
        PayPalExpressShipping: { screen: PayPalExpressShipping },
        BraintreePayment: { screen: BraintreePayment },
        ContactUs: { screen: ContactUs },
        StoreLocator: { screen: StoreLocator },
        StoreLocatorDetail: { screen: StoreLocatorDetail },
        StoreLocatorSearch: { screen: StoreLocatorSearch },
        Wishlist: { screen: Wishlist },
        BarCode: { screen: BarCode },
        MyReward: { screen: MyReward },
        SettingReward: { screen: SettingReward },
        RewardHistory: { screen: RewardHistory },
        MyGiftCard: { screen: MyGiftCard },
        MyGiftCardDetail: { screen: MyGiftCardDetail },
        MyGiftCardItemDetail: { screen: MyGiftCardItemDetail },
        AddRedeemGiftCard: { screen: AddRedeemGiftCard },
        ListGiftCardProducts: { screen: ListGiftCardProducts },
        ProductGiftCardDetail: { screen: ProductGiftCardDetail },
        CheckGiftCode: { screen: CheckGiftCode },
        ReviewDetail: { screen: ReviewDetail },
        ReviewPage: { screen: ReviewPage },
        AddReview: { screen: AddReview },
        ForgotPassword: { screen: ForgotPassword },
        CCAvenuePayment: { screen: CCAvenuePayment },
        CreditCard: { screen: CreditCard },
        Maintain: { screen: Maintain },
        WebAppPage: { screen: WebAppPage },
        SimiPayfort: { screen: SimiPayfort },
        GoogleVision: { screen: GoogleVision }
    },
    {
        headerMode: 'none'
    }
);
Stack.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    let screenWantDisable = ['Maintain', 'WebAppPage', 'Login']; //screen want to disable drawer
    let route = navigation.state.routes;
    screenWantDisable.forEach(screen => {
        route.forEach(routeName => {
            if (routeName.routeName === screen) {
                drawerLockMode = 'locked-closed';
            }
        })
    })

    return {
        drawerLockMode,
    };
};

const Router = createDrawerNavigator(
    {
        Splash: { screen: Splash },
        Stack: { screen: Stack }
    },
    {
        contentComponent: props => <Drawer {...props} />,
        initialRouteName: 'Splash',
        drawerPosition: Platform.OS === 'android' ? (I18nManager.isRTL ? 'right' : 'left') : '',
        drawerWidth: Dimensions.get('screen').width * 3 / 5 > 280 ? 280 : Dimensions.get('screen').width * 2 / 3
    }
);

const App = createAppContainer(Router);

export default App;
