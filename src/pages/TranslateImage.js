import { isNil } from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Camera from '../components/Camera';
import contentVision from '../services/ContentVision';
import translate from '../services/Translate';
import { styles } from '../styles/cameraStyle';


async function extractAndTraduct(image){
  let response = false;
  try{
    const {local, text} = await contentVision(image)
    const textTranslate = await translate(text, local)
    response = textTranslate
  }
  catch(error){
      console.log(error);
      response = 'erreur traduction'
    }
  finally{
    return response;
  }
}

export default function TranslateImage() {

  const [image, setImage] = useState({
    base64: '',
    text: '',
  });

  useEffect( () => {
    if (image.base64 && !image.text) {
      extractAndTraduct(image.base64)
        .then(textTranslate=>{
          setImage({
            ...image,
            text: textTranslate
          })
        })
    }
  });


  return (
    <View style={styles.container}>
      <Camera setImage={(image) => setImage(image)} takePicture={isNil(image.text)} />
      <View style={styles.bottom}>
        <View>
          <Text style={styles.informations}> {image.text} </Text>
        </View>
        <TouchableOpacity onPress={() => setImage({ text: null })} style={styles.capture}>
          {!isNil(image.text) ?
            <Text style={{ fontSize: 14 }}> SNAP </Text>
            :
            <Text style={{ fontSize: 14 }}> LOADING </Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );


}