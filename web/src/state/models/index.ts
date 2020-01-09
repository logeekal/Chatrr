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

/*
*****************************************************

Action Types

*****************************************************

*/
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

export interface AddNewUserToRoomInterface
  extends ActionTypeInterface<{
    roomId: string;
    user: User;
  }> {}

export interface RemoveUserFromRoomInterface
  extends ActionTypeInterface<{
    roomId: string;
    user: User;
  }> {}

export interface UserActionListType {
  loginUser: (user: User) => void;
  logoutUser: () => void;
  joinRoom: (roomId: string) => void;
}

export interface RoomActionListType {
  saveRooms: (roomList: Array<Room>) => void;
  addUserToRoom: (user: User, roomId: string) => void;
  removeUserFromRoom: (user: User, roomId: string) => void;
}

export interface MenuActionListType {
  updateContextMenu: (menu: string) => void;
  updateMainMenu: (menu: string) => void;
}

/**
 * @typeparam T return type of Action Container. i.e Type defining
 * list of actions.
 */
export interface ActionsContainerInterface<T> {
  (dispatch: React.Dispatch<ActionType>): T;
}

/*
*****************************************************

Menu State Interface

*****************************************************
*/
export interface MenuState {
  context: {
    component: string;
    selectedElement: string;
  };
  main: {
    component: string;
  };
}
