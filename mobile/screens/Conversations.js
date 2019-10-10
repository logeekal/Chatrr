import React from 'react';
import { View, Text } from 'react-native';
import { Separater } from '../components/misc';
import GenericHeader from '../components/header/GenericHeader';
import SendBar from './../components/sendbar/SendBar';
import ChatBubble from '../components/bubble/ChatBubble';



const Conversations = () => {

    


    return <View>
        <View>
            <GenericHeader>
        
            </GenericHeader>
        </View>
        <View>
            <View>

            </View>
            <View 
            style={{marginTop: 30}}
            >
            <SendBar />
        </View>
            <ChatBubble type="left" />
            <ChatBubble type="right" />
        </View>
       
    </View>
}




export default Conversations;