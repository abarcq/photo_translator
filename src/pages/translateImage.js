import { isNil } from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Camera from '../components/camera';
import contentVision from '../services/contentVision';
import translate from '../services/translate';
import { styles } from '../styles/cameraStyle';


async function extractAndTraduct(value){
  let response = false;
  try{
    const {local, text} = await contentVision(value)
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

  const [value, setValue] = useState({
    text: '',
  });

  useEffect( () => {
    if (value.base64 && !value.text) {
      extractAndTraduct(value.base64)
        .then(textTranslate=>{
          setValue({
            ...value,
            text: textTranslate
          })
        })
    }
  });


  return (
    <View style={styles.container}>
      <Camera setValue={(value) => setValue(value)} takePicture={isNil(value.text)} />
      <View style={styles.bottom}>
        <View>
          <Text style={styles.informations}> {value.text} </Text>
        </View>
        <TouchableOpacity onPress={() => setValue({ text: null })} style={styles.capture}>
          {!isNil(value.text) ?
            <Text style={{ fontSize: 14 }}> SNAP </Text>
            :
            <Text style={{ fontSize: 14 }}> LOADING </Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );


}