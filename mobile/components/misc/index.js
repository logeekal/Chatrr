import React, { useState } from 'react';
import { View } from 'react-native';

export const Separater = ({height, width, border, children, style}) => {
    let currentStyle = {}

    if(height) {
        currentStyle  = {...currentStyle, height: height};
    };

    if(width) {
        currentStyle = {...currentStyle, width: width};
    };

    if(border){
        currentStyle = {
            ...currentStyle,
            borderWidth: 1,
            borderColor: "red"
        };
    };

    return <View
        style={{...currentStyle, ...style}}
    >
        {children}
    </View>

}