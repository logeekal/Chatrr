/* eslint-disable @typescript-eslint/no-empty-interface */
import { User, Room } from "../../utils/gql/models/types";

export interface UserListObjType {
  [index: string]: Array<User>;
}

export interface UserStateType {
  allUsers: UserListObjType;
  loggedInUser: string;
  currentRoomId: string;
}

export interface RoomListObjType {
  [index: string]: Room;
}

export interface RoomStateType {
  orderedRoomIds: Array<string>;
  allRooms: RoomListObjType;
}

export interface UserActionListType {
  loginUser: (user: User) => void;
  logoutUser: () => void;
  joinRoom: (roomId: string) => void;
}

export interface UserActionsType {
  (dispatch: React.Dispatch<ActionType>): UserActionListType;
}

export interface RoomActionListType {
  saveRooms: (roomList: Array<Room>) => void;
}
export interface RoomActionsType {
  (dispatch: React.Dispatch<ActionType>): RoomActionListType;
}

// Actions
export interface ActionTypeInterface<T> {
  type: string;
  payload: T;
}

export interface ActionType extends ActionTypeInterface<any> {}

export interface LoginUserActionInterface extends ActionTypeInterface<User> {}

export interface LogoutUserActionInterface
  extends ActionTypeInterface<string> {}

export interface JoinRoomActionInterface extends ActionTypeInterface<string> {}

export interface SaveRoomsActionInterface
  extends ActionTypeInterface<Array<Room>> {}
