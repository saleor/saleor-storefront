import React, { useCallback, useState } from "react";
import Card from "../Card";
import RemoveAccountModal from "./RemoveAccountModal";
import CardHeader from "../CardHeader";

export interface IRemoveAccount {}

const RemoveAccount: React.FC<IRemoveAccount> = () => {
  const [isVisibleModal, setModalVisibility] = useState(false);
  const showModal = useCallback(() => setModalVisibility(true), []);
  const hideModal = useCallback(() => setModalVisibility(false), []);

  const header = <CardHeader title="Remove Account" />;
  const content = (
    <>
      <p>
        If you want to remove your account from our store please use the link
        you can find below
      </p>
      <br />
      <p className="u-link" onClick={showModal}>
        Remove my account
      </p>
      <RemoveAccountModal isVisibleModal={isVisibleModal} hide={hideModal} />
    </>
  );
  return <Card header={header}>{content}</Card>;
};

export default RemoveAccount;
