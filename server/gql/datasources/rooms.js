const { DataSource } = require('apollo-datasource');
const { Op } = require('sequelize');
const logger = require('../../utils/logging').log(module);

class RoomsAPI extends DataSource {
    constructor({ store }) {
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

    async createRoom(roomObj) {
        let newRoom = await this.store.Rooms.create(roomObj);
        console.debug(newRoom);
        return newRoom;
    }

    /**
     * 
     * This function returns all the rooms present in the system irrespective of 
     * whether they are active or Inactive.
     * 
     */
    async getAllRooms() {
        let result = await this.store.Rooms.findAll({
            where: {
                active: true,
            }
        }, {
            include: [{
                model: this.store.Users
            },
            {
                model: this.store.Conversations,
                as: 'roomConversations'
            }]
        });
        return result;
    }

    /**
     * 
     * This function returns all the rooms present in the system which have status as Active.
     * 
     */
    async getAllActiveRooms(roomId) {
        let filter = {
            where: {
                active: true
            }
        }
        if(roomId){
            logger.debug(`Getting room for Id : ${roomId}`);
            filter = {
                where: {
                    active: true,
                    id: roomId
                }
            }          
        }else{
            logger.debug(`Getting All Rooms`);
        }

        let result = await this.store.Rooms.findAll( {
            ...filter,
            include: [{
                model: this.store.Users
            },
            {
                model: this.store.Conversations,
                as: 'roomConversations'
            }]
        });
        logger.debug(JSON.stringify(result));
        return result;
    }

    async removeRoom({ name }) {
        let result = await this.store.Rooms.destory({
            where: {
                name: name
            }
        });
        logger.debug(result);
        return result;
    }


    async getRoomConversations(roomId, fromTime) {
        logger.debug('Now getting Conversations');

        logger.debug(fromTime);
        let date = new Date(parseInt(fromTime));
        logger.debug(date);

        let currRoom = await this.store.Rooms.findOne({
            where: {
                id: roomId
            }
        })

        logger.debug(this.store.Users.associations);
        logger.debug(this.store.Conversations.associations);
        return await currRoom.getRoomConversations({
            where: {
                createdAt: {
                    [Op.gte]: date
                }
            },
            order: ['createdAt'],
            include: [{
                model: this.store.Users,
                as: 'senders',

                //     where: {
                //     loggedIn : true

                // }
            }]
        })
    }
    //     return await this.store.Rooms.findAll({
    //         where: {
    //             id: roomId
    //         },
    //         includes: {
    //             model: this.store.Conversations,
    //             where: `createdAt > ${ date }`
    //         }
    //     });
    // }

    async getRoomUsers(roomId) {
        let currRoom = await this.store.Rooms.findOne({
            where: {
                id: roomId
            }
        })

        return await currRoom.getUsers({
            where: {
                loggedIn: true
            },
            order: ['userName'],
            includes: {
                model: this.store.Rooms,
                where: {
                    id: roomId
                }
            }
        });
    }

}

module.exports = {
    RoomsAPI
}