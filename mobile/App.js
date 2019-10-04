import React from 'react';
import { View } from 'react-native';
import Main from './screens/Main';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';



const MainNavigator = createStackNavigator({
  Main: Main,
});

const App = createAppContainer(MainNavigator);


// const App = () => {
//   return (
//       <Main />
//   );
// };

export default App;
