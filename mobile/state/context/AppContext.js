import React, { useReducer } from 'react';
import reducers from '../reducers'
// import actions from '../actions';
import { userActions, miscActions, roomActions } from './../actions/index';

export const AppContext = React.createContext();

export const initialState = {
   
   
    /*
        loggedInUser
            -- login User
                id, userName, gender, avatar, connected

        currentTheme
        OrderedRooms ( get rooms -- RoomId and roomNames, subscribeToNewRoomMembers )
        -- OrdereRoomMembers( getRoomMembersOfThatRoom, SubscribeToRoomMembers and unSubscribeToOldRoom)
        --  --  id 
        OrderedConversations 
        --  -- id, from , to, sent, recieved, delivered
        --  --  actions :  addConversation
        allUsers
            
    */

    loggedInUser: '',
    currentTheme: {},
    orderedRooms: [],
    OrderedConversations: [],
    allUsers: {},
    allRooms: {},
}


const AppStateProvider = ({ children }) => {

    const [userState, userDispatch] = useReducer(reducers.UserReducer, {
        allUsers: {},
        loggedInUser: '',
        currentRoomId: ''
    });


    const [miscState, miscDispatch ] = useReducer(reducers.MISCReducer, {
        misc: {
            loading: {
                state: false
            }
        }
    });

    const [roomState, roomDispatch] = useReducer(reducers.RoomReducer,{
        orderedRoomIds:[],
        allRooms: {}
    })

    console.log(userActions(userDispatch));
    const actions = {
        ...userActions(userDispatch),
        ...miscActions(miscDispatch),
        ...roomActions(roomDispatch),
    }

    const state= {
        ...userState,
        ...miscState,
        ...roomState
    }   


    return (
        <AppContext.Provider value={{
            state: state,
            actions: actions
        }} >
            {children}
        </AppContext.Provider>
    );
}


export default AppStateProvider;