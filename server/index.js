const  express = require('express');
const cors = require('cors');
const socket= require('socket.io');
const http =  require('http');
const cookieSession = require('cookie-session');

const expressSession = require('express-session');

const { isAuthenticated } = require('./utils/auth/auth');


const { SECRET } =  require('./configs/secrets');


const { UserAPI } = require('./gql/datasources/users')
const { RoomsAPI } = require('./gql/datasources/rooms')

const  {importSchema} = require('graphql-import');
const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./gql/resolvers');

const typeDefs = importSchema('./gql/schema.graphql');
const { store } = require('./db');


const app  = express();
app.use(cookieSession(
    SECRET.COOKIE_SESSION_OPTS
));


// app.use(expressSession({
//     name: 'express-session-cookie',
//     secret: 'asdas',
//     resave: false,
//     saveUninitialized: false,
//     cookie : {
//         secure: false,
//         httpOnly: false,
//     },
// }))

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
    dataSources: () => ({
        userAPI: new UserAPI({ store }),
        roomsAPI: new RoomsAPI({ store })
    }),
    playground: {
        'request.credentials': 'include'
    },
    
    context: ({req}) => {
        console.log('Session.....');
        // console.log(req);
        console.log(req.session);
        console.log(req.session.id);

        if(!req.session){
            console.log(req.session)
            throw('Just like that')
        }
        return {req};
        
    }
    
});

gqlServer.applyMiddleware({app, path: '/gql' , cors:true});

// gqlServer.applyMiddleware(cookieSession(SECRET.COOKIE_SESSION_OPTS));

// app.use('/gql',
//     (req, _, next) => {
//         console.log(req.session);
//         return next();
//     },
//     gqlServer
// )

const server = http.createServer(app);



// app.use(cors());
app.use(express.static(__dirname+'/node_modules/'));

app.get('/', ( req, res, next ) => {

    res.sendFile(__dirname + '/index.html');
    // res.send('Running Express Successfully');
});


// const socketOptions = {
//     handlePreFlightRequest: (req, res) => {
//         console.log('handling preflight');
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
//     console.log('Client Connected');
    
//     client.on('join', function(data) {
//         console.log(data);
//         client.emit('messages', 'Hello from Server..got your message');
//     });

//     client.on('messages', function(data){
//         console.log(`Recieved from Client : ${data}`);
//         if (data == 'Hey'){
//             client.emit('messages','Hello');
//         } 
//     })
// })

server.listen(3001, function() { 
    console.log(`Server Started`);
})
