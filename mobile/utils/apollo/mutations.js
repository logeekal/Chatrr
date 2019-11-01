import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
    mutation MUT_LOGIN_USER($userName: String!, $gender: String!, $avatar: String!) {
    loginUser(userName: $userName, gender: $gender, avatar: $avatar) {
        success
        error
    }
    }
`;


export const MUTATION_LOGOUT_USER = gql`
    mutation LOGOUT_USER {
        logoutUser {
            success
        }
    }
`

export const MUTATION_JOIN_ROOM = gql`
    mutation JOIN_ROOM($roomId: String!){
        addUserToRoom(roomId: $roomId){
            success
            error
        }
    }
`