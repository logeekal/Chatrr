import React from 'react'
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { mainThemeColors } from '../../globals/colors';
import { getScreenDims } from './../../globals/helpers/dimensions';
import { mainThemeFonts } from './../../globals/fonts';
import Avatar from '../avatar';


const ChatBubbleView = styled.View`
    background-color: ${props => props.type == 'left' ? mainThemeColors.palepurple : mainThemeColors.lightpurple};
    width: 80%;
    padding-top: 5;   
    padding-bottom: 10;
    padding-right: 5;
    padding-left: 10;
    margin-left: 5;
    margin-right: 5;
    margin-top: 20;
    padding-right: 25;
    padding-left: 25;
    padding-top: 15;
    padding-bottom: 5;
    border-top-right-radius: 50;
    border-top-left-radius: 50;
    border-bottom-left-radius: ${props => props.type == 'left' ? 0 : 50};
    border-bottom-right-radius: ${props => props.type == 'left' ? 50 : 0};
    justify-content: space-between;
`

const ChatBubble = ( {type, conversation} ) => {


    return <View
        style={{
            flexDirection: type == 'left'? "row" : "row-reverse",
            justifyContent: "center",
            alignItems: "flex-end",
        }}
    >
    <Avatar image={23} width={40} />

    <ChatBubbleView type={type}> 
        <Text
            style={{
                fontFamily: mainThemeFonts.family.quicksand('Medium'),
                fontSize: 18,
                color: type == 'left'? mainThemeColors.darkpurple : mainThemeColors.light,
            }}
        >
        {conversation.text}
    
        </Text> 

        <Text
            style={{marginTop: 5,  fontFamily: mainThemeFonts.family.quicksand('Bold'),
            alignSelf: type == "left" ? "flex-start" : 'flex-end',
            fontSize: 18,
            color: type == 'left'? mainThemeColors.darkpurple : mainThemeColors.light,}}
        >{conversation.createdAt}</Text>    
    </ChatBubbleView>

        
</View>

}


export default ChatBubble;