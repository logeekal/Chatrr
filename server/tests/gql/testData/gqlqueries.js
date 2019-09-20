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


  const getPublicUserDetails = (userName) => `query getUser{
    user(userName : "${userName}") {
      id
      userName
      avatar
      gender
      connected
      loggedIn
      createdAt
    }
  }`


  const getUserConversations = ( userName ) => `query getUserConversations {
    getUserConversations {
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
    getPublicUserDetails,
    getRoomConversations,
    getRoomUsers
  }