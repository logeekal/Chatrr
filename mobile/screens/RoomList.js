import React, { useState, useContext } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { mainThemeFonts } from '../globals/fonts';
import RoomListHeader from './../components/header/RoomListHeader';
import RoomThumnail from '../components/RoomThumbnail';
import { ScrollView } from 'react-native-gesture-handler';
import ConversationBar from '../components/conversationBar';
import Loading from '../components/loading';
import { AppContext } from '../state/context/AppContext';

const RoomList = ( {navigation} ) => {

    const [roomList, setRoomList] = useState([{
        name: 'Family1',
        image: require('../assets/images/couple.jpg')
    },{
        name: 'Family2',
        image: require('../assets/images/couple.jpg')
    },{
        name: 'Family3',
        image: require('../assets/images/couple.jpg')
    },{
        name: 'Family4',
        image: require('../assets/images/couple.jpg')
    },{
        name: 'Family5',
        image: require('../assets/images/couple.jpg')
    },{
        name: 'Family6',
        image: require('../assets/images/couple.jpg')
    },{
        name: 'Family7',
        image: require('../assets/images/couple.jpg')
    }]);


    const {state, actions} = useContext(AppContext);
    console.log(`Printing State in roomList : ${JSON.stringify(state)}`)


    return <View style={styles.screen}>
        <Loading loading={state.misc.loading} />
       <RoomListHeader menu={['Rooms','Chats']} />
       <ScrollView
            alwaysBounceHorizontal
            horizontal
            pagingEnabled

       >
        <View style={styles.roomList}>
            <FlatList
                data={roomList}
                keyExtractor={ (item) => {
                    return item.name
                }}
                renderItem={({item}) => {
                    return <RoomThumnail name={item.name} image={item.image} />
                }}
                showsVerticalScrollIndicator={false}
                
            />
                
        </View>
        <View style={styles.roomList}>
            <TouchableOpacity 
                onPress={()=> {
                    navigation.navigate('Conversations')
                }}
            >
                <ConversationBar />
            </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
}


const styles =  StyleSheet.create({
    screen:{
        display: "flex",
        top:20
    },

    roomList: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    }
   
})



export default RoomList;