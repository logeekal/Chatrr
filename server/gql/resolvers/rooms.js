const { getUpdateResponseBasedOnResult } = require('./helpers');
const  { login, logout, isAuthenticated } = require('../../utils/auth/auth');
const logger = require('../../utils/logging').log(module);

const getAllRooms = async (_, {} , { dataSources, req }) => {
    isAuthenticated(req);
    return  await dataSources.roomsAPI.getAllRooms();
};


const getAllActiveRooms = async (_, {} , { dataSources, req }) => {
    isAuthenticated(req);
    return  await dataSources.roomsAPI.getAllActiveRooms();
};


const getRoomUsers =  async (_, {roomId}, {dataSources}) => {
    return await dataSources.roomsAPI.getRoomUsers(roomId);
}

const getRoomConversations = async (_, {roomId, from}, {dataSources}) => {
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