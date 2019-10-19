import reducers from '../reducers'
import { useReducer, useRef } from 'react';
import { initialState } from '../context/AppContext';
import { action_types } from './types';


export const userActions = (dispatch) => {

    return {
        loginUser: (user) => {
            console.log(`Adding loginUser ${JSON.stringify(user)}`);
            console.log(dispatch);
            dispatch({
                type:   action_types.LOGIN ,
                payload: user
            });
        },
    
        logoutUser: (user) => {
            dispatch({
                type: action_types.LOGOUT,
                payload: user
            })
        }    
    }
}

