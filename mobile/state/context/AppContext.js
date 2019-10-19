import React, { useReducer } from 'react';
import reducers from '../reducers'
// import actions from '../actions';
import { userActions } from './../actions/index';

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
    allUsers: {}

}


const AppStateProvider = ({ children }) => {

    const [state, userDispatch] = useReducer(reducers.UserReducer, initialState);

    console.log(userActions(userDispatch));
    const actions = {
        ...userActions(userDispatch),
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