import { useCreateUserAddress, useUpdateUserAddress } from "@saleor/sdk";
import { CountryCode } from "@saleor/sdk/lib/gqlTypes/globalTypes";
import React from "react";

import { AddressForm } from "../AddressForm";
import { Modal } from "../Modal";
import { IProps } from "./types";

export const AddressFormModal: React.FC<IProps> = ({
  hideModal,
  submitBtnText,
  target,
  title,
  userId,
  address,
  formId,
  ...props
}: IProps) => {
  const [show, setShow] = React.useState(true);
  let errors: any[] | undefined = [];

  const [
    setCreatUserAddress,
    { data: createData, error: addressCreateErrors },
  ] = useCreateUserAddress();

  const [
    setUpdateUserAddress,
    { data: updateData, error: addressUpdateErrors },
  ] = useUpdateUserAddress();

  if (addressCreateErrors) {
    errors = addressCreateErrors.extraInfo.userInputErrors;
  }

  if (addressUpdateErrors) {
    errors = addressUpdateErrors.extraInfo.userInputErrors;
  }

  React.useEffect(() => {
    if (
      (createData && !addressCreateErrors) ||
      (updateData && !addressUpdateErrors)
    ) {
      hideModal();
    }
  }, [createData, updateData, addressCreateErrors, addressUpdateErrors]);

  return (
    <Modal
      submitButtonTestingContext="submitAddressFormModalButton"
      testingContext="submitAddressFormModal"
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
      <AddressForm
        {...props}
        {...{ errors }}
        formId={formId}
        address={address ? address.address : undefined}
        handleSubmit={data => {
          if (userId) {
            setCreatUserAddress({
              input: {
                ...data,
                country: data?.country?.code as CountryCode,
              },
            });
          } else {
            setUpdateUserAddress({
              id: address!.id,
              input: {
                ...data,
                country: data?.country?.code as CountryCode,
              },
            });
          }
        }}
      />
    </Modal>
  );
};
