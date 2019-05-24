import "./scss/MyAccount.scss";
import React from "react";
import Newsletter from "./Newsletter";

export interface IMyAccount {}

const MyAccount: React.FC<IMyAccount> = () => (
  <>
    <div className="my-account-container">
      <div className="my-account-container__item">
        <Newsletter />
      </div>
      <div className="my-account-container__item">
        <Newsletter />
      </div>
      <div className="my-account-container__item">
        <Newsletter />
      </div>
      <div className="my-account-container__item">
        <Newsletter />
      </div>
    </div>
  </>
);

export default MyAccount;
