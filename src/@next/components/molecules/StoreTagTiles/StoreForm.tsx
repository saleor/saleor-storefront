import { Formik } from "formik";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";

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
  const lat = initialValues?.latlong
    ? parseFloat(initialValues.latlong.split(",")[0])
    : 0;
  const lng = initialValues?.latlong
    ? parseFloat(initialValues?.latlong?.split(",")[1])
    : 0;

  const [position, setPosition] = React.useState({
    lat,
    lng,
  });

  const Map = (props: any) => {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={position}
        onClick={e => handleClick(e, props)}
      >
        <Marker position={position} />
      </GoogleMap>
    );
  };

  const WrappedMap = withScriptjs<any>(withGoogleMap(Map));

  const handleClick = (
    // @ts-ignore
    event: google.maps.MapMouseEvent | google.maps.IconMouseEvent,
    props: any
  ) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setPosition({ lat, lng });
    props.onChange(props.name, `${lat},${lng}`);
  };

  const initialForm = initialValues || {
    name: "",
    description: "",
    storeTypeId: "",
    phone: "",
    acreage: 0,
    latlong: "0,0",
    backgroundImage: "",
    backgroundImageAlt: "",
  };

  const validateSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").required("Required"),
    description: Yup.string().min(2, "Too Short!").required("Required"),
    phone: Yup.string().min(2, "Too Short!").required("Required"),
    acreage: Yup.number()
      .required("Required")
      .min(1, "Acreage must be more than 0!"),
    storeTypeId: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validateSchema}
        onSubmit={(values, { setSubmitting }) => {
          const dataSubmit: RegisterStoreVariables = {
            name: values.name,
            description: values.description,
            storeTypeId: values.storeTypeId,
            phone: values.phone,
            acreage: values.acreage,
            latlong: values.latlong,
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
          errors,
          touched,
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
                        errors={
                          !!errors.name && touched.name
                            ? [{ message: errors.name || "" }]
                            : []
                        }
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
                        errors={
                          !!errors.description && touched.description
                            ? [{ message: errors.description || "" }]
                            : []
                        }
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
                          errors={
                            errors.storeTypeId
                              ? [{ message: errors.storeTypeId || "" }]
                              : []
                          }
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
                        errors={
                          !!errors.phone && touched.phone
                            ? [{ message: errors.phone || "" }]
                            : []
                        }
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
                        errors={
                          !!errors.acreage && touched.acreage
                            ? [{ message: errors.acreage || "" }]
                            : []
                        }
                      />
                    </S.ContentExtendInput>
                    <S.ContentExtendInput>
                      <WrappedMap
                        name="latlong"
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe38lpcvEH7pLWIbgNUPNHsPnyIYwkc60&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ width: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        onChange={(name: any, value: any) => {
                          setFieldValue(name, value);
                        }}
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
