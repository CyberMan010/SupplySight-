import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, HttpLink, InMemoryCache, gql, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";


const api_Key = import.meta.env.VITE_GRAPHQL_URI;

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // Remove the duplicate fetchPolicy
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  }
});

createRoot(document.getElementById('root')!).render(
   <ApolloProvider client={client}>
    <App />
   </ApolloProvider>,
)
