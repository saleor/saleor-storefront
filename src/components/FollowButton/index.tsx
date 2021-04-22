import React from "react";

import { Modal } from "@components/organisms";
import { orange } from "@styles/constants";

import * as S from "./styles";

interface IProps {
  isActive: boolean;
  setStt: any;
}

function FollowButton({ isActive, setStt }: IProps) {
  const styles: any = {
    display: "inline-block",
    backgroundColor: isActive ? orange : "#fff",
    width: "120px",
    padding: "8px 0",
    color: isActive ? "#fff" : orange,
    border: `1px solid`,
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  };
  const [showModal, setShowModal] = React.useState(false);
  return (
    <S.Wrapper>
      <S.WrapperContainer style={{ marginTop: "20px" }}>
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
      </S.WrapperContainer>
    </S.Wrapper>
  );
}

export default FollowButton;
