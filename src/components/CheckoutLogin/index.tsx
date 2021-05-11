import { useAuth } from "@saleor/sdk";
import { NextPage } from "next";
import React from "react";

import { OfflinePlaceholder, Redirect } from "@components/atoms";
import { paths } from "@paths";

import { Offline, Online } from "..";
import SignInForm from "./SignInForm";

import "./scss/index.scss";

const CheckoutLogin: NextPage = () => {
  const { user } = useAuth();

  return user ? (
    <Redirect url={paths.home} />
  ) : (
    <div className="container">
      <Online>
        <div className="checkout-login">
          <div className="checkout-login__user">
            <SignInForm />
          </div>
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  );
};

export default CheckoutLogin;
