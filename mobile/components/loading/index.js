import React from 'react';

import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { mainThemeColors } from './../../globals/colors';
import { mainThemeFonts } from './../../globals/fonts';


const Loading = ( {loading} ) => {
    

    return(
        loading.state && 
        <View style={styles.container}>
            <ActivityIndicator size="large" color={mainThemeColors.neonpurple} />
           <Text style={styles.message}>{loading.text ?  loading.text : 'loading'}</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "black",
        opacity: 0.5,
    },
    message: {
        fontFamily: mainThemeFonts.family.quicksand('Bold'),
        fontSize: 30,
        color: mainThemeColors.neonpurple
    }
});


export default Loading;