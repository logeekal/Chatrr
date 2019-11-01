import React, { useState, useContext, useEffect } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { mainThemeFonts } from '../globals/fonts';
import RoomListHeader from './../components/header/RoomListHeader';
import RoomThumnail from '../components/RoomThumbnail';
import { ScrollView } from 'react-native-gesture-handler';
import ConversationBar from '../components/conversationBar';
import Loading from '../components/loading';
import { AppContext } from '../state/context/AppContext';
import { ALL_ROOMS } from './../utils/apollo/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getScreenDims } from './../globals/helpers/dimensions';
import { getImage } from './../globals/helpers/ImageLocator';
import { MUTATION_JOIN_ROOM } from '../utils/apollo/mutations';

const RoomList = ( {navigation} ) => {

    // const [roomList, setRoomList] = useState([{
    //     name: 'Family1',
    //     image: require('../assets/images/couple.jpg')
    // },{
    //     name: 'Family2',
    //     image: require('../assets/images/couple.jpg')
    // },{
    //     name: 'Family3',
    //     image: require('../assets/images/couple.jpg')
    // },{
    //     name: 'Family4',
    //     image: require('../assets/images/couple.jpg')
    // },{
    //     name: 'Family5',
    //     image: require('../assets/images/couple.jpg')
    // },{
    //     name: 'Family6',
    //     image: require('../assets/images/couple.jpg')
    // },{
    //     name: 'Family7',
    //     image: require('../assets/images/couple.jpg')
    // }]);

    const {state, actions} = useContext(AppContext);
    const [transformedData, setTransformedData] = useState(false)
    console.log(`Printing State in roomList : ${JSON.stringify(state)}`)

    let {loading, error, data } = useQuery(ALL_ROOMS,{
        onCompleted: (data)=>{
            actions.saveRooms(data.rooms)
        }
    });


    if( loading ) {
        return <Loading loading={{state: true, text: "Getting all rooms..."}} />
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
                data={state.orderedRoomIds}
                keyExtractor={ (item) => {
                    return item
                }}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={ () => {
                                navigation.navigate('Conversations', {
                                     type: 'room',
                                   roomId: state.allRooms[item].id
                                    });
                                }                                
                            }
                        >
                            <RoomThumnail name={state.allRooms[item].name} image={getImage(state.allRooms[item].avatar)} />
                        </TouchableOpacity>
                    )
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