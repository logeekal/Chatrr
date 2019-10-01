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
const ws = require('ws');


const wsEndpoint = 'ws://localhost:3001/graphql';

const httpEndPoint = 'http://localhost:3001/gql'


class Client {
    constructor(){
        this.token = '';
        this.subClient = new SubscriptionClient(wsEndpoint,{
            timeout: 20000,
            lazy: true,
            reconnect: true
        },ws) ;

        this.wsLink = new WebSocketLink({
            uri: wsEndpoint,
            options: {
                reconnect: true,
                connectionParams: () => {
                    return {
                    token: this.token
                }
            },
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
        
        this.wsLink = new WebSocketLink(this.subClient);
        this.httpLink = new HttpLink({
            uri: httpEndPoint,
            credentials: 'include',
            fetch: fetch,
            fetchOptions: {
                credentials: 'include'
            },
        });

        this.link = split(
            ({ query }) => {
                const def = getMainDefinition(query);
                return (def.kind === 'OperationDefinition' && def.operation == 'subscription');
            },
            this.wsLink,
            this.httpLink
        );

        this.authLink = new ApolloLink( (operation, forward) => {
            console.log(operation)
            console.log(forward)
            console.log(`Starting with Operations ${operation.operationName}`);
           
            operation.setContext((context)=>{
                console.log(context);
                return {
                            headers: {
                                ...context.headers,
                                'x-access-token': this.token
                                // Cookie: this.token,
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
                    if(operation.operationName == 'login'){
                        this.tokentoken =  result.data.token;
                    }else if (operation.operationName == 'logout'){
                        this.token = null;
                    }
                    // let context = operation.getContext();
                    // if(context.response.headers){
                    //     let headers = context.response.headers;
                    //     if(headers.get('set-cookie')){
                    //         let token1 = headers.get("set-cookie").split(',')[0].split(';')[0]
                    //         let token2 = headers.get("set-cookie").split(',')[1].split(';')[0]
                    //         token = `${token1}; ${token2}`;
                    //         console.log(token);
                    //     }
                        
                    // }
                    
                },
                error: err =>  console.error(err),
                complete: ()=> console.log(`Operation completed`)
            });
            return subscription;
        });

        this.client =  this.authLink.concat(this.link)
    }
}

















// let token = '';




// const 

// const client = AuthLink.concat(link);

module.exports = Client;