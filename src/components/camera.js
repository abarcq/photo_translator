import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';


import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.takePicture !== prevProps.takePicture && this.props.takePicture) {
            this.takePicture();
        }
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.props.setValue(data)
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
                permissionDialogTitle={"Permission to use camera"}
                permissionDialogMessage={
                    "We need your permission to use your camera phone"
                }
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.log(barcodes)
                }}
                captureAudio={false}
            />
        );

    }

}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});
