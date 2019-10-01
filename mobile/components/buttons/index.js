import React, { useState } from 'react';

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

const SubmitButton = () => {


    const [shadowOpts, setShadowOpts]= useState({
        width: 206,
        height: 73,
        color: '#F907D2',
        radius: 35,
        opacity: 0.5,
        x: 0,
        y: 15,
        style: {
            marginVertical: 5
        }
    });



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
                >
                <Text style={styles.label}>Starts</Text>
            </TouchableOpacity>
        </BoxShadow>
    );
};

const styles = StyleSheet.create({
    mainButton: {
        width: 206,
        height: 73,
        backgroundColor: mainThemeColors.light,
        borderRadius: 35,
        shadowColor: '#F907D2',
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
        fontSize: 36,
        fontFamily: mainThemeFonts.family.quicksand('Bold'),
        color: mainThemeColors.lightpurple,
        marginTop: 5,
    },
});

export default SubmitButton;
