import { gql } from "apollo-boost";

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
      active
      createdAt
      updatedAt
      users {
        id
        userName
      }
      roomConversations {
        from
        toRoom
        toUser
      }
    }
  }
`;
