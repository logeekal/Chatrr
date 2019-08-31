function printPrototype(obj, i) {
    var n = Number(i || 0);
    var indent = Array(2 + n).join("-");

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            console.log(indent, key, ": ", obj[key]);
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
    console.log('Starting migrations..')
    //create sample users 
    let newUser1 = await store.Users.create({
        userName: 'hello',
        gender: 'M',
    })

    let newUser2 = await store.Users.create({
        userName: 'hello2',
        gender: 'F',        
    })


    console.log(`new User created : ` );
    // console.log(newUser);

    let newRoom = await store.Rooms.create({
        name:   'Delhi',
        title: 'delhiRoom',
        avatar: 'XYZ'
    });

    console.log(`new Room created : ` );
    console.log(newRoom);
    //add member to a room
    let newRoom2 = await store.Rooms.create({
        name:   'Mumbai',
        title: 'Mumbai',
        avatar: 'XYZ'
    });


    console.log(models)
    
    let addition1 = await newRoom.addUsers(newUser1);
    let addition2 = await newRoom.addUsers(newUser2);
    let members = await newRoom.getUsers({
        where : {
            userName : 'hello'
        }
    });
    console.log(members);

    let removal = await newRoom.removeUser(newUser2);
    
    console.log('Addition Succesful');

    let newConversation = await models.conversations.create({
        from: newUser1.id,
        toUser: null,
        toRoom: newRoom.id,
        toType: 'ROOM',
        text: 'HEYYYY'
    })
    
    
    // console.log("=============================")
    // console.log(printPrototype(newRoom))

    // let conversation = await newRoom.addRoomConversation();
    // console.log(addition2)
    // console.log(newConversation);
    // console.log(await newRoom.getRoomConversations())

    console.log(models.rooms.associations)

    let roomMembers  =  await models.users.findAll({
        include:
            {
                model: models.rooms,
                where:  {
                    name:   'Delhi'
                }
            }
    })

    console.log("==================================");
    console.log(roomMembers);

}

module.exports = {
    migrate
}