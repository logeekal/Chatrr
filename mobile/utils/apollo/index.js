import { ApolloClient, InMemoryCache } from "apollo-boost";
import { constants } from "../../globals/constants";
import { createHttpLink, HttpLink } from "apollo-link-http";


const httpLink = new HttpLink({
    uri: constants.SERVER.http,
    credentials: 'include',
    fetchOptions: {
        credentials: 'include'
    }
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default apolloClient;