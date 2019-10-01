/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import MainBG from './components/MainBG';
import {mainThemeColors} from './globals/colors';
import ProfileForm from './components/ProfileForm';
import {getScreenDims} from './globals/helpers/dimensions';
import {TouchableOpacity} from 'react-native';

const App = () => {
  const [state, setState] = useState({loaded: false});

  const logo = (
    <TouchableOpacity
      onPress={() =>
        setState({
          ...state,
          loaded: !state.loaded,
        })
      }>
      <Icon name="teamspeak" size={150} color="#FFF" />
    </TouchableOpacity>
  );

  return (
    <MainBG style={{display: 'flex'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={mainThemeColors.darkpurple}
        translucent={true}
      />

      {state.loaded ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <View>{logo}</View>
          </View>
          <View style={styles.formContainer}>
            <ProfileForm style={styles.form} />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <View>{logo}</View>
          </View>
        </View>
      )}
    </MainBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: getScreenDims().sw * 0.85,
    alignSelf: 'flex-end',
    justifyContent: "center"
  },
  header: {
    flex: 0.45,
    display: 'flex',
    justifyContent: 'center',
  },
  logoContainer: {},
  formContainer: {
    flex: 0.55,
    display: 'flex',
  },
  form: {
    alignSelf: 'flex-end',
  },
});

export default App;
