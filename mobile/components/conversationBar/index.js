/**
 * 
 * 
 */
import { View, Text } from 'react-native';
import React from 'react';
import  styled  from 'styled-components/native';
import { getScreenDims } from './../../globals/helpers/dimensions';
import Avatar from '../avatar';
import { StyleSheet } from 'react-native';
import NotificationTicker from './../notificationTicker/index';
import { mainThemeFonts } from './../../globals/fonts';
import { mainThemeColors } from './../../globals/colors';
import { useState } from 'react';
import { useEffect } from 'react';



const ConversationBarView =  styled.View`
    height: 90;
    width: ${getScreenDims().sw*0.98 }; 
    /* border: 1px solid black; */
    display: flex;
    flex-direction: row;
`


const ConversationBar = ({navigation, latestMessage, avatar, userName}) => {

    const tempMessage = {
        read: true
    }

    const bold = mainThemeFonts.family.quicksand('Bold');
    const medium = mainThemeFonts.family.quicksand('Medium');
    const [messageFontFamily, setMessageFontFamily] = useState(bold);

    useEffect(()=> {
        if (!tempMessage.read) {
            setMessageFontFamily(bold+"")
        }else{
            setMessageFontFamily(medium+'')
        }
    })


    return <ConversationBarView >
        <View style={[styles.avatarContainer]}>
                <Avatar image={23} width={60} />
        </View>
        
        <View style={styles.mainContainer}>
            <Text style={{...styles.name, fontFamily: messageFontFamily}}>
                Andrew Zemeski
            </Text>
            <Text style={{...styles.message,  fontFamily: messageFontFamily}}>
            I have started from here. See you in 4 hrs. In bus right now xoxo
            </Text>
        </View>
        {
            !tempMessage.read && ( <View style={styles.notifCountContainer}>
                <NotificationTicker />
            </View>)
        }
       
    </ConversationBarView>
}


const styles =  StyleSheet.create({
    conversationBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "red"
    },
    avatarContainer: {
        flex: 0.20,
        display: "flex",
        justifyContent: "center",
        borderWidth: 0,
        borderColor: "blue",
    },
    mainContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flex: 0.7,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 0,
        borderColor: "cyan",
        marginRight: 5,

    },
    notifCountContainer: {
        flex: 0.1,
        borderWidth: 0,
        justifyContent: "center",
        borderColor: "green",
    },
    name: {
        
        fontSize: 20,
        color: mainThemeColors.darkpurple
    },
    message: {
        
        fontSize: 14,
        color: mainThemeColors.darkpurple
    }
})

export default ConversationBar;