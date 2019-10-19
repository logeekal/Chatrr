import React from 'react';
import {View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Main from './screens/Main';
import MainAppStack from './MainAppStack';
import AppStateProvider from './state/context/AppContext';

const MainNavigator = createSwitchNavigator(
  {
    Login: Main,
    MainApp: MainAppStack,
  },
  {
    initialRouteName: 'Login',
  },
);

const App = createAppContainer(MainNavigator);



export default () => {
  return (
    <AppStateProvider>
      <App />
    </AppStateProvider>
  )
};
