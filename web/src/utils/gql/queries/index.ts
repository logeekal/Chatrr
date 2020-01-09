import { gql } from "apollo-boost";
import Index from "./../../../../../app/src/screens/Index";

export const AUTH = gql`
  query auth {
    me {
      id
      userName
    }
  }
`;

export const LOGIN = gql`
  mutation login($userName: String!) {
    loginUser(userName: $userName) {
      success
      error
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logout {
    logoutUser {
      success
      error
    }
  }
`;

export const GET_ROOMS = gql`
  query getRooms {
    rooms {
      id
      name
      title
      avatar
      description
    }
  }
`;

export const GET_ROOM_USERS = gql`
  query roomUsers($roomId: String) {
    roomUsers(roomId: $roomId) {
      id
      userName
      avatar
      gender
      connected
      loggedIn
      recievedConversations {
        id
        from
        toUser
        toRoom
        toType
      }
      sentConversations {
        id
        from
        toUser
        toRoom
        toType
      }
    }
  }
`;

export const ADD_USER_TO_ROOM = gql`
  mutation addUserToRoom($roomId: String!) {
    addUserToRoom(roomId: $roomId) {
      success
      error
    }
  }
`;

export const NEW_USER_JOINED_ROOM = gql`
  subscription newUserJoinedRoom($roomId: String!) {
    newUserJoinedRoom(roomId: $roomId) {
      id
      userName
      avatar
      gender
      connected
      loggedIn
      recievedConversations {
        id
        from
        toUser
        toRoom
        toType
      }
      sentConversations {
        id
        from
        toUser
        toRoom
        toType
      }
    }
  }
`;

export const NEW_USER_LEFT_ROOM = gql`
  subscription newUserLeftRoom($roomId: String!) {
    newUserLeftRoom(roomId: $roomId) {
      id
      userName
      avatar
      gender
      connected
      loggedIn
      recievedConversations {
        id
        from
        toUser
        toRoom
        toType
      }
      sentConversations {
        id
        from
        toUser
        toRoom
        toType
      }
    }
  }
`;
