const error_codes = {
    SENDER_DISCONNECTED :{
        name: "SENDER_DISCONNECTED",
        message: "SENDER IS NO LONGER LOGGED IN"
    },
    RECIPIENT_DISCONNECTED: {
        name: "RECIPIENT_DISCONNECTED",
        message: "Recipient is no longer connected."
    },
    WRONG_TO_TYPE: {
        name: "WRONG_TO_TYPE",
        message: "Wrong value supplied for To Type"
    }

}


module.exports = {
    error_codes
}