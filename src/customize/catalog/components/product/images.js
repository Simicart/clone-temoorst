import React from 'react';
import SimiComponent from "@base/components/SimiComponent";
import { Card, Text } from 'native-base';
import { TouchableOpacity, Image, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import NavigationManager from '@helper/NavigationManager';
import Device from '@helper/device';
import styles from './styles';
import Events from '@helper/config/events';
import Identify from '@helper/Identify';
import md5 from 'md5';
import OutStockLabel from './outStockLabel'
import material from '@theme/variables/material';

export default class ProductImagesComponent extends SimiComponent {
    constructor(props){
        super(props)
        this.state = {
            ... this.state,
            showSwiper: false,
            index: 0,
        }
    }
    

    componentWillMount(){
        setTimeout(() => {this.setState({showSwiper:true})}, 500);
    }

    tracking() {
        let params = {};
        params['event'] = 'product_action';
        params['action'] = 'showed_images_screen';
        params['product_name'] = this.props.product.name;
        params['product_id'] = this.props.product.entity_id;
        params['sku'] = this.props.product.sku;
        Events.dispatchEventAction(params, this);
    }

    onSelectImage(image) {
        NavigationManager.openPage(this.props.navigation, 'FullImage', {
            images: this.props.product.images,
            index: image
        });
    }

    renderImages() {
        let images = [];
        let data = JSON.parse(JSON.stringify(this.props.product.images));
        for (let i in data) {
            let image = data[i];
            image['simi_index'] = i;
            images.push(
                <TouchableOpacity
                    onPress={() => {
                        this.onSelectImage(i)
                    }}
                    key={image.position}
                    style={{ width: '100%', height: '100%', alignItems: 'center', }}>
                    <Image resizeMode='contain' source={{ uri: image.url }}
                        style={[styles.bannerImage, (!Device.isTablet() || this.isPortrait()) && { aspectRatio: 1 }]} />
                </TouchableOpacity>
            );
            i++;
        }
        return images;
    }

    renderOutStock() {
        if (this.props.product.is_salable == '0') {
            return <OutStockLabel />
        }
    }

    renderZoom(){
        return(
            <TouchableOpacity
                onPress={() => { this.props.product ? this.onSelectImage(this.state.index + 1) : {} }}
                style={{
                    position: 'absolute',
                    zIndex: 99,
                    right: 10,
                    top: 10,
                    width: '7%',
                    height: '7%',
                }}
            >
                <Image style={{width: '100%', height: '100%', aspectRatio: 1, tintColor: '#b4b4b4'}} source={require('@media/scale-symbol.png')}/>
            </TouchableOpacity>
        )
    }

    renderSpecialPriceLabel(){
        let saleOff = null;
        let price = this.props.product.app_prices;
        if (price.has_special_price !== null && price.has_special_price === 1) {
            if (price.show_ex_in_price != null && price.show_ex_in_price == 1) {
                saleOff = 100 - (price.price_including_tax.price / price.regular_price) * 100;
                saleOff = saleOff.toFixed(0);
            } else {
                saleOff = 100 - (price.price / price.regular_price) * 100;
                saleOff = saleOff.toFixed(0);
            }
        }
        let showLabel = Identify.getMerchantConfig().storeview.catalog.frontend.show_discount_label_in_product;
        if(saleOff){
            if(showLabel && showLabel !== '1') {
                return null;
            }
            return (
                <View
                    style={{
                        position: 'absolute',
                        zIndex: 99,
                        left: 10,
                        top: 10,
                        backgroundColor: 'white',
                        borderRadius: 4,
                        borderColor: '#f0f0f0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        padding: 5
                    }}
                >
                    <Text style={{color: Identify.theme.button_background, fontFamily: material.fontBold, textAlign: 'center'}}>{saleOff + '% ' + Identify.__('OFF')}</Text>
                </View>
            )
        }
    }

    renderHorirontalImages() {
        let data = JSON.parse(JSON.stringify(this.props.product.images));
        return (
            <View style={{ width: '100%', height: '20%' }}>
                <ScrollView style={{flex: 1}} horizontal>
                        {data.map((item, index) => this.renderItem(item, index))}
                </ScrollView>
                {/* <FlatList 
                    data={data}
                    numColumns={20}
                    keyExtractor={(item) => item}
                    renderItem={(item) => this.renderItem(item)} /> */}
            </View>
        )
    }

    renderItem(item, index){
        return (
            <TouchableOpacity onPress={() => this.setState({ index: index })}
                style={{ width: 60, height: '100%', marginHorizontal: 10 }}>
                <Image 
                    style={{ 
                        flex: 1,
                        borderWidth: 2, 
                        borderColor: index === this.state.index ? Identify.theme.button_background : '#C0C0C0',
                        opacity: index === this.state.index ? 1 : 0.7,
                        borderRadius: 10 }}
                    resizeMode='stretch'
                    source={{ uri: item.url }}/>
            </TouchableOpacity>
        )
    }

    renderPhoneLayout() {
        if (this.props.product == null) {
            return (null);
        }
        return (
            <Card style={[styles.bannerCard, (!Device.isTablet() || this.isPortrait()) && { aspectRatio: 1 }]}>
                <View style={{ flex: 1, marginBottom: 15 }}>
                    {this.renderZoom()}
                    {this.renderSpecialPriceLabel()}
                    {this.state.showSwiper ? <Swiper
                        loop={false}
                        onIndexChanged={(index) => {
                            this.setState({ index: index })
                        }}
                        key={this.props.product.images.length}
                        horizontal={true}>
                        {this.renderImages()}
                    </Swiper> : null}
                    {this.renderHorirontalImages()}
                    {this.renderOutStock()}
                    {this.dispatchContent()}
                </View>
            </Card>
        );
    }

    dispatchContent() {
        let items = [];
        if (Events.events.add_labels) {
            for (let i = 0; i < Events.events.add_labels.length; i++) {
                let node = Events.events.add_labels[i];
                if (node.active === true) {
                    let key = md5("add_labels" + i);
                    let Content = node.content;
                    let price = this.props.product.app_prices;
                    let hasSpecial = price.has_special_price !== null && price.has_special_price === 1;
                    items.push(<Content hasSpecial={hasSpecial} key={key} type={'4'} product={this.props.product} />)
                }
            }
        }
        return items;
    }
}
