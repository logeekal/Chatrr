const { getUpdateResponseBasedOnResult } = require('./helpers');
const { login, logout, isAuthenticated } = require('../../utils/auth/auth');
const { ApolloError } = require('apollo-server');
const logger = require('../../utils/logging').log(module);
const pubsub = require('./subscriptions/pubsub');
const { error_codes } = require('../../configs/error_codes');
const { NEW_LOGIN, NEW_LOGOUT, NEW_USER_JOINED_ROOM,
    NEW_USER_LEFT_ROOM,
    NEW_CHAT_MESSAGE_TO_USER,
    NEW_CHAT_MESSAGE_TO_ROOM,
    NEW_CHAT_MESSAGE } = require('./subscriptions/topics');


const getCurrentUser = async (context) => {
    let { dataSources, req } = context;
    let currentUserName = isAuthenticated(context).userName;

    let currentUser = await dataSources.userAPI.find({
        where: {
            userName: currentUserName
        }
    });
    return currentUser
}


const throwError =  (errorObject) => {
    throw new ApolloError(errorObject.message, errorObject.name)
}

const loginUser = async (_, userObject, context) => {
    let { dataSources } = context;
    // logger.debug(context);
    try {
        const result = await dataSources.userAPI.create({
            ...userObject
        });
        let createdUser = result.dataValues;
        logger.debug('')
        logger.debug(createdUser);

        login(context, result);
        // logger.debug(context.req.session);

        pubsub.publish(NEW_LOGIN.topic, { [NEW_LOGIN.subscription]: { ...createdUser } })

        return {
            success: true,
            error: null
        }
    } catch (err) {
        logger.debug('Error while logging in ');
        throwError (err)
    }
}


const addUserToRoom = async (_, { userName, roomId }, { dataSources }) => {
    try {
        let updateFields = {
            roomId: roomId
        };

        let filters = {
            where: {
                userName: userName
            }
        };

        let result = await dataSources.userAPI.update(updateFields, filters);
        logger.debug("After adding users to Room");
        logger.debug(result);

        if (result[0] > 0) {

            let addedUser = await dataSources.userAPI.find(filters);
            logger.debug('New User Added to room. Publishing')
            pubsub.publish(
                NEW_USER_JOINED_ROOM.topic, {
                [NEW_USER_JOINED_ROOM.subscription]: {
                    ...addedUser
                }
            }
            );

            return {
                success: true,
                error: null
            }
        } else {
            
            throw error_codes.NO_RECORD_ERROR(filters)
        }
        // return getUpdateResponseBasedOnResult(
        //     result, 
        //     'Error', 
        //     'Failed add user to User. No Records to Update'
        //     );

    } catch (err) {
        logger.debug('Error While adding user to the room.');
        logger.error(err);
        throwError(err)
    }
}


const removeUserFromRoom = async (_, { userName, roomId }, { dataSources }) => {
    try {
        let updateFields = {
            roomId: null
        };

        let filters = {
            where: {
                userName: userName
            }
        };

        let result = await dataSources.userAPI.update(updateFields, filters);
        logger.debug("After removing User from the room");
        logger.debug(result);

        if (result[0] > 0) {
            logger.debug('User Removed from room. Publishing')
            pubsub.publish(
                NEW_USER_JOINED_ROOM.topic, {
                [NEW_USER_JOINED_ROOM.subscription]: {
                    userName: userName
                }
            }
            )
        } else {
            throw error_codes.NO_RECORD_ERROR(filters)
        }
    } catch (err) {
        logger.debug('Error While adding user to the room.');
        logger.error(err);
        throwError(err)
    }
}



const userUpdateResolversFactory = (type) => {
    return async (_, { userName }, context) => {
        let { dataSources, req } = context;
        let result;
        let updateFields;
        let filters = {
            where: { userName: userName }
        };
        try {
            switch (type) {
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
                        roomId: null,
                        userName: userName + '_' + Date.now()
                    };

                    break;
                case 'removeUserFromRoom':
                    logger.debug('Removing User from Room.');
                    updateFields = {
                        roomId: false
                    };
                    break;
                default:
                    result = ""
            }
            logout(context);
            result = await dataSources.userAPI.update(updateFields, filters);
            if (result[0] > 0) {
                pubsub.publish(NEW_LOGOUT.topic, {
                    [NEW_LOGOUT.subscription]: {
                        userName: userName
                    }
                });
                return {
                    success: true,
                    error: null
                }
            } else {

                logger.debug('Throwing Error');
                throw error_codes.NO_RECORD_ERROR(filters)
            }

        } catch (err) {
            logger.debug(`Error in Update Resolver Factory`);
            logger.error(err)
            throwError(err)
        }
    }
}



const getUser = async (_, { userName }, context) => {
    let { dataSources } = context;
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


const getUserConversations = async (_, { userName }, context) => {
    let { dataSources, req } = context;

    let currentUser = await getCurrentUser(context);

    logger.debug('getUserConversations resolver')
    let result = dataSources.userAPI.getConversations(currentUser);
    return result;
}


const sendConversation = async (_, { userName, to, toType, text }, context) => {
    logger.debug('In Send Conversation resolver');
    const { dataSources, req } = context;

    const currentUser = await getCurrentUser(context);
    logger.debug(currentUser)

    try {
        let result = await dataSources.userAPI.sendConversation({ currentUser, to, toType, text });
        let subscription = ''
        let topic = ''
        if (toType == 'USER') {
            topic = NEW_CHAT_MESSAGE_TO_USER.topic
            subscription = NEW_CHAT_MESSAGE_TO_USER.subscription
        } else {
            topic = NEW_CHAT_MESSAGE_TO_ROOM.topic
            subscription = NEW_CHAT_MESSAGE_TO_ROOM.subscription
        }

        pubsub.publish(
            topic, {
            [subscription]: {
                ...result,
                to: to
            }
        }
        )
        return {

            success: true,
            error: null
        };
    } catch (err) {
        logger.debug('Issue with sending Conversation');
        logger.error(err)
        throwError(err)

    }
}

const updateConnectedStatus = async (_, { userName, status }, { dataSources }) => {
    let filters = {
        where: {
            userName: userName
        }

    };

    let updateFields = {

        connected: status

    };

    try {
        let result = await dataSources.userAPI.update(updateFields, filters);
        if (result[0] > 0){
            return {
                success: true,
                error: null
            }
        }else{
            throw error_codes.NO_RECORD_ERROR(filters);
        }
        
    } catch (err) {
        logger.debug('Error in Updated Connected Status');
        logger.error(err)
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
        removeUserFromRoom: removeUserFromRoom,
        sendConversation: sendConversation,
    }
}