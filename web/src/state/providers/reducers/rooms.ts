/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-case-declarations */

import { ActionTypes } from "./../actions/types";
import {
  RoomStateType,
  ActionType,
  AddNewUserToRoomInterface,
  RemoveUserFromRoomInterface
} from "../../models";
import { Room, User } from "../../../utils/gql/models/types";
import { RoomListObjType } from "./../../models/index";
import { Dispatch } from "react";
import { SaveRoomsActionInterface } from "./../../models/index";

const RoomReducer = (
  state: RoomStateType,
  action: ActionType
): RoomStateType => {
  console.log(
    `Now in room Reducer with \n state: ${JSON.stringify(
      state
    )} \n action: ${JSON.stringify(action)}`
  );
  switch (action.type) {
    case ActionTypes.SAVE_ROOMS:
      const orderedRoomIds: Array<string> = [];
      const allRooms: RoomListObjType = {};
      // eslint-disable-next-line array-callback-return
      (action as SaveRoomsActionInterface).payload.map((room): void => {
        allRooms[room.id] = room;
        orderedRoomIds.push(room.id);
      });
      return {
        ...state,
        allRooms,
        orderedRoomIds
      };
    case ActionTypes.ADD_USER_TO_ROOM:
      let {
        payload: { roomId, user }
      } = action as AddNewUserToRoomInterface;
      console.log(`Adding ${user.userName} to ${roomId}`);
      let currentRoomUsers = state.allRooms[roomId].users as Array<User>;
      return {
        ...state,
        allRooms: {
          ...state.allRooms,
          [roomId]: {
            ...state.allRooms[roomId],
            users: [...currentRoomUsers, user]
          } as Room
        }
      };
    case ActionTypes.REMOVE_USER_FROM_ROOM:
      const {
        payload: removeUserPayLoad
      } = action as RemoveUserFromRoomInterface;
      roomId = removeUserPayLoad.roomId;
      user = removeUserPayLoad.user;
      console.log(`Removing ${user.userName} from ${roomId}`);
      currentRoomUsers = state.allRooms[roomId].users as Array<User>;
      const newUserList = currentRoomUsers.filter(
        value => value.userName !== user.userName
      );

      return {
        ...state,
        allRooms: {
          ...state.allRooms,
          [roomId]: {
            ...state.allRooms[roomId],
            users: [...newUserList]
          }
        }
      };

    default:
      throw new Error(
        `Error in RoomReducer state: ${JSON.stringify(
          state
        )} \n  action: ${JSON.stringify(action)}} `
      );
  }
};

export default RoomReducer;
