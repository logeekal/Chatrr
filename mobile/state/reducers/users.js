import { action_types } from './../actions/types';

const UserReducer =  (state, action) => {

    let newState;
    let user;
    // Action login User
    switch (action.type){
        case action_types.LOGIN:
            user = action.payload;
            console.log(`Updating user's profile`)
            newState =  {
                ...state,
                allUsers: {
                    [user.userName]:  user
                },
                loggedInUser: user.userName
            };
            return newState;
        case action_types.LOGOUT:
            let { allUsers } = Object.assign({}, state);
            let currUserName = state.loggedInUser;  
            delete allUsers[currUserName];
            newState = {
                ...state,
                allUsers,
                loggedInUser: ''
            };
            return newState;
        default:
            throw new Error(`Error in UserReducer. \n State :  ${JSON.stringify(state)} \n action: ${JSON.stringify(action)} }`);           
    }
}


export default UserReducer;