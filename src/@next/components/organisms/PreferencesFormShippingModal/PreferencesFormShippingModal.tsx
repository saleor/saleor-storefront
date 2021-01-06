import React from "react";
import { usePreferences } from "@hooks";
import { localesOptionsShipsTo } from "@temp/components/Locale";
import { IPreferences } from "@types";
import { Modal } from "../Modal";
import { PreferencesFormShipping } from "../PreferencesFormShipping";
import { IProps } from "./types";

export const PreferencesFormShippingModal: React.FC<IProps> = ({
  hideModal,
  submitBtnText,
  target,
  title,
  formId,
}: IProps) => {
  const [show, setShow] = React.useState(true);
  const { preferences, setPreferences } = usePreferences();

  return (
    <Modal
      submitButtonTestingContext="submitPreferencesFormModalButton"
      testingContext="submitPreferencesFormModal"
      title={title}
      hide={() => {
        hideModal();
        setShow(false);
      }}
      formId={formId}
      disabled={false}
      show={show}
      target={target}
      submitBtnText={submitBtnText}
    >
      <PreferencesFormShipping
        preferences={preferences}
        localesOptions={localesOptionsShipsTo}
        formId={formId}
        handleSubmit={(data: IPreferences) => {
          hideModal();
          window.localStorage.setItem("shipsTo", data.locale);
          setPreferences(data);
        }}
      />
    </Modal>
  );
};
