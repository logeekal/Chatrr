const { DataSource } = require('apollo-datasource');
const { Model } = require('sequelize');


class RoomsAPI extends DataSource {
    constructor({store}) {
        super();
        this.store = store
    }

    initialize(config) {
        this.context = config.context;
    }

    /**
     * This function creates a room with given details. All mandatory attributes need
     * to be provided for successfull creation of a room
     * @param {object} roomObj Room object with all mandatory details.
     */

    async createRoom (roomObj) {
        let newRoom = await this.store.Rooms.create(roomObj);
        console.log(newRoom);
        return newRoom;
    }

    /**
     * 
     * This function returns all the rooms present in the system irrespective of 
     * whether they are active or Inactive.
     * 
     */
    async getAllRooms () {
        let result = await this.store.Rooms.findAll({
            where: {
                active: true,
            }
        });
        return result;
    }

    /**
     * 
     * This function returns all the rooms present in the system which have status as Active.
     * 
     */
    async getAllActiveRooms() {
        let result = await this.store.Rooms.findAll({
            where:  {
                active: true
            }
        })
        console.log(result);
        return result;
    }

    async removeRoom({name}) {
        let result = await this.store.Rooms.destory({
            where: {
                name: name
            }
        });
        console.log(result);
        return result;
    }


    async getRoomConversations(roomId, fromTime) {

        let date = new Date(fromTime);
        date = date.toLocaleDateString;

        return await this.store.Rooms.findAll({
            where: {
                id: roomId
            },
            includes: {
                model: this.store.Conversations,
                where: `createdAt > ${ date }`
            }
        });
    }

    async getRoomUsers(roomId) {
        return await room.getUsers({
            where : {
                loggedIn: true
            },
            includes:{
                model: this.store.Rooms,
                where:  {
                    id: roomId
                }
            }
        });
    }

}

module.exports = {
    RoomsAPI
}