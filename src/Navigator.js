import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import TranslateImage from './pages/TranslateImage';
import SettingsScreen from './pages/Settings';

const AppNavigator = createBottomTabNavigator({
    Home: {
      screen: TranslateImage,
      navigationOptions: () => ({
        headerStyle: {
            display: 'none'
        }
      }),
    },
    Settings: SettingsScreen,
  });
  
  export default createAppContainer(AppNavigator);