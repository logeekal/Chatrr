

const findOrcreateUser = (_, __, {dataSources}) => {
    console.log('me query triggerd');
    dataSources.userAPI.findOrCreateUser({userName: 'testUser'})
}


const Query = {
    me: findOrcreateUser
}

module.exports = {
    Query
}