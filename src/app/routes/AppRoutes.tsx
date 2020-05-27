import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { PasswordReset } from "@pages";
import { CheckoutLogin, NotFound } from "../../components";
import UserAccount, * as accountPaths from "../../userAccount/routes";
import { OrderDetails } from "../../userAccount/views";
import { Account, AccountConfirm } from "../../views/Account";
import { ArticlePage } from "../../views/Article";
import { AvailableColors } from "../../views/CollectionIndex/Colors";
import { BrowseCabinets } from "../../views/BrowseCabinets";
import { CartPage } from "../../views/Cart";
import { CategoryPage } from "../../views/Category";
import { CollectionPage } from "../../views/Collection";
import { CollectionIndex } from "../../views/CollectionIndex";
import { CollectionItems } from "../../views/CollectionIndex/ItemsIncluded";
import { CollectionSamples } from "../../views/CollectionIndex/Samples";
import { CollectionSpecification } from "../../views/CollectionIndex/Specification";
import { HomePage } from "../../views/Home";
import OrderConfirmation from "../../views/OrderConfirmation/View";
import { ProductPage } from "../../views/Product";
import { SearchPage } from "../../views/Search";
import { ViewDetails } from "../../views/CollectionIndex/ViewDetails";
import { OrderSamples } from "../../views/Samples";
import { MyAccount } from "../../views/MyAccount";

import * as paths from "./paths";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={paths.baseUrl} component={HomePage} />
    <Route path={paths.myAccount} component={MyAccount} />
    <Route path={paths.searchUrl} component={SearchPage} />
    <Route path={paths.categoryUrl} component={CategoryPage} />
    <Route path={paths.collectionUrl} component={CollectionPage} />
    <Route path={paths.productUrl} component={ProductPage} />
    <Route path={paths.cartUrl} component={CartPage} />
    <Route path={paths.checkoutLoginUrl} component={CheckoutLogin} />
    <Route path={paths.pageUrl} component={ArticlePage} />
    <Route path={accountPaths.baseUrl} component={UserAccount} />
    <Route path={accountPaths.userOrderDetailsUrl} component={OrderDetails} />
    <Route path={paths.guestOrderDetailsUrl} component={OrderDetails} />
    <Route path={paths.orderConfirmationUrl} component={OrderConfirmation} />
    <Route path={paths.accountUrl} component={Account} />
    <Route path={paths.accountConfirmUrl} component={AccountConfirm} />
    <Route path={paths.orderHistoryUrl} component={Account} />
    <Route path={paths.addressBookUrl} component={Account} />
    <Route path={paths.paymentOptionsUrl} component={Account} />
    <Route path={paths.passwordResetUrl} component={PasswordReset} />
    <Route exact path={paths.browseCollection} component={BrowseCabinets} />
    <Route exact path={paths.cabinetCollection} component={CollectionIndex} />
    <Route
      exact
      path={paths.collectionAvailableColors}
      component={AvailableColors}
    />
    <Route path={paths.collectionViewDetails} component={ViewDetails} />
    <Route
      path={paths.collectionSpecification}
      component={CollectionSpecification}
    />
    <Route path={paths.collectionItemsIncluded} component={CollectionItems} />
    <Route path={paths.collectionSamples} component={CollectionSamples} />
    <Route path={paths.orderSamples} component={OrderSamples} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
