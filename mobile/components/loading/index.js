import React from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { mainThemeColors } from './../../globals/colors';


const Loading = ( {loading} ) => {
    

    return(
        loading.state && 
        <View style={styles.container}>
            <ActivityIndicator size="large" color={mainThemeColors.neonpurple} />
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
    }
});


export default Loading;