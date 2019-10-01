import React, { useState } from 'react';
import { View } from 'react-native';

export const Separater = ({height, width, border}) => {
    let style = {}



    if(height) {
        style  = {...style, height: height};
    };

    if(width) {
        style = {...style, width: width};
    };

    if(border){
        style = {
            ...style,
            borderWidth: 1,
            borderColor: "white"
        };
    };

    return <View
        style={{...style}}
    >

    </View>

}