import React, { useCallback, useState } from "react";
import Card from "../Card";
import RemoveAccountModal from "./RemoveAccountModal";

export interface IRemoveAccount {}

const RemoveAccount: React.FC<IRemoveAccount> = () => {
  const [isVisibleModal, setModalVisibility] = useState(false);
  const showModal = useCallback(() => setModalVisibility(true), []);
  const hideModal = useCallback(() => setModalVisibility(false), []);
  return (
    <Card header="Remove Account">
      <p>
        If you want to remove your account from our store please use the link
        you can find below
      </p>
      <br />
      <p className="u-link" onClick={showModal}>
        Remove my account
      </p>
      <RemoveAccountModal isVisibleModal={isVisibleModal} hide={hideModal} />
    </Card>
  );
};

export default RemoveAccount;
