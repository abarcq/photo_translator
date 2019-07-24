import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import TranslateImage from './pages/TranslateImage';

class DetailsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Details Screen</Text>
        </View>
      );
    }
  }

const AppNavigator = createStackNavigator({
    Home: {
      screen: TranslateImage,
      navigationOptions: () => ({
        headerStyle: {
            display: 'none'
        }
      }),
    }
  });
  
  export default createAppContainer(AppNavigator);