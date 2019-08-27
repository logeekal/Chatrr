const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
    constructor( {store} ) {
        super();
        this.store = store
    }

    initialize(config) {
        this.context = config.context;
    }

    async findOrCreateUser( { userName } = {} ) {
        const name = this.context && this.context.user ? this.context.user.userName : userName;
        
        const users = await this.store.Users.findOrCreate( { where: { name } } );
        return users && users[0] ? users[0] : null;
    }
}

module.exports = {
    UserAPI
}