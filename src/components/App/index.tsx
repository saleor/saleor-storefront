import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";

import { default as Routes } from "./routes";
import { MainMenu } from "..";

import "./scss/index.scss";

interface AppProps {
  apolloClient: ApolloClient<any>;
}

const App: React.SFC<AppProps> = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <React.Fragment>
        <header>
          <MainMenu />
          <h1>Saleor e-commerce</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search/">Search</Link>
              </li>
              <li>
                <Link to="/category/category/10">Category</Link>
              </li>
              <li>
                <Link to="/product/product/10">Product</Link>
              </li>
              <li>
                <Link to="/account/">Account</Link>
              </li>
              <li>
                <Link to="/wish-list/">Wish list</Link>
              </li>
              <li>
                <Link to="/checkout/12qwe13e23e232e/">Checkout</Link>
              </li>
              <li>
                <Link to="/content-page/">Content page</Link>
              </li>
            </ul>
          </nav>
        </header>
        <section className="container">
          <Routes />
        </section>
        <footer />
      </React.Fragment>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
