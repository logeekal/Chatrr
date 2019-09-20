const roomResolvers =  require('./users');
const userResolvers =  require('./rooms');
const subscriptions =  require('./subscriptions')
const logger = require('../../utils/logging').log(module);

// logger.debug('Got the Subscriptions');
// logger.debug(JSON.stringify(subscriptions));

module.exports = {
    Query: {
        ...roomResolvers.Query,
        ...userResolvers.Query,
    },
    Mutation: {
        ...roomResolvers.Mutation,
        ...userResolvers.Mutation
    },
    Subscription: {
        ...subscriptions
    }
}