import React from 'react';

import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { Separater } from '../misc';
import { BoxShadow } from 'react-native-shadow';
import { getScreenDims } from './../../globals/helpers/dimensions';
import { mainThemeColors } from './../../globals/colors';
import Avatar from './../avatar/index';
import Menu from './../menu/index';


const GenericHeader = ({ children }) => {

    const height = 80;
    const width = getScreenDims().sw

    const shadowOpts = {
        width: width,
        height: height,
        color: '#000',
        border: 1,
        radius: 0,
        opacity: 0.2,
        x: 0,
        y: StatusBar.currentHeight + 2,
        style: { top: 0 }
    }


    return <BoxShadow
        setting={shadowOpts}
    >
        <Separater
            height={height}
            border={false}
            style={styles.header}
        >
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>

                
                <Image
                    source={require('../../assets/icons/back.png')}
                    style={styles.image}
                />
                </View>
                <View style={styles.headerMain}>
                    <Avatar image={23} width={30} mode={'full'} />
                </View>
                <View style={styles.headerRight}>
                    <Menu 
                        
                    />
                </View>
            </View>
        </Separater>
    </BoxShadow>
}


const styles = StyleSheet.create({
    header: {
        top: StatusBar.currentHeight,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 3,
        // borderColor: "blue",
        // borderWidth: 2,
        backgroundColor: mainThemeColors.light
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        top: 5,
        borderWidth: 0
    },
    headerLeft: {
        flex: 0.15,
        height: 50,
        borderWidth: 0
    },
    image:{
        width: null,
        height: null,
        resizeMode: "contain",
        flex: 1
    },  
    headerMain: {
        flex: 0.7,
        borderWidth: 0
    },
    headerRight: {
        flex: 0.15,
        marginRight: 10,
        borderWidth: 0,
        height: '100%',
        justifyContent: "center",
        alignItems: "flex-end"
    }
})

export default GenericHeader;