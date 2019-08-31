const user1 = {
    userName:   'Testinguser1',
    gender: 'M',
    avatar: "AvatarForUser1"
}

const user2 = {
    userName: 'Testinguser2',
    gender  : 'F',
    avatar: 'AvatarForUser2'

}

const room1 = {
    name: 'TestRoom1',
    title:  'Room1',
    avatar: 'AvatarForRoom1'
}


const room2 = {
    name: 'TestRoom2',
    title:  'Room2',
    avatar: 'AvatarForRoom2'
}

const convUser1ToUser2 = {
    text: "from User1 to User2."
}

const convUser1ToRoom1 = {
    text: "From User 1 to Room 1"
}

const convUser2ToRoom1 = {
    text: "from user 2 to Room 1"
}

const convUser2ToUser1 = {
    text: "from User2 to User 1"
}


const loginMutationUser1 = `mutation login { loginUser(userName: "${ user1.userName }", gender: "${user1.gender}"){ \
    success \
    error \
  }  \
}`;

const loginMutationUser2 = `mutation login { loginUser(userName: "${ user2.userName }", gender: "${user2.gender}"){ \
    success \
    error \
  }  \
}`;


const logoutMutationUser1 = `mutation logout { logoutUser(userName: "${ user1.userName }"){ \
    success \
    error \
  }  \
}`;


const logoutMutationUser2 = `mutation logout { logoutUser(userName: "${ user2.userName }"){ \
    success \
    error \
  }  \
}`;

const addUser1ToRoom1Mutation =`mutation addUser {
    addUserToRoom(userName: "${ user1.userName } ")
}`




module.exports = {
    user1,
    user2,
    room1,
    room2,
    convUser1ToUser2,
    convUser1ToRoom1,
    convUser2ToRoom1,
    convUser2ToUser1,
    loginMutationUser1,
    loginMutationUser2,
    logoutMutationUser1,
    logoutMutationUser2   

}