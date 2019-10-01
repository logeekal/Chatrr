import React from 'react';
import { TextInput} from 'react-native';
import styled from 'styled-components/native';
import { mainThemeFonts } from './../../globals/fonts';
import { mainThemeColors } from './../../globals/colors';


export const  FormTextField = styled.TextInput`
    font-family: "${mainThemeFonts.input.family}-Light";
    padding-bottom: 5;
    margin-top: 5;
    margin-bottom: 5;
    font-size: ${mainThemeFonts.input.size};
    border-bottom-width: 2;
    border-bottom-color: ${props => props.isFocused ? 
        mainThemeColors.font.text["input-focus"] : 
        mainThemeColors.font.text["input-nofocus"]};
    color: ${props => props.isFocused ? mainThemeColors.font.text["input-focus"] : mainThemeColors.font.text["input-nofocus"]}
`


