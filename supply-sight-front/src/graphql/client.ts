import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  DefaultOptions,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';

// Environment configuration
const config = {
  graphqlUri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4000',
  retryAttempts: 3,
  retryDelay: 1000,
};

// HTTP link for GraphQL requests
const httpLink = createHttpLink({
  uri: config.graphqlUri,
  credentials: 'include',
});

// Auth link for adding authentication headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  };
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // Handle specific error codes
      if (extensions?.code === 'UNAUTHENTICATED') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    // Handle network errors
    if (networkError.statusCode === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  }
});

// Retry link for handling temporary failures
const retryLink = new RetryLink({
  delay: {
    initial: config.retryDelay,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: config.retryAttempts,
    retryIf: (error, _operation) => !!error && error.statusCode !== 401,
  },
});

// Cache configuration with type policies
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: {
          keyArgs: ['search', 'status', 'warehouse'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        kpis: {
          keyArgs: ['range'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    Product: {
      keyFields: ['id'],
      fields: {
        stock: {
          merge: true,
        },
        demand: {
          merge: true,
        },
      },
    },
    Warehouse: {
      keyFields: ['code'],
    },
  },
});

// Default options for queries and mutations
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  },
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: from([
    errorLink,
    retryLink,
    authLink,
    httpLink,
  ]),
  cache,
  defaultOptions,
  connectToDevTools: process.env.NODE_ENV === 'development',
});

// Helper function to clear cache
export const clearCache = () => {
  apolloClient.clearStore();
};

// Helper function to refetch all queries
export const refetchQueries = () => {
  apolloClient.refetchQueries({ include: 'active' });
};