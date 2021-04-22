import React from "react";

import { Modal } from "@components/organisms";

interface IProps {
  isActive: boolean;
  setStt: any;
}

function FollowButton({ isActive, setStt }: IProps) {
  const styles: any = {
    display: "inline-block",
    backgroundColor: isActive ? "#FF6A00" : "#fff",
    padding: "10px 15px",
    color: isActive ? "#fff" : "#FF6A00",
    border: `1px solid`,
    borderRadius: "5px",
    userSelect: "none",
  };
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div>
      <p
        style={styles}
        onClick={() => {
          if (isActive) {
            setShowModal(true);
            return;
          }
          setStt(true);
        }}
      >
        {isActive ? "Unfollow" : "Follow"}
      </p>
      <div className="modal">
        <Modal
          submitButtonTestingContext="submitAddressFormModalButton"
          testingContext="submitAddressFormModal"
          title="Notify"
          hide={() => {
            setShowModal(false);
          }}
          disabled={false}
          show={showModal}
          submitBtnText="Yes"
          cancelBtnText="No"
          onSubmit={() => {
            setShowModal(false);
            setStt(false);
          }}
          minHeight={155}
        >
          Do you want to unfollow ?
        </Modal>
      </div>
    </div>
  );
}

export default FollowButton;
