const { split, ApolloLink } = require('apollo-link');
const { HttpLink } = require('apollo-link-http');
const { WebSocketLink } = require('apollo-link-ws');
const { getMainDefinition } = require('apollo-utilities');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { ApolloClient } = require('apollo-client');
const Cookies = require('cookies');
const { setContext } = require('apollo-link-context');




const { logger } = require('../../../utils/logging').log(module);

const { SubscriptionClient } = require("subscriptions-transport-ws");




const fetch = require('node-fetch');
require('graphql-tag')
const ws = require('ws');
const wsEndpoint = 'ws://localhost:3001/graphql';

const httpEndPoint = 'http://localhost:3001/gql'

const subClient = new SubscriptionClient(wsEndpoint,{
    timeout: 20000,
    lazy: true,
    reconnect: true
},ws)

let wsLink = new WebSocketLink({
    uri: wsEndpoint,
    options: {
        reconnect: true,
        connectionCallback: (err, result) => {
            if(err){
                console.log(`Error connecting to Websocket ${JSON.stringify(err)}`);
            }else{
                console.log(`Connected to WebSocket :  ${result}`);
            }
        }
    },
    webSocketImpl: ws,
    
});

wsLink = new WebSocketLink(subClient);

const httpLink = new HttpLink({
    uri: httpEndPoint,
    credentials: 'include',
    fetch: fetch,
    fetchOptions: {
        credentials: 'include'
    },
});



const link = split(
    ({ query }) => {
        const def = getMainDefinition(query);
        return (def.kind === 'OperationDefinition' && def.operation == 'subscription');
    },
    wsLink,
    httpLink
);

let token = '';




const AuthLink = new ApolloLink((operation, forward) => {
    console.log(`Starting with Operations ${operation.operationName}`);
    console.log(JSON.stringify(operation));
   
    console.log(wsLink.request(operation))

    operation.setContext((context)=>{
        console.log(context);
        return {
                    headers: {
                        ...context.headers,
                        Cookie: token,
                    }
                }
    });
    const subscription =  forward(operation)
    console.log(`subscription is :  ${JSON.stringify(subscription)}`);
    subscription.subscribe({
        next: (result) => {
            console.log('In next');
            console.log(result);
            console.log(operation)
            let context = operation.getContext();
            if(context.response.headers){
                let headers = context.response.headers;
                if(headers.get('set-cookie')){
                    let token1 = headers.get("set-cookie").split(',')[0].split(';')[0]
                    let token2 = headers.get("set-cookie").split(',')[1].split(';')[0]
                    token = `${token1}; ${token2}`;
                    console.log(token);
                }
                
            }
            
        },
        error: err =>  console.error(err),
        complete: ()=> console.log(`Operation completed`)
    });
    return subscription;
});

const client = AuthLink.concat(link);

module.exports = client;