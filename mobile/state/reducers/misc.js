import { action_types } from './../actions/types';


export const MISCReducer  = ( state, action ) => {

    //action to toggle the spinner
    if(action.type == action_types.TOGGLE_LOADING) {
        let loadingObj = action.payload;

        let newState = {
            ...state,
            misc: {
                ...state.misc,
                loading: {
                    ...loadingObj
                }
            }
        };
        console.log(`Toggleing loading now.`);
        console.log(newState)
        return newState;
    }
}