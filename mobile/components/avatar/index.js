import React from 'react';

import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { mainThemeColors } from './../../globals/colors';


const Avatar = ({width, shape, image}) => {

    let _width = 60;
    let _radius = 50;
    const _image = require('../../assets/images/32.jpg');

    return <Image 
            source={_image} 
            style={[
                StyleSheet.absoluteFillObject,{
                    width: _width,
                    borderRadius: _radius,
                    height: _width,
                    borderWidth: 3,
                    borderColor: mainThemeColors.darkpurple
                }
            ]}
            />
}



const styles = StyleSheet.create({

});


export default Avatar;