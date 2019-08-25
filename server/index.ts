import express = require('express');
import cors = require('cors');
const socket= require('socket.io');
const http =  require('http')

const  {importSchema} = require('graphql-import');
const { ApolloServer, gql } = require('apollo-server-express');

// const {makeExecutableSchema} = require('graph')


const typeDefs = importSchema('./schema.graphql');
// const typeDefs = gql`

// `

const app:   express.Application = express();

const gqlServer  = new ApolloServer({ typeDefs });

gqlServer.applyMiddleware({app, path: '/gql' })

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

const socketServer : SocketIO.Server = socket(server);

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

server.listen(3001, function() : void { 
    console.log(`Server Started`);
})