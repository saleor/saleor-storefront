import { useAuth } from "@saleor/sdk";
import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { createUploadLink } from "apollo-upload-client";
import { useRouter } from "next/router";
import React from "react";
import { ApolloProvider } from "react-apollo";

import { Loader } from "@components/atoms";
import { demoMode } from "@temp/constants";

import {
  Footer,
  MainMenu,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import authLink from "./linkJwt";
import Notifications from "./Notifications";

import "../globalStyles/scss/index.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URI || "/graphql/";
const linkOptions = {
  credentials: "include",
  uri: API_URL,
};
const uploadLink = createUploadLink(linkOptions);

const batchLink = new BatchHttpLink({
  batchInterval: 100,
  ...linkOptions,
});

const link = ApolloLink.split(
  operation => operation.getContext().useBatching,
  batchLink,
  uploadLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (obj: any) => {
      // We need to set manually shop's ID, since it is singleton and
      // API does not return its ID
      if (obj.__typename === "Shop") {
        return "shop";
      }
      return defaultDataIdFromObject(obj);
    },
  }),
  link: authLink.concat(link),
});

const App: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const { tokenRefreshing, tokenVerifying } = useAuth();
  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ShopProvider>
        <OverlayProvider pathname={pathname}>
          <MetaConsumer />
          <MainMenu demoMode={demoMode} />
          {children}
          <Footer />
          <OverlayManager />
          <Notifications />
        </OverlayProvider>
      </ShopProvider>
    </ApolloProvider>
  );
};

export default App;
