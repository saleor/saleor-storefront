import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { CartPage, CheckoutLogin, HomePage, ProductPage, SearchPage } from "..";
import ArticlePage from "../../views/Article";
import CategoryPage from "../../views/Category";
import { NotFound } from "../NotFound";

export const baseUrl = "/";
export const searchUrl = `${baseUrl}search/`;
export const categoryUrl = `${baseUrl}category/:slug([a-z-]+)/:id([0-9]+)/`;
export const productUrl = `${baseUrl}product/:slug([a-z-]+)/:id([0-9]+)/`;
export const cartUrl = `${baseUrl}cart/:token/`;
export const checkoutLoginUrl = `${baseUrl}login/`;
export const pageUrl = `${baseUrl}page/:slug/`;

export const Routes: React.SFC = () => (
  <Switch>
    <Route exact path={baseUrl} component={HomePage} />
    <Route path={searchUrl} component={SearchPage} />
    <Route path={categoryUrl} component={CategoryPage} />
    <Route path={productUrl} component={ProductPage} />
    <Route path={cartUrl} component={CartPage} />
    <Route path={checkoutLoginUrl} component={CheckoutLogin} />
    <Route path={pageUrl} component={ArticlePage} />
    <Route component={NotFound} />
  </Switch>
);
