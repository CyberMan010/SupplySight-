import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import type { DefaultOptions } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';

// Environment configuration
const config = {
  graphqlUri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:4000/',
  retryAttempts: 3,
  retryDelay: 1000,
};

// HTTP link for GraphQL requests
const httpLink = createHttpLink({
  uri: config.graphqlUri,
  credentials: 'same-origin',
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
const errorLink = onError(({ graphqlErrors, networkError, operation, forward }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message, locations, path, extensions }) => {
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
    if ((networkError as any).statusCode === 401) {
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
          merge(_, incoming) {
            return incoming;
          }
        }
      }
    }
  }
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
export const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    }
  },
  connectToDevTools: true
});

// Helper function to clear cache
export const clearCache = () => {
  client.clearStore();
};

// Helper function to refetch all queries
export const refetchQueries = () => {
  client.refetchQueries({ include: 'active' });
};