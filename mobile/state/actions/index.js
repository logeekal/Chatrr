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
    
        logoutUser: () => {
            dispatch({
                type: action_types.LOGOUT,
                payload: ''
            })
        },

        joinRoom: (roomId) => {
            dispatch({
                type: action_types.JOIN_ROOM,
                payload: roomId
            })
        }
    }
}


export const roomActions = (dispatch) => {
    return {
        saveRooms: (roomsList) => {
            console.log(`Got the rooms.. Now adding them in the state`);
            dispatch({
                type: action_types.SAVE_ROOMS,
                payload: roomsList
            })
        }
    }
}

export const miscActions = (dispatch) => {
    return {
        loading: ( loadingObj ) => {
            console.log(`Updating loading object Now :  ${JSON.stringify(loadingObj)}`);
            dispatch({
                type: action_types.TOGGLE_LOADING,
                payload: loadingObj
            })
        }
    }
}