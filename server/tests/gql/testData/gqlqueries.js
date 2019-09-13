const getRoomsQuery = `query getRooms{
    rooms{
        id
        name
        title
        avatar
        description
        active
        createdAt
        updatedAt
    }
  }`


  const getUser = (userName) => `query getUser{
    user(userName : "${userName}") {
      id
      userName
      avatar
      gender
      ip
      location
      connected
      loggedIn
      createdAt
    }
  }`


  const getUserConversations = ( userName ) => `query getUserConversations {
    getUserConversations(userName: "${userName}") {
        sentConversations {
        from
        toUser
        toRoom
        toType
        text
        sent
        delievered
        seen
        createdAt
      }
      receivedConversations {
        from
        toUser
        toRoom
        toType
        text
        sent
        delievered
        seen
        createdAt
      }
  }
}`;


const getRoomUsers = (roomId) => `
  query getRoomUsers {
    roomUsers(roomId: "${roomId}"){
      id
      userName
    }
  }
`

const getRoomConversations = (roomId, timestamp) => {
  
  let query = `
query getRoomConvo {
  roomConversations(roomId: "${roomId}", from: "${timestamp}") {
    from
    toUser
    toRoom
    toType
    text
    sent
    delievered
    seen
    createdAt
  }
}`

  return query;
};


  module.exports = {
    getRoomsQuery,
    getUserConversations,
    getUser,
    getRoomConversations,
    getRoomUsers
  }