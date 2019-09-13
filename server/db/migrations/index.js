const logger = require('../../utils/logging').log(module);


function printPrototype(obj, i) {
    var n = Number(i || 0);
    var indent = Array(2 + n).join("-");

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            logger.debug(indent, key, ": ", obj[key]);
        }
    }

    if(obj) {
        if(Object.getPrototypeOf) {
            printPrototype(Object.getPrototypeOf(obj), n + 1);
        } else if(obj.__proto__) {
            printPrototype(obj.__proto__, n + 1);
        }
    }
}




const migrate =  async (store, models) => {
    
    logger.debug('Starting migrations..');
    //create sample users 
    let newUser1 = await store.Users.create({
        userName: 'hello',
        gender: 'M',
    })

    let newUser2 = await store.Users.create({
        userName: 'hello2',
        gender: 'F',        
    })


    logger.debug(`new User created : ` );
    // logger.debug(newUser);

    let newRoom = await store.Rooms.create({
        name:   'Delhi',
        title: 'delhiRoom',
        avatar: 'XYZ'
    });

    logger.debug(`new Room created : ` );
    logger.debug(newRoom);
    //add member to a room
    let newRoom2 = await store.Rooms.create({
        name:   'Mumbai',
        title: 'Mumbai',
        avatar: 'XYZ'
    });


    // logger.debug(models)
    
    let addition1 = await newRoom.addUsers(newUser1);
    let addition2 = await newRoom.addUsers(newUser2);
    let members = await newRoom.getUsers({
        where : {
            userName : 'hello'
        }
    });
    logger.debug(members);

    let removal = await newRoom.removeUser(newUser2);
    
    logger.debug('Addition Succesful');

    let newConversation = await models.conversations.create({
        from: newUser1.id,
        toUser: null,
        toRoom: newRoom.id,
        toType: 'ROOM',
        text: 'HEYYYY'
    })
    
    
    // logger.debug("=============================")
    // logger.debug(printPrototype(newRoom))

    // let conversation = await newRoom.addRoomConversation();
    // logger.debug(addition2)
    // logger.debug(newConversation);
    // logger.debug(await newRoom.getRoomConversations())

    logger.debug(models.rooms.associations)

    let roomMembers  =  await models.users.findAll({
        include:
            {
                model: models.rooms,
                where:  {
                    name:   'Delhi'
                }
            }
    })

    logger.debug("==================================");
    logger.debug(roomMembers);

}

module.exports = {
    migrate
}