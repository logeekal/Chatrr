const roomResolvers =  require('./users');
const userResolvers =  require('./rooms');

module.exports = {
    Query: {
        ...roomResolvers.Query,
        ...userResolvers.Query,
    },
    Mutation: {
        ...roomResolvers.Mutation,
        ...userResolvers.Mutation
    }
}