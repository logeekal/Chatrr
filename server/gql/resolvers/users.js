const { getUpdateResponseBasedOnResult } = require('./helpers');

const loginUser = async (_, { userName, gender }, { dataSources }) => {
    try {
        const result = await dataSources.userAPI.create({
            userName, 
            gender
        });

        return {
            success: true,
            error: result
        }
    } catch (err) {
        console.log('Error while logging in ');
        return {
            success: false,
            error: err
        }
    }
}


const addUserToRoom = async (_, {userName, roomId}, {dataSources}) => {
    try{
        let updateFields = {
            roomId : roomId
        };

        let filters = {
            where: { 
                userName:  userName
            }
        };

        let result = await dataSources.userAPI.update(updateFields, filters);
        console.log("After adding users to Room");
        console.log(result);
        return getUpdateResponseBasedOnResult(
            result, 
            'Error', 
            'Failed add user to User. No Records to Update'
            );
        
    }catch(err) {
        console.log('Error While adding user to the room.');
        console.log(err);
        return {
            success: false,
            error: JSON.stringify({...err})
        }
    }
}


const userUpdateResolversFactory = (type) => {
    return async(_, {userName}, {dataSources}) =>{
        let result;
        let updateFields;
        let filters  = {
                where:  {   userName:   userName}
            };
        try{
            switch(type){
                case 'logoutUser':
                    console.log('LogOut Resolver triggered');
                    // console.log('Removing user from the room.')

                    // updateFields = {
                    //     roomId : null
                    // };

                    // await dataSources.userAPI.update(updateFields, filters);
                    console.log('Removed user from the room. Now logging user out.')

                    updateFields = {
                        loggedIn: false,
                        connected: false,
                        roomId : null,
                        userName: userName+'_'+Date.now()
                    };
                    
                    break;
                case  'removeUserFromRoom':
                    console.log('Removing User from Room.');
                    updateFields = {
                        roomId: false
                    };
                    break;
                default:
                    result=""
            }
            result = await dataSources.userAPI.update(updateFields, filters);
            if ( result[0] > 0 ) {
                return {
                    success: true,
                    error: null
                }
            }else{
                console.log('Thorwing Error');
                throw {
                    name:   "NO_RECORD_ERROR",
                    level:  'Errsadsor',
                    message:    `No Record exists with fields ${ JSON.stringify(filters) }`
                }
            }
            
        }catch(err) {
            return {
                success: false,
                error: err.message
            }
        }
    }
}



const getUser = async(_, { userName }, { dataSources } ) => {

    console.log('In getUser Resolver');
    console.log(userName);
    let result = await dataSources.userAPI.find({
        where: {
            userName: userName
        }
    });
    console.log('Results for get user are ');
    console.log(result)
    return result;
}


const getUserConversations = async(_, { userName }, { dataSources }) => {
    console.log('getUserConversations resolver')
    let result = dataSources.userAPI.getConversations({userName});
    return result;
}


const sendConversation = async (_, {userName, to, toType, text}, { dataSources} ) => {
    console.log('In Send Conversation resolver');
    try {let result = await dataSources.userAPI.sendConversation({userName, to, toType, text});
    return {
        
        success: true,
        error: null
    };
}catch(err){
    return {
        success: false,
        error: err.message
    }

}
}

const updateConnectedStatus = async(_, {userName, status}, {dataSources}) => {
    let filters = {
       where:{
           userName:  userName
        }

    };

    let updateFields = {
        
        connected: status
    
    };

    try{
        await dataSources.userAPI.update(updateFields, filters);
        return {
            success: true,
            error: null
        }
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}


module.exports = {
    Query: {
        user: getUser,
        getUserConversations: getUserConversations,
    },
    Mutation: {
        loginUser: loginUser,
        logoutUser: userUpdateResolversFactory('logoutUser'),
        updateConnectedStatus: updateConnectedStatus,
        addUserToRoom: addUserToRoom,
        removeUserFromRoom: userUpdateResolversFactory('removeUserFromRoom'),
        sendConversation: sendConversation,
    }
}