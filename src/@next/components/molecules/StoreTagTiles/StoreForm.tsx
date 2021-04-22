import { Formik } from "formik";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { FormattedMessage, useIntl } from "react-intl";

import { Button, ButtonLink } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import { InputSelect } from "../InputSelect";
import { TextField } from "../TextField";
import { RegisterStoreVariables } from "./gqlTypes/RegisterStore";
import { TypedListStoreTypeQuery } from "./queries";
import * as S from "./styles";

type Props = {
  handleSubmit: (data: RegisterStoreVariables) => void;
  hide: () => void;
  initialValues?: RegisterStoreVariables;
  isLoadingSubmit: boolean;
};

export const StoreForm: React.FC<Props> = ({
  handleSubmit,
  hide,
  initialValues,
  isLoadingSubmit,
}) => {
  const intl = useIntl();

  const Map = () => {
    const lat = initialValues?.latlong
      ? parseFloat(initialValues.latlong.split(",")[0])
      : 0;
    const lng = initialValues?.latlong
      ? parseFloat(initialValues?.latlong?.split(",")[1])
      : 0;

    console.log(lat, lng);

    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
        onClick={e => handleClick(e)}
      />
    );
  };
  let lat = "";
  let lng = "";

  const WrappedMap = withScriptjs<any>(withGoogleMap(Map));

  const handleClick = (
    event: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ) => {
    lat = event.latLng.lat().toString();
    lng = event.latLng.lng().toString();
  };

  const initialForm = initialValues || {
    name: "",
    storeTypeId: "",
  };

  return (
    <>
      <Formik
        initialValues={initialForm}
        onSubmit={(values, { setSubmitting }) => {
          const dataSubmit: RegisterStoreVariables = {
            name: values.name,
            description: values.description,
            storeTypeId: values.storeTypeId,
            phone: values.phone,
            acreage: values.acreage,
            latlong: lat === "" ? initialForm.latlong : `${lat},${lng}`,
            backgroundImage: values.backgroundImage,
            backgroundImageAlt: values.backgroundImageAlt,
          };
          handleSubmit(dataSubmit);
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          values,
          isSubmitting,
          isValid,
        }) => {
          return (
            <TypedListStoreTypeQuery
              alwaysRender
              displayLoader={false}
              errorPolicy="all"
            >
              {({ data: dataType }) => {
                const storeTypeOptions = dataType?.storeTypes?.edges.map(
                  item => ({ value: item.node.id, text: item.node.name })
                );
                return (
                  <S.Form onSubmit={handleSubmit} data-test="accountUpdateForm">
                    <S.ContentExtendInput>
                      <TextField
                        name="name"
                        label={intl.formatMessage(commonMessages.storeName)}
                        type="text"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </S.ContentExtendInput>

                    <S.ContentExtendInput>
                      <TextField
                        name="description"
                        label={intl.formatMessage(
                          commonMessages.storeDescription
                        )}
                        type="text"
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </S.ContentExtendInput>
                    <S.ContentExtendInput>
                      <div style={{ marginBottom: "1.875rem" }}>
                        <InputSelect
                          label={intl.formatMessage(commonMessages.storeType)}
                          name="storeTypeId"
                          options={storeTypeOptions}
                          value={
                            values!.storeTypeId &&
                            storeTypeOptions &&
                            storeTypeOptions!.find(
                              option => option.value === values!.storeTypeId
                            )
                          }
                          onChange={(value: any, name: any) =>
                            setFieldValue(name, value.value)
                          }
                          optionLabelKey="text"
                          optionValueKey="value"
                          autoComplete="value"
                        />
                      </div>
                    </S.ContentExtendInput>
                    <S.ContentExtendInput>
                      <TextField
                        name="phone"
                        label={intl.formatMessage(commonMessages.phone)}
                        type="text"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </S.ContentExtendInput>
                    <S.ContentExtendInput>
                      <TextField
                        name="acreage"
                        label={intl.formatMessage(commonMessages.storeAcreage)}
                        type="number"
                        value={values.acreage}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </S.ContentExtendInput>
                    <S.ContentExtendInput>
                      <WrappedMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe38lpcvEH7pLWIbgNUPNHsPnyIYwkc60&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ width: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                      />
                    </S.ContentExtendInput>

                    {/* <S.ContentExtendInput>
                      <S.FilePicker name="" type="file" />
                    </S.ContentExtendInput> */}

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
                        disabled={isSubmitting || !isValid || isLoadingSubmit}
                        size="sm"
                      >
                        <FormattedMessage {...commonMessages.save} />
                      </Button>
                    </S.FormButtons>
                  </S.Form>
                );
              }}
            </TypedListStoreTypeQuery>
          );
        }}
      </Formik>
    </>
  );
};
