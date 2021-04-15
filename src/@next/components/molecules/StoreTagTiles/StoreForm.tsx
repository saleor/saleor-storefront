import { Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Button, ButtonLink } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import { TextField } from "../TextField";
import * as S from "./styles";

// const Map = () => {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
//     />
//   );
// };

// const WrappedMap = withScriptjs<any>(withGoogleMap(Map));

export const StoreForm: React.FC<{
  handleSubmit: (data: any) => void;
  hide: () => void;
  initialValues: {
    storeName: string;
    storeAddress: string;
    storeCategory: string;
    storeDescription: string;
    storeImageFarm: string;
    storePhonenumber: string;
    storeCoordinates: number;
    storeAcreage: number;
  };
}> = ({ handleSubmit, hide, initialValues }) => {
  const intl = useIntl();
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit({
            storeName: values.storeName,
            storeAddress: values.storeAddress,
            storeCategory: values.storeCategory,
            storeDescription: values.storeDescription,
            storeImageFarm: values.storeImageFarm,
            storePhonenumber: values.storePhonenumber,
            storeCoordinates: values.storeCoordinates,
            storeAcreage: values.storeAcreage,
          });
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          isSubmitting,
          isValid,
        }) => {
          return (
            <S.Form onSubmit={handleSubmit} data-test="accountUpdateForm">
              <S.ContentExtendInput>
                <TextField
                  name="storeName"
                  label={intl.formatMessage(commonMessages.storeName)}
                  type="text"
                  value={values.storeName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </S.ContentExtendInput>

              <S.ContentExtendInput>
                <TextField
                  name="storeCategory"
                  label={intl.formatMessage(commonMessages.storeCategory)}
                  type="text"
                  value={values.storeCategory}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </S.ContentExtendInput>
              <S.ContentExtendInput>
                <TextField
                  name="storeDescription"
                  label={intl.formatMessage(commonMessages.storeDescription)}
                  type="text"
                  value={values.storeDescription}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </S.ContentExtendInput>
              <S.ContentExtendInput>
                <TextField
                  name="storeCoordinates"
                  label={intl.formatMessage(commonMessages.storeCoordinates)}
                  type="text"
                  value={values.storeCoordinates}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </S.ContentExtendInput>
              <S.ContentExtendInput>
                <TextField
                  name="storePhonenumber"
                  label={intl.formatMessage(commonMessages.storePhonenumber)}
                  type="text"
                  value={values.storePhonenumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </S.ContentExtendInput>
              <S.ContentExtendInput>
                <TextField
                  name="storeAcreage"
                  label={intl.formatMessage(commonMessages.storeAcreage)}
                  type="text"
                  value={values.storeAcreage}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </S.ContentExtendInput>
              <S.ContentExtendInput>
                <TextField
                  name="storeAddress"
                  label={intl.formatMessage(commonMessages.storeAddress)}
                  type="text"
                  value={values.storeAddress}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </S.ContentExtendInput>
              {/* <S.ContentExtendInput>
                <WrappedMap
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe38lpcvEH7pLWIbgNUPNHsPnyIYwkc60&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ width: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </S.ContentExtendInput> */}

              <S.ContentExtendInput>
                <S.FilePicker type="file" />
                {/* <input type="file" /> */}
              </S.ContentExtendInput>

              <S.FormButtons>
                <ButtonLink
                  testingContext="cancelButton"
                  type="button"
                  color="secondary"
                  onClick={hide}
                >
                  <FormattedMessage {...commonMessages.cancel} />
                </ButtonLink>
                <Button
                  testingContext="submit"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  size="sm"
                >
                  <FormattedMessage {...commonMessages.save} />
                </Button>
              </S.FormButtons>
            </S.Form>
          );
        }}
      </Formik>
    </>
  );
};
