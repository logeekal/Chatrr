const { getUpdateResponseBasedOnResult } = require('./helpers');

const getAllRooms = async (_, {} , { dataSources }) => {
    return  await dataSources.roomsAPI.getAllRooms();
};


const getAllActiveRooms = async (_, {} , { dataSources }) => {
    return  await dataSources.roomsAPI.getAllActiveRooms();
};


const getRoomUsers =  async (_, {roomId}, {dataSources}) => {
    return await dataSources.roomsAPI.getRoomUser();
}

const getRoomConversations = async (_, {roomId, fromTime}, {dataSources}) => {
    return await dataSources.RoomsAPI.getRoomConversations(roomId, fromTime)
}




module.exports = {
    Query: {
        roomMembers: getRoomUsers,
        roomConversations: getRoomConversations,
        rooms: getAllActiveRooms
    },
    Mutation: {

    }
}