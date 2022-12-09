import React from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, Linking, Text, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackActions } from 'react-navigation';
import NavigationManager from '@helper/NavigationManager';
// import styles from './styles';
import Events from '@helper/config/events';
import Identify from "@helper/Identify";
import Device from '@helper/device';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window')

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 1
        }
        this.onSelectBanner = this.onSelectBanner.bind(this);
    }

    onSelectBanner(banner) {
        console.log("click onSelectBanner");
        let data = {};
        data['event'] = 'home_action';
        data['action'] = 'selected_banner';
        data['banner_title'] = banner.banner_title;
        data['banner_id'] = banner.banner_id;
        let type = banner.type;
        switch (type) {
            case '1':
                routeName = 'ProductDetail';
                params = {
                    productId: banner.product_id,
                };
                data['banner_type'] = 'product';
                data['product_id'] = banner.product_id;
                break;
            case '2':
                if (banner.has_children) {
                    routeName = 'Category';
                    params = {
                        categoryId: banner.category_id,
                        categoryName: banner.cat_name,
                    };
                } else {
                    routeName = 'Products';
                    params = {
                        categoryId: banner.category_id,
                        categoryName: banner.cat_name,
                    };
                }
                data['banner_type'] = 'category';
                data['category_id'] = banner.category_id;
                break;
            case '3':
                routeName = 'WebViewPage';
                params = {
                    uri: banner.banner_url,
                };
                data['banner_type'] = 'web';
                break;
            default:
                break;
        }
        Events.dispatchEventAction(data, this);
        if (routeName === 'WebViewPage' && Identify.getMerchantConfig().storeview.base.open_url_in_app && Identify.getMerchantConfig().storeview.base.open_url_in_app != '1') {
            Linking.openURL(params.uri);
        } else {
            NavigationManager.openPage(this.props.navigation, routeName, params);
        }
    }

    // renderBanner(banner, urlBanner) {
    //     return (
    //         <TouchableOpacity key={banner.banner_id} onPress={() => {
    //             this.onSelectBanner(banner);
    //         }}>
    //             <View>
    //                 <Image source={{ uri: urlBanner }} style={styles.banner} />
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    _renderItem({ item, index }, parallaxProps) {
        const data = { ...item };
        if (!Device.isTablet()) {
            if (item.banner_name && item.banner_name != null) {
                data['urlBanner'] = item.banner_name
            }
        } else {
            if (item.banner_name_tablet && item.banner_name_tablet != null) {
                data['urlBanner'] = item.banner_name_tablet
            }
        }
        return (
            <TouchableOpacity key={data.banner_id} onPress={() => {
                // console.log("item: ", item);
                item.handlerOnClick(item);
                // this.onSelectBanner(data);
                // let data = {};
                // data['event'] = 'home_action';
                // data['action'] = 'selected_banner';
                // data['banner_title'] = item.banner_title;
                // data['banner_id'] = item.banner_id;
                // let type = item.type;
                // switch (type) {
                //     case '1':
                //         routeName = 'ProductDetail';
                //         params = {
                //             productId: item.product_id,
                //         };
                //         data['banner_type'] = 'product';
                //         data['product_id'] = item.product_id;
                //         break;
                //     case '2':
                //         if (item.has_children) {
                //             routeName = 'Category';
                //             params = {
                //                 categoryId: item.category_id,
                //                 categoryName: item.cat_name,
                //             };
                //         } else {
                //             routeName = 'Products';
                //             params = {
                //                 categoryId: item.category_id,
                //                 categoryName: item.cat_name,
                //             };
                //         }
                //         data['banner_type'] = 'category';
                //         data['category_id'] = item.category_id;
                //         break;
                //     case '3':
                //         routeName = 'WebViewPage';
                //         params = {
                //             uri: item.banner_url,
                //         };
                //         data['banner_type'] = 'web';
                //         break;
                //     default:
                //         break;
                // }
                // Events.dispatchEventAction(data, this);
                // if (routeName === 'WebViewPage' && Identify.getMerchantConfig().storeview.base.open_url_in_app && Identify.getMerchantConfig().storeview.base.open_url_in_app != '1') {
                //     Linking.openURL(params.uri);
                // } else {
                //     NavigationManager.openPage(this.props.navigation, routeName, params);
                // }
            }}>
                <View style={styles.item}>
                    <ParallaxImage
                        source={{ uri: data.urlBanner }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    pagination(lenght) {
        const { activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={lenght}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'white', paddingVertical: 10 }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 99,
                    marginHorizontal: 0,
                    backgroundColor: '#ffcdb7'
                }}
                inactiveDotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 99,
                    marginHorizontal: 0,
                    backgroundColor: '#fc692a'
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }

    render() {
        let banners = [];

        let bannersData = null;
        if (this.props.data) {
            bannersData = this.props.data.map((item) => {
                return {
                    ...item,
                    ...this,
                    handlerOnClick: function (banner) {
                        console.log("this in funtion:", this)
                        let data = {};
                        data['event'] = 'home_action';
                        data['action'] = 'selected_banner';
                        data['banner_title'] = banner.banner_title;
                        data['banner_id'] = banner.banner_id;
                        let type = banner.type;
                        switch (type) {
                            case '1':
                                routeName = 'ProductDetail';
                                params = {
                                    productId: banner.product_id,
                                };
                                data['banner_type'] = 'product';
                                data['product_id'] = banner.product_id;
                                break;
                            case '2':
                                if (banner.has_children) {
                                    routeName = 'Category';
                                    params = {
                                        categoryId: banner.category_id,
                                        categoryName: banner.cat_name,
                                    };
                                } else {
                                    routeName = 'Products';
                                    params = {
                                        categoryId: banner.category_id,
                                        categoryName: banner.cat_name,
                                    };
                                }
                                data['banner_type'] = 'category';
                                data['category_id'] = banner.category_id;
                                break;
                            case '3':
                                routeName = 'WebViewPage';
                                params = {
                                    uri: banner.banner_url,
                                };
                                data['banner_type'] = 'web';
                                break;
                            default:
                                break;
                        }
                        Events.dispatchEventAction(data, this);
                        if (routeName === 'WebViewPage' && Identify.getMerchantConfig().storeview.base.open_url_in_app && Identify.getMerchantConfig().storeview.base.open_url_in_app != '1') {
                            Linking.openURL(params.uri);
                        } else {
                            NavigationManager.openPage(this.props.navigation, routeName, params);
                        }
                    }
                }
            });
            bannersData.sort(function (a, b) {
                var keyA = a.sort_order,
                    keyB = b.sort_order;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
        }
        if (bannersData && bannersData.length > 0) {
            return (
                <View style={{ ...styles.banner, paddingTop: 20 }}>
                    <Carousel
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={bannersData}
                        onSnapToItem={(index) => this.setState({ activeSlide: index })}
                        renderItem={this._renderItem}
                        hasParallaxImages={true}
                        loop={true}
                        autoplay={true}
                        layoutCardOffset={`9`}
                    />
                    <View>
                        {this.pagination(bannersData.length)}
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    item: {
        width: screenWidth - 60,
        // height: screenWidth - 60,
        height: 150,

        // backgroundColor: 'red'
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
})
const mapStateToProps = (state) => {
    return { data: state.redux_data.home_data.home.homebanners.homebanners };
}
export default connect(mapStateToProps)(Banner);
