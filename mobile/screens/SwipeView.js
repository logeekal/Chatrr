import React, { useState, useContext } from 'react';

import { ScrollView, Image, Text} from 'react-native';
import ChatList from './ChatList';
import RoomList from './RoomList';
import { AppContext } from './../state/context/AppContext';


const SwipeView = () => {

    const { state, actions } = useContext(AppContext);

    console.log(`Printing the state in Main App now : `);
    console.log(state);
    return (
        <ScrollView
            horizontal
            pagingEnabled
        >
            <ChatList />
            <RoomList />
        </ScrollView>
    )
}


export default SwipeView;
