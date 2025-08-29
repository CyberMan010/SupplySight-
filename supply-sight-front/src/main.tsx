import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, HttpLink, InMemoryCache, gql, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";


const api_Key = import.meta.env.VITE_GRAPHQL_URI;

const client = new ApolloClient({
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.error(`GraphQL error: ${message}`)
        );
      }
      if (networkError) console.error(`Network error: ${networkError}`);
    }),
    new HttpLink({ uri: api_Key || "http://localhost:4000/" })
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ['id'],
        fields: {
          stock: {
            merge: true
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all'
    }
  }
});

createRoot(document.getElementById('root')!).render(
   <ApolloProvider client={client}>
    <App />
   </ApolloProvider>,
)
