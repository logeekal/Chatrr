const { DataSource } = require('apollo-datasource');
const { Model } = require('sequelize')


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
        
        const users = await this.store.Users.findOrCreate( { where: { userName: name } } );
        console.log(users)
        return users && users[0] ? users[0] : null;
    }

    async create({ userName, gender }) {
        console.log('Loggin In User Now.');
        console.log("In User API in GQL Data sources:  Context values is  : ");
        console.log(this.context);
        const loggedIn = true;
        const result = await this.store.Users.create({
            userName,
            gender,
            loggedIn
        });
        console.log('Got the Result');
        console.log(result);
    }

    
    /**
     * Romove function does not act
     * 
     * @param {string} userName userName which needs to be removed from the system.
     */
    async update(fields,condition) {
        console.log('updating fields logout.')
        console.log(fields);
        console.log(condition)

        const result = await this.store.Users.update(fields, condition);
        return result;

    }
}

module.exports = {
    UserAPI
}