import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { getScreenDims } from './../../globals/helpers/dimensions';
import { mainThemeColors } from './../../globals/colors';
import { mainThemeFonts } from '../../globals/fonts';


const RoomThumnailView =  styled.View`
    width: ${(getScreenDims().sw * 0.85)};
    border-radius: 10;
    height: 100;
    
    /* border: 1px solid black; */
    margin: 20px;

`

const RoomThumnail = ({image, name}) => {
    
    return (
        <RoomThumnailView style={styles.imageContainer}>
            <Image
             source={image}
             style={[StyleSheet.absoluteFillObject,{
                ...styles.imageBG
             }]}

             />
            <Text 
                style={
                    styles.label
                }
            >
                {name}
            </Text>
        </RoomThumnailView>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        display: "flex",
        backgroundColor: "#000",
        borderRadius: 10,
        justifyContent: "flex-end"
    },

    imageBG: {
        width: '100%', 
        height: '100%',
        borderRadius: 10,
        opacity: 0.5
    },
    label:{
        alignSelf: "center",
        color: mainThemeColors.light,
        fontFamily: mainThemeFonts.family.quicksand('Bold'),
        fontSize: 36,
        padding: 5
    }


    })





export default RoomThumnail;

