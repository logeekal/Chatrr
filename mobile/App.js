/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput
} from 'react-native';


import LinearGradient from 'react-native-linear-gradient';
import MainBG from './components/MainBG';
import { mainThemeColors } from './globals/colors';
import ProfileForm from './components/ProfileForm';
import { getScreenDims } from './globals/helpers/dimensions';

const App = () => {
  return (
  
    <MainBG style={{display: "flex"}}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor= {mainThemeColors.darkpurple}
        translucent={true}
      />
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.formContainer} >
          <ProfileForm style={styles.form}/>
        </View>
      </View>
    </MainBG>
 
  );
};


const styles= StyleSheet.create({
  container: {
    flex: 1,

    width: getScreenDims().sw * 0.85,
    alignSelf: "flex-end"
  },
  header :{
    flex: 0.4,
  },
  formContainer:{
    flex: 0.6,
    display: "flex",

  },
  form: {
    alignSelf: "flex-end",

  }
})



export default App;
