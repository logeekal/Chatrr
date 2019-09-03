const  express = require('express');
const cors = require('cors');
const socket= require('socket.io');
const http =  require('http')

const { UserAPI } = require('./gql/datasources/users')
const { RoomsAPI } = require('./gql/datasources/rooms')

const  {importSchema} = require('graphql-import');
const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./gql/resolvers');

const typeDefs = importSchema('./gql/schema.graphql');
const { store } = require('./db');

console.log(store);
const app  = express();

const gqlServer  = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        userAPI: new UserAPI({ store }),
        roomsAPI: new RoomsAPI({ store })
    }),
    playground: false,
    
});

gqlServer.applyMiddleware({app, path: '/gql' });

const server = http.createServer(app);

// const  corsOptions : any = {
//     origin: ['http://127.0.0.1:3001/', 'http:localhost:3000'],
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//     methods :  ['GET', 'PUT', 'POST','OPTIONS'],
//     credentials : true,
//     allowedHeaders : ['Content-Type', 'Authorization','Set-Cookie','Cookie']
//   }

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

const socketServer = socket(server);

socketServer.on('connection', (client) => {
    console.log('Client Connected');
    
    client.on('join', function(data) {
        console.log(data);
        client.emit('messages', 'Hello from Server..got your message');
    });

    client.on('messages', function(data){
        console.log(`Recieved from Client : ${data}`);
        if (data == 'Hey'){
            client.emit('messages','Hello');
        } 
    })
})

server.listen(3001, function() { 
    console.log(`Server Started`);
})