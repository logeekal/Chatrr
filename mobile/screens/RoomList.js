import React, { useState, useContext } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { mainThemeFonts } from '../globals/fonts';
import RoomListHeader from './../components/header/RoomListHeader';
import RoomThumnail from '../components/RoomThumbnail';
import { ScrollView } from 'react-native-gesture-handler';
import ConversationBar from '../components/conversationBar';
import Loading from '../components/loading';
import { AppContext } from '../state/context/AppContext';
import { ALL_ROOMS } from './../utils/apollo/queries';
import { useQuery } from '@apollo/react-hooks';

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
    const [transformedData, setTransformedData] = useState(false)
    console.log(`Printing State in roomList : ${JSON.stringify(state)}`)

    const {loading, error, data } = useQuery(ALL_ROOMS);

    if( loading ) {
        return <Loading loading={{state: true, text: "Getting all rooms..."}} />
    }

    //Generating  image path statically
    const getImage = (image) => {
        let imageName = image.split('.')[0].toLowerCase();
        console.log(`Fetching image : ${imageName}`);
        switch(imageName){
            case 'delhi':
                return require('../assets/images/delhi.jpg');
            case 'mumbai':
                return require('../assets/images/mumbai.jpg');
            case 'couple' : 
                return require('../assets/images/couple.jpg');
            default:
                return require('../assets/images/couple.jpg'); 
        }
    }




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
                data={data.rooms}
                keyExtractor={ (item) => {
                    return item.name
                }}
                renderItem={({item}) => {
                    return <RoomThumnail name={item.name} image={getImage(item.avatar)} />
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
        bottom: 0,
    }
   
})



export default RoomList;