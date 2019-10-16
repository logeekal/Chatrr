import React, {useState} from 'react';
import  styled  from 'styled-components/native';
import { View, Image, StyleSheet, Text,  } from 'react-native';
import { mainThemeColors } from './../../globals/colors';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { mainThemeFonts } from './../../globals/fonts';


const SendBarView =  styled.View`
    background-color: ${mainThemeColors.palepurple};
    border-radius: 30;
    height: 60;
    display: flex;
    flex-direction: row;
    margin-top: 5;
    margin-left:5;
    margin-right:5;
    margin-bottom: 0;
`

const customBorderWidth = 0;

const SendBar = ({ onSend }) => {
    const [message, setMessage] = useState('');


    return <SendBarView>
            <View style={styles.attachment}>
                <TouchableOpacity>
                    <Entypo name="attachment" size={25} style={styles.attachIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.text}>
                <TextInput 
                    style={styles.textInput}
                    multiline={true}
                    autoCapitalize={"sentences"}
                    autoCorrect={true}
                    autoCompleteType={"off"}
                    value={message}
                    onChangeText={value=> {
                        setMessage(value)
                    }}
                />
            </View>
            <View style={styles.send}>
                <TouchableOpacity
                    onPress={()=> {
                        onSend(message);
                        setMessage('');
                        
                    }}
                >
                <Image 
                    source={require('../../assets/images/send.png')}
                />
                </TouchableOpacity>
            </View>
        </SendBarView>

}


const styles = StyleSheet.create({
    attachment: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        borderWidth: customBorderWidth,
        borderColor: "black"
    },

    attachIcon: {
        opacity: 0.7,
        color: mainThemeColors.darkpurple
    },
    text:{
        flex: 0.78,
        borderWidth: customBorderWidth,
        borderColor: "black",
        
    },
    textInput: {
        padding: 5,
        fontFamily: mainThemeFonts.family.quicksand('Medium'),
        fontSize: 20,
    },
    send: {
        flex: 0.12,
        justifyContent: "center",
        alignItems: "flex-end",
        marginRight: 5,
        borderWidth: customBorderWidth,
        borderColor: "black"
    }
    
});



export default SendBar;