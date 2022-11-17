import React from 'react'
import SimiPageComponent from '../../core/base/components/SimiPageComponent'
import { View, StyleSheet, TouchableOpacity, Image ,  PermissionsAndroid , Platform , Alert } from 'react-native'
import { ActionSheet , Text } from 'native-base'
import Camera from 'react-native-camera'
import { Button, Toast } from 'native-base';
import ImageResizer from 'react-native-image-resizer';
import config from './config';
import material from '../../../native-base-theme/variables/material';
import RNFS from 'react-native-fs'
import Identify from '@helper/Identify'
import NavigationManager from '@helper/NavigationManager';
import { connect } from 'react-redux';
import PopUpResult from "./popupResult";

class GoogleVision extends SimiPageComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            showModal: false,
            dataModal: null,
            imageTaken: ''
        };

    }

    takePicture() {
        this.showLoading('dialog');
        const options = {
            skipProcessing: true,
            doNotSave: true
        };
        this.camera.capture({ metadata: options })
            .then((data) => {
                this.setState({imageTaken: data.path});
                resizeImage(data.path, (image) => {
                    RNFS.readFile(image.path, 'base64').then(result => {
                        this.requestDetection('TEXT_DETECTION', 'LABEL_DETECTION', result);
                    })
                })
            })
            .catch(err => console.log(err));
    }

    requestDetection(type, type2, result){
        let image_search_key = '';
        for (let index = 0; index < Identify.appConfig.site_plugins.length; index++) {
            const element = Identify.appConfig.site_plugins[index];
            if (element.sku === 'simi_simisearchbyimage_40') {
                let json = {}
                json = JSON.parse(element.config.config_values)
                image_search_key = json['default']['image_search_key']
                break;
            }
        }
        if(image_search_key !== ''){
            fetch(config.googleCloud.api + image_search_key, {
                method: "POST",
                body: JSON.stringify({
                    "requests": [
                        {
                            "image": {
                                "content": result
                            },
                            "features": [
                                {
                                    "type": type
                                },
                                {
                                    "type": type2
                                },

                            ]
                        }
                    ]
                })
            })
                .then(response => {
                    // this.camera.stopPreview()
                    if (response.ok) {
                        return response.json();
                    } else {
                        let errors = {};
                        errors['errors'] = [
                            { message: Identify.__('Network response was not ok') }
                        ]
                        return errors;
                    }
                }).then(data => {
                if (data.errors) {
                    console.log('fail');
                    console.log(data.errors)
                } else {
                    console.log('success');
                    this.searchResult(data)
                }
            }).catch(error => {
                console.log('no');
                console.log(error)
            })
        }else {
            this.showLoading();
            Alert.alert(
                'ERROR',
                Identify.__("Can't execute this action right now!"),
                [
                    { text: 'OK' },
                ]
            );
        }
    }

    searchResult(result) {
        this.showLoading();
        this.setState({showModal: true, dataModal: result.responses[0]})
    }

    renderPhoneLayout() {
        return (
            <View style={styles.container}>
                {this.state.imageTaken !== '' ?
                    <Image resizeMode={'contain'} style={{width: '100%', height: '100%'}} source={{uri: this.state.imageTaken}}/> :
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        playSoundOnCapture={false}
                        captureTarget={Camera.constants.CaptureTarget.disk}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    >
                        <TouchableOpacity
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 25,
                                position: 'absolute',
                                bottom: 40,
                                marginLeft: material.deviceWidth < material.deviceHeight ? (material.deviceWidth - 70) / 2 : (material.deviceHeight - 70) / 2,
                            }}
                            onPress={this.takePicture.bind(this)}
                        >
                            <Image resizeMode={'contain'} style={{width: 70, height: 70}} source={require('./img/camera_button.png')}/>
                        </TouchableOpacity>
                    </Camera>
                }
                <PopUpResult
                    parent={this}
                    data={this.state.dataModal}
                />
            </View>
        )
    }
}

// according to https://cloud.google.com/vision/docs/supported-files, recommended image size for labels detection is 640x480
function resizeImage(path, callback, width = 640, height = 480) {
    ImageResizer.createResizedImage(path, width, height, 'JPEG', 80).then((resizedImageUri) => {
        callback(resizedImageUri);

    }).catch((err) => {
        console.error(err)
    });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});


//Save to redux.
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};
export default connect(null, mapDispatchToProps)(GoogleVision);