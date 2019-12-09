import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});
class App extends Component {
  render() {
    return (
      //self note --- Use Browser Router to route to different pages
      <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          {/* self note --- App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
      </ApolloProvider>
    );
  }
}
//self note --- Export the App component so that it can be used in index.js
export default App;
