/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Animated,
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
  const [loadAnim] = useState(new Animated.Value(0));

  const logo = (
    <TouchableOpacity
      onPress={() =>
        // setState({
        //   ...state,
        //   loaded: !state.loaded,
        // })

        {
          console.log(`Firing on press`)
          console.log(JSON.stringify(loadAnim) == 1);
          Animated.timing(loadAnim, {
            toValue: JSON.stringify(loadAnim) == 0 ? 1 : 0,
            duration: 1000,
          }).start(()=> console.log(`Animation started ${JSON.stringify(loadAnim)}`));
        }
      }>
      <Icon name="teamspeak" size={150} color="#FFF" />
    </TouchableOpacity>
  );

  console.log(loadAnim);

  return (
    <MainBG style={{display: 'flex'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={mainThemeColors.darkpurple}
        translucent={true}
      />

      <Animated.View style={styles.container}>
        <View style={styles.header}>
          <View>{logo}</View>
        </View>
        { JSON.stringify(loadAnim) === 0 ? (
          <View style={styles.formContainer}>
            <ProfileForm style={styles.form} />
          </View>
        ): <Text>Hey</Text>}
      </Animated.View>
    </MainBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: getScreenDims().sw * 0.85,
    alignSelf: 'flex-end',
    justifyContent: 'center',
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
