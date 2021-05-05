import { useAuth } from "@saleor/sdk";
import React from "react";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";

import { Modal } from "@components/organisms";
import { orange } from "@styles/constants";

import { TypedFollowMutation } from "./queries";
import * as S from "./styles";

interface IProps {
  isActive: boolean;
  storeId: string;
  setRerender: (value: boolean) => void;
}

function FollowButton({ isActive, storeId, setRerender }: IProps) {
  const [showModal, setShowModal] = React.useState(false);

  const { user } = useAuth();
  const alert = useAlert();
  const intl = useIntl();

  return (
    <S.Wrapper>
      <S.WrapperContainer>
        {storeId ? (
          <TypedFollowMutation
            onCompleted={() => {
              setRerender(true);
            }}
          >
            {(followStore, { data, loading }) => {
              return (
                <>
                  <S.Button
                    isActive={isActive}
                    color={orange}
                    onClick={() => {
                      if (!user) {
                        return alert.show(
                          {
                            title: intl.formatMessage({
                              defaultMessage: "You must login first!",
                            }),
                          },
                          { type: "error" }
                        );
                      }
                      if (isActive) {
                        setShowModal(true);
                        return;
                      }
                      followStore({
                        variables: { store: storeId, follow: true },
                      });
                    }}
                  >
                    {loading ? "Waiting" : isActive ? "Following" : "Follow"}
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
                        followStore({
                          variables: { store: storeId, follow: false },
                        });
                      }}
                      minHeight={155}
                      padding="1rem 1.8rem"
                    >
                      Do you want to unfollow ?
                    </Modal>
                  </div>
                </>
              );
            }}
          </TypedFollowMutation>
        ) : null}
      </S.WrapperContainer>
    </S.Wrapper>
  );
}

export default FollowButton;
