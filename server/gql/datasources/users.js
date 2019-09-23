const { DataSource } = require('apollo-datasource');
const { Model, Sequelize } = require('sequelize')
const { error_codes } = require('../../configs/error_codes')
const logger = require('../../utils/logging').log(module);
class UserAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store
    }

    initialize(config) {
        this.context = config.context;
    }



    async find(filter) {
        logger.debug('Finding the user');
        logger.debug(filter)
        const user = await this.store.Users.findOne({
            ...filter,
            include: [{
                model: this.store.Conversations,
                as: 'recievedConversations'
            },{
                model: this.store.Conversations,
                as: 'sentConversations'
            },{
                model: this.store.Rooms
            }]
        });
        logger.debug(user)
        return user
    }

    async create({ userName, gender }) {
        // logger.debug('Loggin In User Now.');
        // logger.debug("In User API in GQL Data sources:  Context values is  : ");
        // logger.debug(this.context);
        const loggedIn = true;
        const result = await this.store.Users.create({
            userName,
            gender,
            loggedIn
        });
        logger.debug('Got the Result');
        logger.debug(result);
        return result;
    }


    /**
     * Romove function does not act
     * 
     * @param {string} userName userName which needs to be removed from the system.
     */
    async update(fields, condition) {
        logger.debug('Now updating');
        logger.debug(fields);
        logger.debug(condition)

        const result = await this.store.Users.update(fields, condition);
        logger.debug(result);
        return result;
    }


    async getUser(filter) {
        let result = this.store.Users.findAll(filter);

        if (!result) {
            logger.debug('Erro while fetching the user.');
        }
        return result;
    }


    async sendConversation({ currentUser, to, toType, text }) {
        logger.debug('Sending Conversations..');
        logger.debug(this.store.Users.associations);

        let result;
        logger.debug('Current User is : ');
        logger.debug(currentUser)
        if ((toType == 'ROOM') && (currentUser.loggedIn)) {

            result = await currentUser.createSentConversation({
                toRoom: to,
                toType: toType,
                text: text,
                sent: true
            });

        } else if ((toType == 'USER') && (currentUser.loggedIn) && currentUser.connected) {
            let recipient = await this.store.Users.findOne({
                where: {
                    userName: to
                }
            });

            if (recipient.loggedIn && recipient.connected) {
                result = await currentUser.createSentConversation({
                    toUser: recipient.id,
                    toType: toType,
                    text: text,
                    sent: true
                });
            } else {
                throw error_codes.RECIPIENT_DISCONNECTED
            }

        } else if (toType !== 'USER' && toType !== 'ROOM') {
            logger.debug(toType);
            throw error_codes.WRONG_TO_TYPE

        } else {
            logger.debug('Sender is not online')
            throw error_codes.SENDER_DISCONNECTED
        }


        logger.debug("========================")
        logger.debug(result);
        return result.dataValues;

    }


    async getConversations(currentUser) {
        // let result = await this.store.Users.findOne({
        //     where: {
        //         userName: userName
        //     }
        // })

        // currentUser =  new this.store.Users(currentUser);
        logger.debug("In get conversations.. Current user is : ")
        logger.debug(currentUser);

        // Now we have got the user. Now getting the conversations.
        let orderClause = {
            order: [
                'createdAt'
            ]

        }
        logger.debug('Getting Sent Conversations User');
        const sentConversations = await currentUser.getSentConversations(orderClause);

        //Now getting Recieved Conversations
        logger.debug('Getting Recieved Conversations User');
        const receivedConversations = await currentUser.getRecievedConversations(orderClause);

        return {
            sentConversations,
            receivedConversations

        }
    }
}

module.exports = {
    UserAPI
}