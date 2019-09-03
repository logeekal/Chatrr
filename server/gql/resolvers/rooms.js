const { getUpdateResponseBasedOnResult } = require('./helpers');

const getAllRooms = async (_, {} , { dataSources }) => {
    return  await dataSources.roomsAPI.getAllRooms();
};


const getAllActiveRooms = async (_, {} , { dataSources }) => {
    return  await dataSources.roomsAPI.getAllActiveRooms();
};


const getRoomUsers =  async (_, {roomId}, {dataSources}) => {
    return await dataSources.roomsAPI.getRoomUsers(roomId);
}

const getRoomConversations = async (_, {roomId, from}, {dataSources}) => {
    console.log(`Resolver getRoomConversations: ${from}`)
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