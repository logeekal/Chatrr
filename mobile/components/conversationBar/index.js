/**
 * 
 * 
 */
import { View, Text } from 'react-native';
import React from 'react';
import  styled  from 'styled-components/native';
import { getScreenDims } from './../../globals/helpers/dimensions';
import Avatar from '../avatar';



const ConversationBarView =  styled.View`
    height: 90;
    width: ${getScreenDims().sw * 0.9}; 
    border: 1px solid black;
   
`



const ConversationBar = ({navigation, latestMessage, avatar, userName}) => {

    return <ConversationBarView>
        <Avatar image={23} width={2} radius={2} />
    </ConversationBarView>
}

export default ConversationBar;