import React from 'react';
import { View } from 'react-native';
import Main from './screens/Main';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RoomList from './screens/RoomList';
import SwipeView from './screens/SwipeView';
import Conversations from './screens/Conversations';



const MainNavigator = createStackNavigator({
  Main: Main,
  RoomList: RoomList,
  SwipeView: SwipeView,
  Conversations: Conversations
},{
  headerMode: 'none',
  navigationOptions:{
    headerMode: 'none',
    headerVisible: false,
  }
});


MainNavigator

const App = createAppContainer(MainNavigator);


// const App = () => {
//   return (
//       <Main />
//   );
// };

export default App;
