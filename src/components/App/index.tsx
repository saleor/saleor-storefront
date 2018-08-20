import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import * as React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';

import {
  AccountPage,
  CategoryPage,
  CheckoutPage,
  ContentPage,
  HomePage,
  ProductPage,
  SearchPage,
  WishListPage
} from '..'

import './scss/index.scss';


interface AppProps {
  apolloClient: ApolloClient<any>
}

const App: React.SFC<AppProps> = ({apolloClient}) => (
  <ApolloProvider client={ apolloClient }>
    <Router>
      <React.Fragment>
        <header>
          <h1>Saleor e-commerce</h1>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/search/'>Search</Link></li>
              <li><Link to='/category/category/10'>Category</Link></li>
              <li><Link to='/product/product/10'>Product</Link></li>
              <li><Link to='/account/'>Account</Link></li>
              <li><Link to='/wish-list/'>Wish list</Link></li>
              <li><Link to='/checkout/12qwe13e23e232e/'>Checkout</Link></li>
              <li><Link to='/content-page/'>Content page</Link></li>
            </ul>
          </nav>
        </header>
        <section className="container">
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/search/" component={SearchPage}/>
            <Route path="/category/:slug([a-z-]+)/:id([0-9]+)/" component={CategoryPage}/>
            <Route path="/product/:slug([a-z-]+)/:id([0-9]+)/" component={ProductPage}/>
            <Route path="/account/" component={AccountPage}/>
            <Route path="/wish-list/" component={WishListPage}/>
            <Route path="/checkout/:id/" component={CheckoutPage}/>
            <Route component={ContentPage} />
          </Switch>
        </section>
        <footer></footer>
      </React.Fragment>
    </Router>
  </ApolloProvider>
)

export default App;