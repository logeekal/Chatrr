/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-case-declarations */

import { ActionTypes } from "./../actions/types";
import { RoomStateType, ActionType } from "../../models";
import { Room } from "../../../utils/gql/models/types";
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
    default:
      throw new Error(
        `Error in RoomReducer state: ${JSON.stringify(
          state
        )} \n  action: ${JSON.stringify(action)}} `
      );
  }
};

export default RoomReducer;
