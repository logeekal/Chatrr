const  express = require('express');
const cors = require('cors');
const socket= require('socket.io');
const http =  require('http');
const cookieSession = require('cookie-session');

const expressSession = require('express-session');

const { isAuthenticated } = require('./utils/auth/auth');
const { AuthDirective } = require('./gql/directives/AuthDirective');

const pubsub =  require('./gql/subscriptions/pubsub');


const { SECRET } =  require('./configs/secrets');


const { UserAPI } = require('./gql/datasources/users')
const { RoomsAPI } = require('./gql/datasources/rooms')

const  {importSchema} = require('graphql-import');
const { ApolloServer, } = require('apollo-server-express');
const resolvers = require('./gql/resolvers');
const logger = require('./utils/logging').log(module);

const typeDefs = importSchema('./gql/schema.graphql');
const { store } = require('./db');



const app  = express();
app.use(cookieSession(
    SECRET.COOKIE_SESSION_OPTS
));





const  corsOptions = {
    origin: ['http://localhost:3001/', 'http:localhost:3000'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods :  ['GET', 'PUT', 'POST','OPTIONS'],
    credentials : true,
    allowedHeaders : ['Content-Type', 'Authorization','Set-Cookie','Cookie',]
  }


const gqlServer  = new ApolloServer({
    cors: corsOptions,
    typeDefs,
    resolvers,
    schemaDirectives :{
        auth: AuthDirective
    },
    dataSources: () => ({
        userAPI: new UserAPI({ store }),
        roomsAPI: new RoomsAPI({ store })
    }),
    playground: {
        'request.credentials': 'include'
    },
    
    context: ({req}) => {
        // console.log('Session.....');
        // // console.log(req);
        // // 
        // console.log(req.session);
        if(!req.session){
            // logger.debug(req.session)
            throw('Cookie not working fine.')
        }
        return {req};
        
    },
    subscriptions: {
        onConnect: (connectionParams, webSocket, context) => {
            logger.info('Subscription OnConnect Fired');
            logger.debug(connectionParams);
            logger.debug(webSocket);
        },
        onDisconnect: (webSocket, context) => {
            logger.info('WebSocket Disconnected');
            logger.debug(webSocket);
        }
    }
    
});


gqlServer.applyMiddleware({app, path: '/gql' , cors:true});

const server = http.createServer(app);

gqlServer.installSubscriptionHandlers(server);

// app.use(cors());
app.use(express.static(__dirname+'/node_modules/'));

app.get('/', ( req, res, next ) => {

    res.sendFile(__dirname + '/index.html');
    // res.send('Running Express Successfully');
});


// const socketOptions = {
//     handlePreFlightRequest: (req, res) => {
//         logger.debug('handling preflight');
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end()
//     }
// }

// const socketServer = socket(server);

// socketServer.on('connection', (client) => {
//     logger.debug('Client Connected');
    
//     client.on('join', function(data) {
//         logger.debug(data);
//         client.emit('messages', 'Hello from Server..got your message');
//     });

//     client.on('messages', function(data){
//         logger.debug(`Recieved from Client : ${data}`);
//         if (data == 'Hey'){
//             client.emit('messages','Hello');
//         } 
//     })
// })


server.listen(3001, () => {
    console.log(`🚀 Server ready at http://localhost:${3001}${gqlServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${3001}${gqlServer.subscriptionsPath}`)
  })
