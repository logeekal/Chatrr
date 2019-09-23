const { getUpdateResponseBasedOnResult } = require('./helpers');
const  { login, logout, isAuthenticated } = require('../../utils/auth/auth');
const logger = require('../../utils/logging').log(module);

const getAllRooms = async (_, {} , context ) => {
    const { dataSources, req } = context
    isAuthenticated(context);
    return  await dataSources.roomsAPI.getAllRooms();
};


const getAllActiveRooms = async (parent, args , context, info ) => {
    const { dataSources, req } = context;
    isAuthenticated(context);
    logger.debug('Print args');
    logger.debug(args);
    logger.debug(info);
    logger.debug(parent);
    
    const { roomId } = args;


    return  await dataSources.roomsAPI.getAllActiveRooms(roomId);
};


const getRoomUsers =  async (_, {roomId}, context ) => {
    const { dataSources, req } = context;
    return await dataSources.roomsAPI.getRoomUsers(roomId);
}

const getRoomConversations = async (_, {roomId, from},context ) => {
    const { dataSources, req } = context;
    logger.debug(`Resolver getRoomConversations: ${from}`)
    return await dataSources.roomsAPI.getRoomConversations(roomId, from)
}

module.exports = {
    Query: {
        roomUsers: getRoomUsers,
        roomConversations: getRoomConversations,
        rooms: getAllActiveRooms
    },
    Mutation: {

    }
}