const addUserToRoomMutation = ( userName, roomId ) => {
    let mutation = ` mutation addUserToRoom {
        addUserToRoom(userName : "${userName}", roomId: "${roomId}" ){
            success
            error
        }
    }`;
    return  mutation;
}


const sendConversation = (fromUser, to, toType, text) => {
    let mutation = ` mutation send {
        sendConversation(userName: "${ fromUser }", to: "${ to }", toType: "${ toType }", text: "${ text }" ){
            success
            error
        }
    }
    `;
    return mutation
}


const updateConnectedStatus = (userName, status) => {
    let mutation = `mutation updateConnStatus {
        updateConnectedStatus(userName: "${userName}", status: ${status}){
            success
            error
        }
    }
    `;

    return mutation;
}


const loginUserMutation = (userName, gender) => `mutation login { loginUser(userName: "${ userName }", gender: "${gender}"){ \
    success \
    error \
  }  \
}`;

const logoutUserMutation = (userName) => `mutation logout { logoutUser(userName: "${ userName }"){ \
    success \
    error \
  }  \
}`;



module.exports = {
    addUserToRoomMutation,
    sendConversation,
    updateConnectedStatus,
    loginUserMutation,
    logoutUserMutation
}