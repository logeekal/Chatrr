import React from 'react';

import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { mainThemeColors } from './../../globals/colors';
import { mainThemeFonts } from './../../globals/fonts';


const Avatar = ({width, shape, image, profile, mode}) => {
    //mode can be text, picture or both

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
    console.log(`mode is ${mode}`);
    return <View style={styles.container}>
        {
            (mode == 'image' || mode == 'both' ) &&
            <Image 
            source={image} 
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

        }
        
            {
                (mode == 'text' || mode == 'both') && 
                <Text 
                    style={{
                        ...styles.text,
                        fontSize: mode === 'text' ? 30 :  20

                    }}
                >
                    {handleUserName(profile.name)}
                </Text>
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