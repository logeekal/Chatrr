import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
    mutation MUT_LOGIN_USER($userName: String!, $gender: String!) {
    loginUser(userName: $userName, gender: $gender) {
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