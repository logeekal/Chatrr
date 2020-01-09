import reducers from "../reducers";
import { useReducer, useRef } from "react";
import { ActionTypes } from "./types";
import {
  LoginUserActionInterface,
  SaveRoomsActionInterface,
  JoinRoomActionInterface,
  LogoutUserActionInterface,
  MenuActionListType,
  ActionTypeInterface,
  ActionsContainerInterface,
  RoomActionListType,
  UserActionListType
} from "../../models/index";

export const userActions: ActionsContainerInterface<UserActionListType> = dispatch => {
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

export const roomActions: ActionsContainerInterface<RoomActionListType> = dispatch => {
  return {
    saveRooms: (roomsList): void => {
      console.log(`Got the rooms.. Now adding them in the state`);
      dispatch({
        type: ActionTypes.SAVE_ROOMS,
        payload: roomsList
      } as SaveRoomsActionInterface);
    },
    addUserToRoom: (user, roomId): void => {
      dispatch({
        type: ActionTypes.ADD_USER_TO_ROOM,
        payload: {
          roomId: roomId,
          user: user
        }
      });
    },
    removeUserFromRoom: (user, roomId): void => {
      dispatch({
        type: ActionTypes.REMOVE_USER_FROM_ROOM,
        payload: {
          roomId: roomId,
          user: user
        }
      });
    }
  };
};

export const menuActions: ActionsContainerInterface<MenuActionListType> = dispatch => {
  return {
    updateContextMenu: (menu): void => {
      dispatch({
        type: ActionTypes.UPDATE_CONTEXT_MENU,
        payload: menu
      } as ActionTypeInterface<string>);
    },
    updateMainMenu: (menu): void => {
      dispatch({
        type: ActionTypes.UPDATE_MAIN_MENU,
        payload: menu
      } as ActionTypeInterface<string>);
    }
  };
};
