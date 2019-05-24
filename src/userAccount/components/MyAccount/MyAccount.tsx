import React from "react";
import MyPassword from "./MyPassword";
import Newsletter from "./Newsletter";
import RemoveAccount from "./RemoveAccount";
import "./scss/MyAccount.scss";
import MyData from "./MyData";

export interface IMyAccount {}

const MyAccount: React.FC<IMyAccount> = () => (
  <>
    <div className="my-account-container">
      <div className="my-account-container__item">
        <MyData />
      </div>
      <div className="my-account-container__item">
        <Newsletter />
      </div>
      <div className="my-account-container__item">
        <MyPassword />
      </div>
      <div className="my-account-container__item">
        <RemoveAccount />
      </div>
    </div>
  </>
);

export default MyAccount;
