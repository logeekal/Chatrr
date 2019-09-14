const { PubSub } = require('graphql-subscriptions');
const logger = require('../../utils/logging').log(module);

const pubsub = new PubSub();


module.exports = {
    newUserInRoom :{
        resolve: (payload) => {
            logger.debug(`In Resolve for Subsription. Payload is : `);
            logger.debug(payload)
            return {
                payload
            }
        },
        subscribe:  () => pubsub.asyncIterator('newUserInRoom')
    }
}