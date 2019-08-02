import React, { Component } from 'react';

import { RNCamera } from 'react-native-camera';
import { styles } from '../styles/cameraStyle';

export default class Camera extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.takePicture !== prevProps.takePicture && this.props.takePicture) {
            this.takePicture();
        }
    }

    takePicture = () => {
        if (this.camera) {
            const options = { quality: 1, base64: true };
            this.camera.takePictureAsync(options)
                .then(response => {
                    if(response.base64){
                        this.props.setImage(response)
                    }else{
                        throw 'photo error'
                    }

                })
                .catch(error => {
                    this.props.setImage({
                        text: error
                    })

                })
        }
    };

    render() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                captureAudio={false}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
            />
        );

    }

}
