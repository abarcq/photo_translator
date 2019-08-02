import { isNil } from 'lodash';
import React, { Component } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Camera from '../components/Camera';
import contentVision from '../services/ContentVision';
import translate from '../services/Translate';
import { styles } from '../styles/cameraStyle';

class TranslateImage extends Component {

  state = {
    image: {
      base64: '',
      text: '',
    },
  }

  useEffect = (image) => {
    if (image.base64 && !image.text) {
      this.extractAndTraduct(image.base64)
        .then(textTranslate => {
          this.setState(
            {
              image: {
                ...image,
                text: textTranslate
              }
            })
        })
    }
  }

  extractAndTraduct = async (image) => {
    let response = false;
    try {
      const { local, text } = await contentVision(image)
      const textTranslate = await translate(text, local)
      response = textTranslate
    }
    catch (error) {
      console.log(error);
      response = 'erreur traduction'
    }
    finally {
      return response;
    }
  }

  render() {
    const { image } = this.state
    return (
      <View style={styles.container}>
        {this.props.isFocused &&
          <Camera setImage={(image) => this.useEffect(image)} takePicture={isNil(image.text)}/>
        }
        <View style={styles.bottom}>
          <View>
            <Text style={styles.informations}> {image.text} </Text>
          </View>
          <TouchableOpacity onPress={() => this.setState({ image: { text: null } })} style={styles.capture}>
            {!isNil(image.text) ?
              <Text style={{ fontSize: 14 }}> SNAP </Text>
              :
              <Text style={{ fontSize: 14 }}> LOADING </Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

export default withNavigationFocus(TranslateImage);