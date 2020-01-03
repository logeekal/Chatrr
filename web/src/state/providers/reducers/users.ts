/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-case-declarations */

import { ActionTypes } from "./../actions/types";
import { UserStateType, ActionType } from "../../models";
import { Reducer } from "react";

const UserReducer: Reducer<UserStateType, ActionType> = (state, action) => {
  let newState;
  let user;
  const { allUsers } = Object.assign({}, state);
  // Action login User
  switch (action.type) {
    case ActionTypes.LOGIN:
      user = action.payload;
      console.log(`Updating user's profile`);
      console.log(action.payload);
      newState = {
        ...state,
        allUsers: {
          [user.userName]: user
        },
        loggedInUser: user.userName
      };
      return newState;
    case ActionTypes.LOGOUT:
      console.log("Calling logout");
      const { allUsers } = Object.assign({}, state);
      const currUserName = state.loggedInUser;
      delete allUsers[currUserName];
      newState = {
        ...state,
        allUsers,
        loggedInUser: undefined
      };
      console.log(newState);
      return newState;
    case ActionTypes.JOIN_ROOM:
      //payload ==> roomId
      // let loggedInUser =  state.loggedInUser;
      // allUsers[loggedInUser]['roomId']= action.payload;
      // newState = {
      //     ...state,
      //     allUsers,
      // };
      // console.log(`In Join room \n New state is :  ${JSON.stringify(newState)}`);
      // return {
      //     ...state,
      //     allUsers,
      // }
      return {
        ...state,
        currentRoomId: action.payload
      };
    default:
      throw new Error(
        `Error in UserReducer. \n State :  ${JSON.stringify(
          state
        )} \n action: ${JSON.stringify(action)} }`
      );
  }
};

export default UserReducer;
