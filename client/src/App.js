import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AddPost from './components/AddPost';
import './App.css';
import Posts from './components/Posts';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({ // for cache data may be lost when replacing the field of a query object issue
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge: true,
          }
        }
      }
    }
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <AddPost />
        <Posts />
      </div>
    </ApolloProvider>
  );
}

export default App;
