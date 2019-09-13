const { DataSources } = require('apollo-datasource');


class RoomMembersAPI extends DataSources   {
    constructor({Store}){
        super();;
        this.store = store;
    }

    intialize(config)   {
        this.context = config.context;
    }

    async addMembersToRoom({userId, roomId}) {
        let result =  await this.store.RoomMembers.create({
            roomId,
            userId
        });
    }

    async removeMembersFromRoom({userId, roomId})   {
        let result = await this.store.RoomMembers.destroy({
            where:  {
                roomId: roomId,
                userId: userId
            }
        })
    }


    async getRoomMembers({roomId}) {
        
    }
}