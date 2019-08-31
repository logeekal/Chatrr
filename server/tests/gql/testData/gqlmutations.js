const addUserToRoomMutation = ( userName, roomId ) => {
    let mutation = ` mutation addUserToRoom {
        addUserToRoom(userName : "${userName}", roomId: "${roomId}" ){
            success
            error
        }
    }`;
    console.log(mutation);
    return  mutation;
}


module.exports = {
    addUserToRoomMutation
}