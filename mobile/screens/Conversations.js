import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StatusBar,
  Keyboard,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Separater } from '../components/misc';
import GenericHeader from '../components/header/GenericHeader';
import SendBar from './../components/sendbar/SendBar';
import ChatBubble from '../components/bubble/ChatBubble';
import { StyleSheet } from 'react-native';
import { getScreenDims } from './../globals/helpers/dimensions';
import { FlatList } from 'react-native-gesture-handler';
import SwipableScreen from './../components/swipableScreen/index';
import { mainThemeColors } from '../globals/colors';
import SideBar from './../components/sidebar/index';
import LinearGradient from 'react-native-linear-gradient';
import { AppContext } from './../state/context/AppContext';
import { getImage } from './../globals/helpers/ImageLocator';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { MUTATION_JOIN_ROOM } from './../utils/apollo/mutations';
import Loading from '../components/loading';
import { QUERY_ROOM_MEMBERS } from '../utils/apollo/queries';
import { SUB_NEW_USER_JOINED_ROOM } from './../utils/apollo/subscription';

const Conversations = ({ navigation }) => {
  const { state, actions } = useContext(AppContext);
  console.log('App State in conversations');
  console.log(state);

  const conversationType = navigation.getParam('type', 'room');
  const roomId = navigation.getParam('roomId', '');
  console.log(`Conversation Type is ${conversationType}`);

  //Apollo  Section 
  const [joinRoom, { loading, data, called }] = useMutation(MUTATION_JOIN_ROOM, {
    onCompleted: data => {
      console.log('############### room joined');
      actions.joinRoom(roomId);
    },
  });


  if (
    conversationType == 'room' &&
    state.currentRoomId.length !== roomId &&
    !called
  ) {
    // first leave the existing room. Call the mutation for the same. 
    // so that you can pop that member from .. 
    joinRoom({
      variables: {
        roomId: roomId,
      },
    })
  }

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [sendBarHeight, setSendBarHeight] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  let currUser = 'a';
  let notif = false;
  const [conversation, setConversation] = useState([
    {
      from: 'a',
      to: 'b',
      text: ' this is a text from a to b ',
      createdAt: '1571132448793',
      sent: true,
      seen: false,
    },
    {
      from: 'b',
      to: 'a',
      text: ' this is a text from b to a ',
      createdAt: '1571132448794',
      sent: true,
      seen: false,
    },
  ]);

  const AnimatedLinearGradient = Animated.createAnimatedComponent(
    LinearGradient,
  );

  //Animation data
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [sidebarFlex] = useState(new Animated.Value(0));
  const handleSendConversation = currentConversation => {
    setConversation([
      ...conversation,
      {
        from: 'a',
        to: 'b',
        text: currentConversation,
        sent: true,
        seen: false,
        createdAt: Date.now() + '',
      },
    ]);
  };

  const handleSideBarVisibilty = () => {
    let toValue = 0;
    if (sideBarVisible) {
      setSideBarVisible(false);
      toValue = 0;
    } else {
      setSideBarVisible(true);
      toValue = 0.2;
    }
    Animated.timing(sidebarFlex, {
      toValue: toValue,
      duration: 100,
    }).start();
  };

  const newUserInRoom = useSubscription(SUB_NEW_USER_JOINED_ROOM.value,
    {
      variables: {
        roomId: state.currentRoomId
      },
      onSubscriptionData: ({ subscriptionData, client }) => {
        console.log(`Subscription triggered`);
        console.log(subscriptionData.data[SUB_NEW_USER_JOINED_ROOM.name]);
        
      },
      onSubscriptionComplete: () => {
        console.log(`*********** Subscription Now Completed **********`);
      },
    }
  );


  useEffect(() => {
    let keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        console.log(`Keyboard height is ${event.endCoordinates.height}`);
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    let keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      event => {
        setKeyboardHeight(0);
      },
    );

    return function cleanup() {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
  });

  if (loading) {
    return <Loading loading={{ state: true, text: 'Joining Room' }} />;
  }

  // if(getRoomMembersStatus.loading){
  //   return <Loading loading={{state: true, text: 'Getting Room Members now'}} />;
  // }

  if ((conversationType == 'room' && state.currentRoomId.length > 0) || (conversationType == 'user' && state.loggedInUser.length > 0)) {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          borderWidth: 3,
          borderColor: 'pink',
          zIndex: 9999,
        }}>
        <View
          onLayout={event => {
            let { x, y, width, height } = event.nativeEvent.layout;
            console.log(`Header height is :  ${height}`);
            setHeaderHeight(height);
          }}>
          <GenericHeader type={conversationType}></GenericHeader>
        </View>
        <TouchableWithoutFeedback onPress={handleSideBarVisibilty}>
          <Animated.View
            style={{
              ...styles.restOfScreen,
              height:
                getScreenDims().wh -
                StatusBar.currentHeight -
                headerHeight -
                keyboardHeight -
                5,
            }}>
            <Animated.View
              style={{
                ...styles.mainScreen,
                flex: 1 - parseFloat(JSON.stringify(sidebarFlex)),
              }}>
              <View
                style={{
                  flex: 0.99,
                }}>
                <FlatList
                  data={conversation}
                  keyExtractor={item => {
                    return item.createdAt;
                  }}
                  renderItem={({ item }) => {
                    console.log(`Rending item :  ${JSON.stringify(item)}`);
                    return (
                      <ChatBubble
                        type={item.from == currUser ? 'right' : 'left'}
                        conversation={item}
                      />
                    );
                  }}
                />
              </View>
              <View
                onLayout={event => {
                  let { x, y, width, height } = event.nativeEvent.layout;
                  console.log(`Header height is :  ${height}`);
                  setSendBarHeight(height);
                }}
                style={{
                  borderColor: 'blue',
                  borderWidth: 0,
                }}>
                <SendBar onSend={handleSendConversation} />
              </View>
            </Animated.View>
            <AnimatedLinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.15, 0.15]}
              colors={[
                'rgba(250, 250, 258, 0.1)',
                'rgba(200, 200, 218, 0.005)',
                mainThemeColors.palepurple,
              ]}
              style={{
                ...styles.sidebar,
                flex: parseFloat(JSON.stringify(sidebarFlex)),
              }}>
              {/* <FlatList 
                    data={getRoomMembersStatus.data.roomUsers}
                    keyExtractor={(item)=>{
                        return item.userName
                    }}
                    renderItem={({item})=>{
                        <Avatar 
                            image={getImage(item.avatar)}
                            profile={{name: item.userName}}
                            width={30}
                            mode={'both'}

                        />
                    }}
                /> */}
            </AnimatedLinearGradient>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  };

  return (
    <View>
      <Text>Nothing to show
        </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  restOfScreen: {
    flexDirection: 'row',
    borderColor: 'green',
    borderWidth: 0,
    top: StatusBar.currentHeight + 3,
  },
  mainScreen: {
    display: 'flex',
    borderColor: 'red',
    borderWidth: 0,
  },
  sidebar: {
    borderColor: 'purple',
    borderWidth: 0,
    backgroundColor: mainThemeColors.palepurple,
  },
});

export default Conversations;
