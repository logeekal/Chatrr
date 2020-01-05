import {ApolloClient, InMemoryCache, split} from 'apollo-boost';
import {constants} from '../../globals/constants';
import {createHttpLink, HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

console.log(`Server is ${constants.SERVER.http} `);

const httpLink = new HttpLink({
  uri: constants.SERVER.http,
  credentials: 'include',
  fetchOptions: {
    credentials: 'include',
  },
});

const wsLink = new WebSocketLink({
  uri: constants.SERVER.ws,
  options: {
    reconnect: true,
  },
});

const link = split(
  //split based on operation type
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind == 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default apolloClient;
