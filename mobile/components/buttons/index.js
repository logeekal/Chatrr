import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { mainThemeColors } from './../../globals/colors';
import { mainThemeFonts } from '../../globals/fonts';
import { BoxShadow } from 'react-native-shadow';

/**
 * 
 * @param {function} param0 
 */
const SubmitButton = ({onPress, buttonTheme, width, height, textSize, text, radius}) => {
    
    const buttonBGColor = buttonTheme === 'light' ? mainThemeColors.light :  mainThemeColors.lightneonpurple;
    const shadowColor = buttonTheme === 'light' ? mainThemeColors.neonpurple :  "#000";

    const [shadowOpts, setShadowOpts]= useState({
        width: width,
        height: height,
        color: shadowColor,
        radius: radius ,
        opacity: 0.5,
        x: 0,
        y: 15,
        style: {
            marginVertical: 5
        }
    });

    console.log(shadowOpts)

    const styles = {
        mainButton: {
            width: width,
            height: height,
            backgroundColor: buttonBGColor,
            borderRadius: radius ,
            shadowColor: shadowColor,
            // shadowColor: "black",
            shadowRadius: 10,
            shadowOpacity: 1,
            shadowOffset: {
                width: 1,
                height: 4,
            },
            marginVertical: 10,
            elevation: 10,
            alignItems: 'center',
        },
    
        label: {
            fontSize: textSize,
            fontFamily: mainThemeFonts.family.quicksand('Bold'),
            color: buttonTheme == 'light' ? mainThemeColors.lightpurple : mainThemeColors.light,
            marginTop: 5,
        },
    };
    

    return (
        <BoxShadow setting={shadowOpts}>
            <TouchableOpacity
                style={styles.mainButton}
                onPressIn={()=>{
                    setShadowOpts({
                        ...shadowOpts,
                        opacity: 0.01
                    })
                }}
                onPressOut={()=>{
                    setShadowOpts({
                        ...shadowOpts,
                        opacity: 0.5
                    })
                }}
                onPress={onPress}
                >
                <Text style={styles.label}>{text}</Text>
            </TouchableOpacity>
        </BoxShadow>
    );
};



export default SubmitButton;
