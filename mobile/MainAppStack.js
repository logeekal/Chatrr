import React from 'react';
import { View } from 'react-native';
import Main from './screens/Main';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RoomList from './screens/RoomList';
import SwipeView from './screens/SwipeView';
import Conversations from './screens/Conversations';



const AppNavigator = createStackNavigator({
    RoomList: RoomList,
    SwipeView: SwipeView,
    Conversations: Conversations
}, {
    initialRouteName: 'SwipeView',
    headerMode: 'none',
    navigationOptions: {
        headerMode: 'none',
        headerVisible: false,
    }
});


const MainAppStack = createAppContainer(AppNavigator);


// const App = () => {
//   return (
//       <Main />
//   );
// };

export default MainAppStack;
