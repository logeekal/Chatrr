import { action_types } from './../actions/types';

const UserReducer =  (state, action) => {

    
    // Action login User
    if (action.type == action_types.LOGIN) {
        user = action.payload;
        console.log(`Updating user's profile`)
        const newState =  {
            ...state,
            allUsers: {
                [user.userName]:  user
            },
            loggedInUser: user.userName
        };
        return newState;
    }
    return state;

}


export default UserReducer;