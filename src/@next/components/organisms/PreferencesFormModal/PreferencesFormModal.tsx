import React from "react";
import { usePreferences } from "@hooks";
import { localesOptions } from "@temp/components/Locale";
import { IPreferences } from "@types";
import { Modal } from "../Modal";
import { PreferencesForm } from "../PreferencesForm";
import { IProps } from "./types";

export const PreferencesFormModal: React.FC<IProps> = ({
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
      <PreferencesForm
        preferences={preferences}
        localesOptions={localesOptions}
        formId={formId}
        handleSubmit={(data: IPreferences) => {
          hideModal();
          setPreferences(data);
        }}
      />
    </Modal>
  );
};
