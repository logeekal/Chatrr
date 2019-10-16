import React from 'react';

import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { mainThemeColors } from './../../globals/colors';
import { mainThemeFonts } from './../../globals/fonts';


const Avatar = ({width, shape, image, profile, mode}) => {

    let _width = width;
    let _radius = 50;
    const _image = require('../../assets/images/32.jpg');
    let _profile = {
        name: 'HibiscusOlayOlay'
    }

    const handleUserName = ( name ) => {
        if (name.length > 15) {
            return name.substring(0, 12)+ '...'
        }else{
            return name
        }
    } 

    return <View style={styles.container}>
        <Image 
            source={_image} 
            style={[
                // StyleSheet.absoluteFillObject,
                {
                    width: _width,
                    borderRadius: _radius,
                    height: _width,
                    borderWidth: 3,
                    borderColor: mainThemeColors.darkpurple
                }
            ]}
            />
            {
                mode == 'full' && <Text style={styles.text}>{handleUserName(_profile.name)}</Text>
            }
        </View>

           
}



const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontFamily: mainThemeFonts.family.quicksand('Bold'),
        fontSize:  20
    }
});


export default Avatar;