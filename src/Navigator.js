import { createStackNavigator, createAppContainer } from "react-navigation";

import TranslateImage from './pages/TranslateImage';

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