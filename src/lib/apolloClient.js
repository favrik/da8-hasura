import { ApolloClient, HttpLink, from, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'all'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  },
};

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, new HttpLink({ uri: 'http://localhost:8080/v1/graphql' })]),
    defaultOptions
  });
};

export default createApolloClient;
