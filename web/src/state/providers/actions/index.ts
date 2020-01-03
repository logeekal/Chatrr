import reducers from "../reducers";
import { useReducer, useRef } from "react";
import { ActionTypes } from "./types";
import {
  UserActionsType,
  LoginUserActionInterface,
  SaveRoomsActionInterface,
  JoinRoomActionInterface,
  LogoutUserActionInterface
} from "../../models/index";
import { RoomActionsType } from "./../../models/index";

export const userActions: UserActionsType = dispatch => {
  return {
    loginUser: (user): void => {
      console.log(`Adding loginUser ${JSON.stringify(user)}`);
      console.log(dispatch);
      dispatch({
        type: ActionTypes.LOGIN,
        payload: user
      } as LoginUserActionInterface);
    },

    logoutUser: (): void => {
      dispatch({
        type: ActionTypes.LOGOUT,
        payload: ""
      } as LogoutUserActionInterface);
    },

    joinRoom: (roomId): void => {
      dispatch({
        type: ActionTypes.JOIN_ROOM,
        payload: roomId
      } as JoinRoomActionInterface);
    }
  };
};

export const roomActions: RoomActionsType = dispatch => {
  return {
    saveRooms: roomsList => {
      console.log(`Got the rooms.. Now adding them in the state`);
      dispatch({
        type: ActionTypes.SAVE_ROOMS,
        payload: roomsList
      } as SaveRoomsActionInterface);
    }
  };
};
