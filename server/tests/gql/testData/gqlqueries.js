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



  module.exports = {
    getRoomsQuery
  }