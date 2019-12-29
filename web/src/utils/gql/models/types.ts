export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type Conversations = {
  __typename?: "Conversations";
  id: Scalars["ID"];
  from: Scalars["String"];
  toUser?: Maybe<Scalars["String"]>;
  toRoom?: Maybe<Scalars["String"]>;
  toType: Scalars["String"];
  text: Scalars["String"];
  seen?: Maybe<Scalars["Boolean"]>;
  delievered?: Maybe<Scalars["Boolean"]>;
  sent?: Maybe<Scalars["Boolean"]>;
  createdAt: Scalars["String"];
};

export type ConversationTrail = {
  __typename?: "ConversationTrail";
  sentConversations?: Maybe<Array<Maybe<Conversations>>>;
  receivedConversations?: Maybe<Array<Maybe<Conversations>>>;
};

export type GenericResponse = {
  __typename?: "GenericResponse";
  success?: Maybe<Scalars["Boolean"]>;
  error?: Maybe<Scalars["String"]>;
};

export type JoinRoomResponse = {
  __typename?: "JoinRoomResponse";
  success: Scalars["Boolean"];
  error?: Maybe<Scalars["String"]>;
  room?: Maybe<Room>;
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  success: Scalars["Boolean"];
  error?: Maybe<Scalars["String"]>;
  token: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  loginUser: LoginResponse;
  /**
   * Need to update the username to something else on Logout...
   * So that another user can login with same username.
   */
  logoutUser: GenericResponse;
  /**
   * When a user first time joins a room. There is not way to exit all t
   * the rooms, rather, a person can do change the room.
   *
   * Rooms are kind of groups where anyone can enter and chat each other \
   * personally and collaboratively."
   */
  addUserToRoom: GenericResponse;
  /** sendConversation mutation helps system to send message from one entity to another entity, these entity can be  */
  sendConversation: GenericResponse;
  removeUserFromRoom: GenericResponse;
  updateConnectedStatus: GenericResponse;
};

export type MutationLoginUserArgs = {
  userName: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
  gender?: Maybe<Scalars["String"]>;
  ip?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
};

export type MutationAddUserToRoomArgs = {
  roomId: Scalars["String"];
};

export type MutationSendConversationArgs = {
  to: Scalars["String"];
  toType: Scalars["String"];
  text: Scalars["String"];
};

export type MutationUpdateConnectedStatusArgs = {
  status: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  userList?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  getUserConversations: ConversationTrail;
  roomUsers?: Maybe<Array<Maybe<User>>>;
  roomConversations?: Maybe<Array<Maybe<Conversations>>>;
  rooms?: Maybe<Array<Maybe<Room>>>;
};

export type QueryUserArgs = {
  userName: Scalars["String"];
};

export type QueryRoomUsersArgs = {
  roomId: Scalars["ID"];
};

export type QueryRoomConversationsArgs = {
  roomId: Scalars["ID"];
  from: Scalars["String"];
};

export type QueryRoomsArgs = {
  roomId?: Maybe<Scalars["ID"]>;
};

export enum Role {
  User = "USER",
  Admin = "ADMIN"
}

/**
 *  Rooms are kind of groups where anyone can enter and chat each other \
 * personally and collaboratively.
 */
export type Room = {
  __typename?: "Room";
  id: Scalars["ID"];
  name: Scalars["String"];
  title: Scalars["String"];
  avatar: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
  createdAt?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
  users?: Maybe<Array<Maybe<User>>>;
  roomConversations?: Maybe<Array<Maybe<Conversations>>>;
};

/** ***************************** */
export enum RoomType {
  Standard = "STANDARD",
  Custom = "CUSTOM"
}

export type Subscription = {
  __typename?: "Subscription";
  /** newUserInRoom is subsriptions which notifies the client when a new user joins a Room */
  newUserJoinedRoom: User;
  newUserLeftRoom: User;
  newLogin: User;
  newLogout: UserName;
  newChatMessageToUser: Conversations;
  newChatMessageToRoom: Conversations;
};

export type SubscriptionNewUserJoinedRoomArgs = {
  roomId: Scalars["String"];
};

export type SubscriptionNewUserLeftRoomArgs = {
  roomId: Scalars["String"];
};

export type SubscriptionNewChatMessageToRoomArgs = {
  roomId: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  userName: Scalars["String"];
  avatar: Scalars["String"];
  gender: Scalars["String"];
  ip?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  connected: Scalars["Boolean"];
  loggedIn: Scalars["Boolean"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  room?: Maybe<Room>;
  recievedConversations?: Maybe<Array<Maybe<Conversations>>>;
  sentConversations?: Maybe<Array<Maybe<Conversations>>>;
};

export type UserName = {
  __typename?: "UserName";
  userName: Scalars["String"];
};
