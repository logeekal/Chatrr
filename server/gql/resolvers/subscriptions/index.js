const topics =  require('./topics');
const pubsub = require('./pubsub');
const { withFilter } = require('apollo-server');
const logger = require('../../../utils/logging').log(module);
const  { isAuthenticated } = require('../../../utils/auth/auth');



let result = {};


const genSubscriptions = (topics) => {
    
    Object.keys(topics).map((key)=>{
        result = {
            ...result,
            [topics[key].subscription]: {
                subscribe: () => pubsub.asyncIterator([topics[key].topic])
            }
        };
    });

    // additional manually settable subscriptions.
    result =  {
        ...result,
        [topics.NEW_CHAT_MESSAGE_TO_USER.subscription]: {
            subscribe: withFilter(
                () => pubsub.asyncIterator([topics.NEW_CHAT_MESSAGE_TO_USER.topic]),
                (payload, variables, context) => {
                    let currentUser =  isAuthenticated(context);
                    logger.debug('In filter Function for User. Below is the payload');
                    logger.debug(payload)
                    return payload.toType === 'USER' && payload.to === currentUser.userName
                }
            )
        },
        [topics.NEW_CHAT_MESSAGE_TO_ROOM.subscription]: {
            subscribe: withFilter(
                () => pubsub.asyncIterator([topics.NEW_CHAT_MESSAGE_TO_ROOM.topic]),
                (payload, variables, context) => {
                    isAuthenticated(context);
                    logger.debug('In filter Function for Room. Below is the payload');
                    logger.debug(payload)
                    return payload.toType === 'ROOM' && payload.to === variables.roomId
                }
            )
        }
    }
    return result;
}


module.exports = genSubscriptions(topics)