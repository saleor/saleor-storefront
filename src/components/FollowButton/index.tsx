import React from "react";

import { Modal } from "@components/organisms";
import { orange } from "@styles/constants";

import * as S from "./styles";

interface IProps {
  isActive: boolean;
  setStt: any;
}

function FollowButton({ isActive, setStt }: IProps) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <S.Wrapper>
      <S.WrapperContainer style={{ marginTop: "20px" }}>
        <S.Button
          isActive={isActive}
          color={orange}
          onClick={() => {
            if (isActive) {
              setShowModal(true);
              return;
            }
            setStt(true);
          }}
        >
          {isActive ? "Unfollow" : "Follow"}
        </S.Button>
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
            padding="1rem 1.8rem"
          >
            Do you want to unfollow ?
          </Modal>
        </div>
      </S.WrapperContainer>
    </S.Wrapper>
  );
}

export default FollowButton;
