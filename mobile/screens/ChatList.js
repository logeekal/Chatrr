import React, { useState } from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';
import { mainThemeFonts } from '../globals/fonts';
import RoomListHeader from '../components/header/RoomListHeader';
import RoomThumnail from '../components/RoomThumbnail';
import ConversationBar from '../components/conversationBar';

const ChatList = ( ) => {

    


    return <View style={styles.screen}>
            <RoomListHeader menu={['Chats','Rooms']} />
       <ConversationBar />
    </View>
}


const styles =  StyleSheet.create({
    screen:{
        display: "flex",
        top:200
    },

    roomList: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    }
   
})



export default ChatList;