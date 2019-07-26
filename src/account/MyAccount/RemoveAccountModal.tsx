import React from "react";
import { Modal } from "../../components";

export interface IRemoveAccountModal {
  isVisibleModal: boolean;
  hide: () => void;
}

const RemoveAccountModal: React.FC<IRemoveAccountModal> = ({
  isVisibleModal,
  hide,
}) => {
  return (
    <Modal
      show={isVisibleModal}
      title="Remove my account"
      formId="new-address-form"
      hide={hide}
      loading={false}
      submitBtnText="Remove"
      cancelBtnText="Cancel"
    >
      Are you sure you want to remove your account? This action is irreversible.
    </Modal>
  );
};

export default RemoveAccountModal;
