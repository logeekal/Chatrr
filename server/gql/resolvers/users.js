const { getUpdateResponseBasedOnResult } = require('./helpers');
const  { login, logout, isAuthenticated } = require('../../utils/auth/auth');
const logger = require('../../utils/logging').log(module);


const getCurrentUser = async (context) => {
    let {dataSources, req} = context;
    let currentUserName = isAuthenticated(req).userName;

    let currentUser = await dataSources.userAPI.find({
        where : {
            userName: currentUserName
        }
    });
    return currentUser
}

const loginUser = async (_, { userName, gender }, context) => {
    let {dataSources} = context;
    // logger.debug(context);
    try {
        const result = await dataSources.userAPI.create({
            userName, 
            gender
        });
        logger.debug('')
        logger.debug(result);

        login(context.req,result);
        // logger.debug(context.req.session);

        return {
            success: true,
            error: result
        }
    } catch (err) {
        logger.debug('Error while logging in ');
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
        logger.debug("After adding users to Room");
        logger.debug(result);
        return getUpdateResponseBasedOnResult(
            result, 
            'Error', 
            'Failed add user to User. No Records to Update'
            );
        
    }catch(err) {
        logger.debug('Error While adding user to the room.');
        logger.debug(err);
        return {
            success: false,
            error: JSON.stringify({...err})
        }
    }
}


const userUpdateResolversFactory = (type) => {
    return async(_, {userName}, context) =>{
        let {dataSources, req} = context;
        let result;
        let updateFields;
        let filters  = {
                where:  {   userName:   userName}
            };
        try{
            switch(type){
                case 'logoutUser':
                    logger.debug('LogOut Resolver triggered');
                    // logger.debug('Removing user from the room.')

                    // updateFields = {
                    //     roomId : null
                    // };

                    // await dataSources.userAPI.update(updateFields, filters);
                    logger.debug('Removed user from the room. Now logging user out.')

                    updateFields = {
                        loggedIn: false,
                        connected: false,
                        roomId : null,
                        userName: userName+'_'+Date.now()
                    };
                    
                    break;
                case  'removeUserFromRoom':
                    logger.debug('Removing User from Room.');
                    updateFields = {
                        roomId: false
                    };
                    break;
                default:
                    result=""
            }
            logout(req);
            result = await dataSources.userAPI.update(updateFields, filters);
            if ( result[0] > 0 ) {
                
                return {
                    success: true,
                    error: null
                }
            }else{

                logger.debug('Thorwing Error');
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



const getUser = async(_, { userName }, context ) => {
    let {dataSources, req} = context;
    // isAuthenticated(req);
    logger.debug('In getUser Resolver');
    logger.debug(userName);
    let result = await dataSources.userAPI.find({
        where: {
            userName: userName
        }
    });
    logger.debug('Results for get user are ');
    logger.debug(result);
    return result;
}


const getUserConversations = async(_, { userName }, context) => {
    let {dataSources, req} =  context;

    

    let currentUser = await getCurrentUser(context);
       
    logger.debug('getUserConversations resolver')
    let result = dataSources.userAPI.getConversations(currentUser);
    return result;
}


const sendConversation = async (_, {userName, to, toType, text}, context ) => {
    logger.debug('In Send Conversation resolver');
    const { dataSources, req } = context;

    const currentUser = await getCurrentUser(context);
    logger.debug(currentUser)

    try {
        let result = await dataSources.userAPI.sendConversation({currentUser, to, toType, text});
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