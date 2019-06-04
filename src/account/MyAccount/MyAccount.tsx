import React from "react";

import MyData from "./MyData";
import MyPassword from "./MyPassword";
import Newsletter from "./Newsletter";
import RemoveAccount from "./RemoveAccount";
import "./scss/MyAccount.scss";

const MyAccount: React.FC = () => (
  <div className="my-account-container">
    <div className="my-account-container__column">
      <div className="my-account-container__item">
        <MyData />
      </div>
      <div className="my-account-container__item">
        <MyPassword />
      </div>
    </div>
    <div className="my-account-container__column">
      <div className="my-account-container__item">
        <Newsletter />
      </div>
      <div className="my-account-container__item">
        <RemoveAccount />
      </div>
    </div>
  </div>
);

export default MyAccount;
