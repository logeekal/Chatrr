import React from 'react';
import {StyleSheet} from 'react-native';
import  LinearGradient from 'react-native-linear-gradient';
import { mainThemeColors } from '../globals/colors';


const MainBG = ({children}) =>{

    return <LinearGradient
      colors={[
          mainThemeColors.darkpurple,
          mainThemeColors.lightpurple
        ]}
        useAngle={true}
        angle={180}
        angleCenter={{x:0.5,y:0.5}}
        style={{
          ...StyleSheet.absoluteFillObject
        }}
      >
          {children}
    </LinearGradient>
}


export default MainBG;