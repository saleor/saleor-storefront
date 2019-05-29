import React, { useContext } from "react";
import { Modal } from "../../components";
import { UserContext } from "../../components/User/context";

export interface IRemoveAccountModal {
  isVisibleModal: boolean;
  hide: () => void;
}

const RemoveAccountModal: React.FC<IRemoveAccountModal> = ({
  isVisibleModal,
  hide
}) => {
  const user = useContext(UserContext);
  return (
    <Modal
      show={isVisibleModal}
      title="Remove my account"
      formId="new-address-form"
      hide={hide}
      loading={false}
      submitBtnText="Remove"
      cancelBtnText="Cancel"
      onClick={user.removeAccount}
    >
      Are you sure you want to remove your account? This action is irreversible.
    </Modal>
  );
};

export default RemoveAccountModal;
