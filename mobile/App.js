import React from 'react';
import {View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Main from './screens/Main';
import MainAppStack from './MainAppStack';
import AppStateProvider from './state/context/AppContext';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './utils/apollo/index';

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
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </AppStateProvider>
  )
};
