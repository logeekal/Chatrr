import {gql} from 'apollo-boost';

export const ALL_ROOMS = gql`
  query QUERY_ROOMS {
    rooms {
      id
      name
      title
      avatar
      description
      active
      createdAt
      updatedAt
      users{
        id
        userName
      }
      roomConversations{
        from
        toUser
        toRoom
        sent
        createdAt
      }
    }
  }
`;


export const QUERY_ROOM_MEMBERS = gql`
  query ROOM_MEMBERS($roomId: String!){
    roomUsers(roomId: $roomId){
      id
      userName
      avatar
      gender
      createdAt
      updatedAt
    }
  }

`;