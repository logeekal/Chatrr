const Sequelize = require('sequelize');
// importing all the models as data sources.
const Users = require('./models/Users');
const Rooms = require('./models/Rooms');
const Conversations = require('./models/conversations');
const RoomMembers = require('./models/room_members');
const { seqConn } = require('./def');
const {migrate} = require('./migrations');
const logger = require('../utils/logging').log(module);


const store = {
    Users: Users(seqConn, Sequelize.DataTypes),
    Rooms: Rooms(seqConn, Sequelize.DataTypes),
    Conversations: Conversations(seqConn, Sequelize.DataTypes),
    // RoomMembers:  room_members(seqConn, Sequelize.DataTypes),
}



logger.debug(seqConn.models);

Object.keys(store).map((model)=>{
    
    store[model].associate(seqConn.models);
})

logger.info('Synching Database');

seqConn.sync({force:true}).then(async ()=>{
    await migrate(store, seqConn.models);
})



module.exports = {
    db: seqConn,
    store: store
}

