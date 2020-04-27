import { Formik } from "formik";
import React, { useState } from "react";

import { AddNewTile, ErrorMessage, TileGrid } from "@components/atoms";
import { AddressTileOption } from "@components/molecules";

import { AddressFormModal } from "../AddressFormModal";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const AddressGridSelector: React.FC<IProps> = ({
  addresses,
  selectedAddressId,
  countriesOptions,
  userId,
  errors,
  onSelect,
  formId,
  formRef,
  addNewModalTarget,
  newAddressFormId,
}: IProps) => {
  const [displayNewModal, setDisplayNewModal] = useState(false);

  const addNewTile = (
    <AddNewTile
      data-cy="addressTileAddNew"
      key="newTile"
      type="address"
      onClick={() => setDisplayNewModal(true)}
    />
  );

  return (
    <>
      <Formik
        initialValues={{
          addressTileOption: selectedAddressId,
        }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          if (onSelect && values.addressTileOption) {
            const address = addresses.find(
              addr => addr.id === values.addressTileOption
            );
            if (address) {
              onSelect(address.address, values.addressTileOption);
            }
          }
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <S.AddressGridForm
              id={formId}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <TileGrid
                columns={2}
                elements={addresses.reduce(
                  (elements, { id, address }, index) => {
                    elements.push(
                      <AddressTileOption
                        data-cy={`addressTileOption${index}`}
                        key={`addressTile-${id}`}
                        id={id}
                        inputName="addressTileOption"
                        address={address}
                        onChange={() => setFieldValue("addressTileOption", id)}
                        checked={
                          !!values.addressTileOption &&
                          values.addressTileOption === id
                        }
                      />
                    );
                    return elements;
                  },
                  [addNewTile]
                )}
              />
              <ErrorMessage errors={errors} />
            </S.AddressGridForm>
          );
        }}
      </Formik>
      {displayNewModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayNewModal(false);
          }}
          submitBtnText={"Add"}
          title={"Add new address"}
          countriesOptions={countriesOptions}
          formId={newAddressFormId}
          userId={userId}
          target={addNewModalTarget}
        />
      )}
    </>
  );
};

export { AddressGridSelector };
