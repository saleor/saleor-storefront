import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

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

const Routes:React.SFC = () => (
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
)

export default Routes;