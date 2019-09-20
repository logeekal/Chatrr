require('dotenv').config();

const { AmqpPubSub }  = require('graphql-rabbitmq-subscriptions');
const logger = require('../../../utils/logging').log(module);
const { createLogger } = require('bunyan');

require('dotenv').config();

let  pubsub 



const init = () => {

    if(!pubsub){
        
        let pubsubLogger = createLogger({
            name : 'PubSub Logger',
            level: process.env.environment == 'production' ? 'info': 'trace'
        });


        pubsub = new AmqpPubSub({
            config: {
                host: `${process.env.MQ_USER}:${process.env.MQ_PASS}@${process.env.MQ_HOST}`,
                port: process.env.MQ_PORT,
                // exchange: {
                //     name: 'amq.topic', 
                //     type: 'topic',
                //     durability: true,
                //     autodelete: false,
                //     internal: false,
                //     arguments: {
                //         "alternate-exchange": String
                //     }
                // },
                // // Object, Queue creation params
                // queue: {
                //     name: 'NEW_LOGIN',
                //     durability: true,
                //     autodelete: false,   
                //     // If exists, shoud be pass to rabbitmq server
                // },
            },
            // triggerTransform: (trigger, {path}) => {
            //     [trigger,...path].join('.');
            // },
            connectionListener: (err) =>{
                if(err){
                    logger.error(`Cannot connect to RabbitMQ Server @ ${process.env.MQ_HOST}: ${process.env.MQ_PORT}`);
                }else{
                    logger.info(`Connected to RabbitMQ pubsub Now @ ${process.env.MQ_HOST}:${ process.env.MQ_PORT }`)
                }
            },
            logger: pubsubLogger,
        });

        logger.debug(pubsub)
    }

    return pubsub;
} 


module.exports =  init()
