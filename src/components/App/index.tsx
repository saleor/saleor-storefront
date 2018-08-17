import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './scss/index.scss';


interface AppProps {
  apolloClient: ApolloClient<any>
}
   

class App extends React.Component<AppProps> {
  render() {
    const { apolloClient } = this.props;
    return (
      <ApolloProvider client={ apolloClient }>
        <Router>
          <React.Fragment>
            <header>
              <h1>Saleor e-commerce</h1>
            </header>
            <section className="container">
              <Switch>
                <Route exact path="/" />
              </Switch>
            </section>
            <footer></footer>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;