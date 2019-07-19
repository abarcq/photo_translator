/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import Camera from './src/camera';

export default function App() {

  const [uri, setUri] = useState('');

    return (
      <View style={styles.container}>
        <Camera setUri={(value)=>setUri(value)} uri={uri} takePicture={typeof uri === 'string'}/>
        <View style={{ flex: 0, flexDirection: 'column', justifyContent: 'center',  }}>
          <View>
            <Text style={{ fontSize: 14, color: '#FFFFFF' }}> {uri} </Text>
          </View>
          <TouchableOpacity onPress={()=>setUri(false)} style={styles.capture}>
            {typeof uri === 'string' ?
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              :
                <Text style={{ fontSize: 14 }}> LOADING </Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
