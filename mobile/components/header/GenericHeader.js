import React from 'react';

import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Separater } from '../misc';
import { BoxShadow } from 'react-native-shadow';
import { getScreenDims } from './../../globals/helpers/dimensions';
import { mainThemeColors } from './../../globals/colors';


const GenericHeader = ({children}) => {

    const height = 80;
    const width = getScreenDims().sw

    const shadowOpts = {
        width: width,
        height: height,
        color: '#000',
        border: 1,
        radius: 0,
        opacity: 0.1,
        x: 0,
        y: 3.5,
        style: {top:StatusBar.currentHeight}
    }


    return <BoxShadow
            setting={shadowOpts}
        >
            <Separater
        height={height}
        border={false}
        style={styles.header}
    >
        {children}
    </Separater>
    </BoxShadow>
}


const styles = StyleSheet.create({
    header: {
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 3,
        backgroundColor: mainThemeColors.light
    }
})

export default GenericHeader;