import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8080/v1/graphql',
      headers: {
      }
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
