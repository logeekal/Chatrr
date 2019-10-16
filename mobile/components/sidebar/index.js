import React from 'react';
import { styled } from 'styled-components/native';
import { mainThemeColors } from './../../globals/colors';
import { BorderShadow } from 'react-native-shadow';


// const SideBarView = styled.View`
//     background-color: ${mainThemeColors.palepurple};
// `

const SideBar = ({children}) => {
    const shadowProps = {
        width: "100%",
        inset: true,
        color: "black",
        border: 20,
        opacity: 0.5,
        style:{}
    };

    return <BorderShadow
        setting={shadowProps}
    >
        {children}
    </BorderShadow>
}

export default SideBar;