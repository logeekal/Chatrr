const addUserToRoomMutation = ( userName, roomId ) => {
    let mutation = ` mutation addUserToRoom {
        addUserToRoom(roomId: "${roomId}" ){
            success
            error
        }
    }`;
    return  mutation;
}


const sendConversation = (fromUser, to, toType, text) => {
    let mutation = ` mutation send {
        sendConversation(to: "${ to }", toType: "${ toType }", text: "${ text }" ){
            success
            error
        }
    }
    `;
    return mutation
}


const updateConnectedStatus = (userName, status) => {
    let mutation = `mutation updateConnStatus {
        updateConnectedStatus(status:${status}) {
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

const logoutUserMutation = (userName) => `mutation logout { logoutUser { \
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