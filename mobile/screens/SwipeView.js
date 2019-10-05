import React, { useState } from 'react';

import { ScrollView, Image, Text} from 'react-native';
import ChatList from './ChatList';
import RoomList from './RoomList';


const SwipeView = () => {

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
