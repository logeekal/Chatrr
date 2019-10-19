import React, {useRef, useState} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {mainThemeColors} from './../../globals/colors';
import { mainThemeFonts } from './../../globals/fonts';

const TextSwitchToggle = ({setGender}) => {
  const toggleRef = useRef(null);
  const [toggle, setToggle] = useState({
    style: {
      alignSelf: 'flex-end',
    },
    value: 'Female',
  });

  const handleSwitch = () => {
    if (toggle.style.alignSelf == 'flex-start') {
      setToggle({
        ...toggle,
        style: {
          alignSelf: 'flex-end',
        },
        value: 'Female',
      });

      setGender('F')
    } else {
      setToggle({
        ...toggle,
        style: {
          alignSelf: 'flex-start',
        },
        value: 'Male',
      });
      setGender('M')
    }
  };

  return (
    <TouchableOpacity onPress={handleSwitch}>
      <View
        style={{
          ...styles.container,
          flexDirection:
            toggle.style.alignSelf === 'flex-start' ? 'row-reverse' : 'row',
        }}>
        <Text style={styles.label}>{toggle.value}</Text>
        <View style={styles.outer}>
          <View
            style={{...styles.inner, alignSelf: toggle.style.alignSelf}}
            ref={toggleRef}></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'space-between',
    // borderWidth: 1,
    borderColor: "white",
    width: 250
  },
  label: {
    color: mainThemeColors.font.text['input-focus'],
    fontFamily: mainThemeFonts.family.roboto('Regular'),
    fontSize: 30
  },
  outer: {
    width: 67,
    height: 33,
    borderRadius: 50,
    backgroundColor:  mainThemeColors.font.icon.light,
    justifyContent: "center"
  },
  inner: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: mainThemeColors.darkpurple,
    margin: 5
  },
});

export default TextSwitchToggle;
