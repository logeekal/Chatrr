import React, { useReducer } from "react";
import reducers from "./reducers";
// import actions from '../actions';
import { userActions, roomActions } from "./actions/index";
import { User } from "../../utils/gql/models/types";
import {
  UserStateType,
  ActionType,
  RoomStateType,
  RoomActionListType
} from "../models";
import { UserActionListType } from "./../models/index";

interface StateInterface extends UserStateType, RoomStateType {}
interface ActionsInterface extends UserActionListType, RoomActionListType {}

interface AppStateContextInterface {
  state: StateInterface;
  actions: ActionsInterface;
}

interface ProviderProps {
  children: React.ReactElement | React.ReactFragment;
}

export const AppStateContext: React.Context<AppStateContextInterface> = React.createContext(
  {} as AppStateContextInterface
);

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

  loggedInUser: "",
  currentTheme: {},
  orderedRooms: [],
  OrderedConversations: [],
  allUsers: {},
  allRooms: {}
};

function AppStateProvider({ children }: ProviderProps): React.ReactElement {
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserStateType, ActionType>
  >(reducers.UserReducer, {
    allUsers: {},
    loggedInUser: "",
    currentRoomId: ""
  });

  //   const [miscState, miscDispatch] = useReducer(reducers.MISCReducer, {
  //     misc: {
  //       loading: {
  //         state: false
  //       }
  //     }
  //   });

  const [roomState, roomDispatch] = useReducer<
    React.Reducer<RoomStateType, ActionType>
  >(reducers.RoomReducer, {
    orderedRoomIds: [],
    allRooms: {}
  });

  console.log(userActions(userDispatch));
  const actions = {
    ...userActions(userDispatch),
    ...roomActions(roomDispatch)
  };

  const state = {
    ...userState,
    ...roomState
  };

  return (
    <AppStateContext.Provider
      value={{
        state: state,
        actions: actions
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateProvider;
