import {gql} from 'apollo-boost';

export const SUB_NEW_USER_JOINED_ROOM = {
    value: gql`
      subscription NEW_USER_JOINED_ROOM($roomId: String!) {
        newUserJoinedRoom(roomId: $roomId) {
          id
          userName
          avatar
          gender
          connected
          loggedIn
          createdAt
          updatedAt
          room {
              id
          }
        }
      }
    `,
    name :'newUserJoinedRoom',
};


export const SUB_NEW_USER_LEFT_ROOM = {
    value: gql`
        subscription NEW_USER_LEFT_ROOM()
    `
}