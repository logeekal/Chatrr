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

    

    async find( { userName } = {} ) {
        const name = this.context && this.context.user ? this.context.user.userName : userName;
        
        const users = await this.store.Users.findAll( { where: { userName: name } } );
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
        console.log(fields);
        console.log(condition)

        const result = await this.store.Users.update(fields, condition);
        console.log(result);
        return result;
    }


    async getConversations({userName}) {
        let result = await this.store.Users.find({
            where: {
                userName: userName
            }
        })

        // Now we have got the user. Now getting the conversations.
        console.log('Getting Sent Conversations User');
        sentConversations = await result.getSentConversations();

        //Now getting Recieved Conversations
        console.log('Getting Recieved Conversations User');
        receivedConversations = await result.getRecievedConversations();

        return {
            sentConversations,
            receivedConversations
        }
    }
}

module.exports = {
    UserAPI
}