import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import MainBG from '../components/MainBG';
import {mainThemeColors} from '../globals/colors';
import ProfileForm from '../components/ProfileForm';
import {getScreenDims} from '../globals/helpers/dimensions';
import {AppContext} from './../state/context/AppContext';
import Loading from '../components/loading';
import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';
import {LOGIN_USER} from './../utils/apollo/mutations';
import apolloClient from './../utils/apollo/index';

const Main = props => {
  const [localState, setState] = useState({loaded: false});

  const [headerPosition, setHeaderPostiion] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const {state, actions} = useContext(AppContext);

  const [loginUser, {data, error, loading}] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      console.log(`Login Request Completed Succesfully`);
      console.log(data);
      if (data.loginUser.success) {
        props.navigation.navigate('RoomList');
      }
    },
    onError: error => {
      console.log(`Error during the request`);
      console.error(error);
    },
  });

  const handleLogin = async user => {
    let result = await loginUser({
      variables: {
        userName: user.userName,
        gender: user.gender,
      },
    });
    console.log(`result is : `);
    console.log(result);
    actions.loginUser(user);
    props.navigation.navigate('RoomList');
    actions.loading({
      state: false,
    });
  };

  const logo = (
    <TouchableOpacity
      onPress={() => {
        setState({
          ...localState,
          loaded: !localState.loaded,
        });
      }}>
      <Icon name="teamspeak" size={150} color="#FFF" />
    </TouchableOpacity>
  );

  //   console.log(loadAnim);
  if (loading || state.misc.loading.state) {
    return <Loading loading={{state: true}} />;
  }

  return (
    <MainBG style={{display: 'flex'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={mainThemeColors.darkpurple}
        translucent={true}
      />

      <View style={styles.container}>
        <View
          onLayout={event => {
            setHeaderPostiion(event.nativeEvent.layout);
            // setLoadAnim(Animated.Value(getScreenDims().sh*0.5 - headerPosition.height/2))
            console.log(
              `header position is : ${JSON.stringify(headerPosition)}`,
            );
          }}
          style={{
            ...styles.header,
            // top: JSON.stringify(loadAnim)
          }}>
          <View>{logo}</View>
        </View>
        {localState.loaded ? (
          <View style={styles.formContainer}>
            <ProfileForm style={styles.form} submitForm={handleLogin} />
          </View>
        ) : (
          <Text>Hey</Text>
        )}
      </View>
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
    // top: getScreenDims().sh * 0.5,
    // borderWidth: 1,
    // borderColor: "white",
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

export default Main;
