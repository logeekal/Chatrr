import React from 'react';

import { View, Animated } from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { mainThemeColors } from '../../globals/colors';


const SwipableScreen = ({children}) => {
    const renderRightActions = (progress, dragX) => {
        console.log('Rendering right actions');
        const scale = dragX.interpolate({
            inputRange:[0,20],
            outputRange:[1,0],

        });
        
        return <Animated.View
            style={[
                {
                    backgroundColor: mainThemeColors.palepurple,
                    width: "20%"
                },
                
              {
                  transform:['scaleX(scale)']
              }
            ]}
        >
        </Animated.View>
    }

    return (<Swipeable
        friction={3}
        leftThreshold={80}
        rightThreshold={80}
        renderRightActions={renderRightActions}
        childrenContainerStyle={{
            width:"auto"
        }}
    >
        {children}   
    </Swipeable>)
}

export default SwipableScreen;