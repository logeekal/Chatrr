const { DataSource } = require('apollo-datasource');
const { Model, Sequelize } = require('sequelize')
const { error_codes } = require('../../configs/error_codes')

class UserAPI extends DataSource {
    constructor( {store} ) {
        super();
        this.store = store
    }

    initialize(config) {
        this.context = config.context;
    }

    

    async find( filter) {
        console.log('Finding the user');
        console.log(filter)
        const user= await this.store.Users.findOne( filter );
        console.log(user)
        return user
    }

    async create({ userName, gender }) {
        // console.log('Loggin In User Now.');
        // console.log("In User API in GQL Data sources:  Context values is  : ");
        // console.log(this.context);
        const loggedIn = true;
        const result = await this.store.Users.create({
            userName,
            gender,
            loggedIn
        });
        console.log('Got the Result');
        console.log(result);
        return result;
    }


    /**
     * Romove function does not act
     * 
     * @param {string} userName userName which needs to be removed from the system.
     */
    async update(fields,condition) {
        console.log('Now updating');
        console.log(fields);
        console.log(condition)

        const result = await this.store.Users.update(fields, condition);
        console.log(result);
        return result;
    }


    async getUser(filter) {
        let result = this.store.Users.findAll({
            where : {
                userName: userName
            }
        });

        if(!result){
            console.log('Erro while fetching the user.');
        }
        return result;
    }


    async sendConversation({userName, to, toType, text}) {
        console.log('Sending Conversations..');
        console.log(this.store.Users.associations);

    let filter = {
        where : {
            userName : userName
        },
        include: [
            {
                model: this.store.Conversations,
                as: 'sentConversations'
            }
        ]
    }

    let currentUser = await  this.store.Users.findOne(filter);
    let result;
    console.log(currentUser)
    if ((toType == 'ROOM') && (currentUser.loggedIn)){

        result =  await currentUser.createSentConversation({
            toRoom: to,
            toType: toType, 
            text: text,
            sent: true
        });

    }else if((toType == 'USER') &&  (currentUser.loggedIn) && currentUser.connected)  {
        let recipient = await this.store.Users.findOne({
            where : {
                userName : to
            }
        });

        if( recipient.loggedIn && recipient.connected){
            result = await currentUser.createSentConversation({
                toUser: recipient.id,
                toType: toType, 
                text: text,
                sent: true
            });
        }else{
            throw error_codes.RECIPIENT_DISCONNECTED
        }
        
    }else if(toType !== 'USER' && toType !== 'ROOM' ){
        console.log(toType);
        throw error_codes.WRONG_TO_TYPE
            
    }else {
        console.log('Sender is not online')
        throw error_codes.SENDER_DISCONNECTED
    }
    
   
        console.log("========================")
        console.log(result);
        return result;
        
    }


    async getConversations({userName}) {
        let result = await this.store.Users.findOne({
            where: {
                userName: userName
            }
        })

        // Now we have got the user. Now getting the conversations.
        let orderClause = {
            order: [
              'createdAt'
            ]
                        
  }
        console.log('Getting Sent Conversations User');
        const sentConversations = await result.getSentConversations(orderClause);

        //Now getting Recieved Conversations
        console.log('Getting Recieved Conversations User');
        const receivedConversations = await result.getRecievedConversations(orderClause);

        return {
            sentConversations,
            receivedConversations
            
        }
    }
}

module.exports = {
    UserAPI
}