import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import styled  from 'styled-components/native';
import { mainThemeColors } from './../../globals/colors';
import { mainThemeFonts } from './../../globals/fonts';



const NotificationTickerView = styled.View`
    background-color: ${mainThemeColors.darkpurple};
    border-radius: 50;
    width: 25;
    height: 25;
    justify-content: center;
    align-items: center;
`;



const NotificationTicker = ({count}) => {
    const counter = 52
    return <NotificationTickerView >
        <Text
            style={styles.ticker}
        >{counter}</Text>
    </NotificationTickerView>
}


const styles = {
    ticker:{
        fontFamily: mainThemeFonts.family.roboto('Bold'), 
        fontSize: 15, 
        color: mainThemeColors.light,
        alignSelf: "center",
    }
}


export default NotificationTicker;
