import { action_types } from './../actions/types';

const UserReducer =  (state, action) => {

    let newState;
    let user;
    let { allUsers } = Object.assign({}, state);
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
        case action_types.JOIN_ROOM:
            //payload ==> roomId
            // let loggedInUser =  state.loggedInUser;
            // allUsers[loggedInUser]['roomId']= action.payload;
            // newState = {
            //     ...state,
            //     allUsers,
            // };
            // console.log(`In Join room \n New state is :  ${JSON.stringify(newState)}`);
            // return {
            //     ...state,
            //     allUsers,
            // }
            return {
                ...state,
                currentRoomId: action.payload

            }
        default:
            throw new Error(`Error in UserReducer. \n State :  ${JSON.stringify(state)} \n action: ${JSON.stringify(action)} }`);           
    }
}


export default UserReducer;