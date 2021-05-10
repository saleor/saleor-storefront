import { useAuth } from "@saleor/sdk";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { AlertManager, useAlert } from "react-alert";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import styled from "styled-components";
import * as Yup from "yup";

import { Checkbox, Redirect } from "@components/atoms";
import { InputSelect } from "@components/molecules/InputSelect";
import { paths } from "@paths";
import { orange, white } from "@styles/constants";
import { COUNTRY_LIST } from "@temp/country";
import { commonMessages } from "@temp/intl";

import { maybe } from "../../../core/utils";
import { TextField } from "../..";
import {
  RegisterAccount,
  RegisterAccountVariables,
} from "./gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "./queries";

import "./scss/index.scss";

const Wrapper = styled.div`
  padding: 3rem 3rem;
  display: block;
  width: 50%;
  margin: auto;
  @media (max-width: 1380px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  background: ${orange};
  color: ${white};
  border-radius: 2rem;
  box-shadow: -5px 5px 14px 0px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 0.9rem 3.7rem;
  font-size: 18px;
`;
const Divider = styled.div`
  width: 2rem;
`;

const showSuccessNotification = (
  data: RegisterAccount,
  alert: AlertManager,
  intl: IntlShape,
  push: (val: string) => void
) => {
  const successful = maybe(() => !data.accountRegister.errors.length);

  if (successful) {
    alert.show(
      {
        title: data.accountRegister.requiresConfirmation
          ? intl.formatMessage({
              defaultMessage:
                "Please check your e-mail for further instructions",
            })
          : intl.formatMessage({ defaultMessage: "New user has been created" }),
      },
      { type: "success", timeout: 5000 }
    );
    push(paths.login);
  } else {
    const error = data.accountRegister?.errors[0]?.message;
    alert.show(
      {
        title: error || "Created Failed! Try Again!",
      },
      { type: "error", timeout: 5000 }
    );
  }
};

interface RegisterFormType {
  country?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  isSupplier?: boolean;
  storeName?: string;
  confirmPassword?: string;
}

const RegisterForm: React.FC = () => {
  const alert = useAlert();
  const intl = useIntl();
  const { user } = useAuth();
  const { push } = useRouter();

  if (user) {
    <Redirect url={paths.home} />;
  }

  const initialForm: RegisterFormType = {
    email: "",
  };
  const [isSupplier, setIsSupplier] = React.useState(false);
  const validateSchema: Yup.ObjectSchema<RegisterFormType> = React.useMemo(() => {
    const validate = {
      email: Yup.string().required("Required"),
      password: Yup.string().min(8, "Password Too Short!").required("Required"),
      phone: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      confirmPassword: Yup.string().required("Required"),
    };
    return isSupplier
      ? Yup.object().shape({
          ...validate,
          storeName: Yup.string().required("Required"),
        })
      : Yup.object().shape(validate);
  }, [isSupplier]);

  return (
    <Wrapper>
      <TypedAccountRegisterMutation
        onCompleted={data => showSuccessNotification(data, alert, intl, push)}
      >
        {(registerCustomer, { loading, data }) => {
          return (
            <Formik
              initialValues={initialForm}
              validationSchema={validateSchema}
              onSubmit={values => {
                const redirectUrl = `${location.origin}`;
                const dataSubmit: RegisterAccountVariables = {
                  country: values.country,
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  phone: values.phone,
                  password: values.password,
                  redirectUrl,
                };

                if (values.password !== values.confirmPassword) {
                  alert.show(
                    {
                      title: intl.formatMessage({
                        defaultMessage: "Please confirm Password again!",
                      }),
                    },
                    { type: "error" }
                  );
                } else {
                  registerCustomer({
                    variables: values.isSupplier
                      ? {
                          ...dataSubmit,
                          isSupplier: true,
                          storeName: values.storeName,
                        }
                      : { ...dataSubmit, isSupplier: false },
                  });
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                setFieldValue,
                values,
                errors,
                touched,
              }) => {
                return (
                  <form onSubmit={handleSubmit} data-test="accountUpdateForm">
                    <div style={{ marginBottom: "1.875rem" }}>
                      <InputSelect
                        label={intl.formatMessage(commonMessages.country)}
                        name="country"
                        options={COUNTRY_LIST}
                        optionLabelKey="text"
                        optionValueKey="value"
                        autoComplete="value"
                        value={
                          values!.country &&
                          COUNTRY_LIST.find(
                            option => option.value === values!.country
                          )
                        }
                        onChange={(value: any, name: any) =>
                          setFieldValue(name, value.value)
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <TextField
                          name="firstName"
                          label={intl.formatMessage(commonMessages.firstName)}
                          type="text"
                          errors={
                            !values.firstName && touched.firstName
                              ? [{ message: errors.firstName || "" }]
                              : []
                          }
                          value={values.firstName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <Divider />
                      <div style={{ flex: 1 }}>
                        <TextField
                          name="lastName"
                          label={intl.formatMessage(commonMessages.lastName)}
                          type="text"
                          errors={
                            !values.lastName && touched.lastName
                              ? [{ message: errors.lastName || "" }]
                              : []
                          }
                          value={values.lastName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <TextField
                        name="email"
                        label={intl.formatMessage(commonMessages.eMail)}
                        type="email"
                        errors={
                          !values.email && touched.email
                            ? [{ message: errors.email || "" }]
                            : []
                        }
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        name="phone"
                        label={intl.formatMessage(commonMessages.phone)}
                        type="text"
                        errors={
                          !values.phone && touched.phone
                            ? [{ message: errors.phone || "" }]
                            : []
                        }
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        name="password"
                        label={intl.formatMessage(commonMessages.password)}
                        type="password"
                        errors={
                          !values.password && touched.password
                            ? [{ message: errors.password || "" }]
                            : []
                        }
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        name="confirmPassword"
                        label={intl.formatMessage(
                          commonMessages.confirmPassword
                        )}
                        type="password"
                        value={values.confirmPassword}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        errors={
                          (!values.confirmPassword &&
                            touched.confirmPassword) ||
                          values.confirmPassword !== values.password
                            ? [{ message: errors.password || "" }]
                            : []
                        }
                      />
                    </div>
                    <div>
                      <Checkbox
                        name="isSupplier"
                        checked={values.isSupplier}
                        onChange={() => {
                          setIsSupplier(!values.isSupplier);
                          setFieldValue("isSupplier", !values.isSupplier);
                        }}
                      >
                        <FormattedMessage defaultMessage="Supplier" />
                      </Checkbox>
                    </div>
                    <div>
                      {values.isSupplier && (
                        <TextField
                          name="storeName"
                          label={intl.formatMessage(commonMessages.storeName)}
                          type="text"
                          errors={
                            !!errors.storeName &&
                            touched.storeName &&
                            (values.isSupplier || values.storeName.length === 0)
                              ? [{ message: errors.storeName || "" }]
                              : []
                          }
                          value={values.storeName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      )}
                    </div>
                    <div className="login__content__button">
                      <StyledButton
                        type="submit"
                        {...(loading && { disabled: true })}
                      >
                        {loading
                          ? intl.formatMessage(commonMessages.loading)
                          : intl.formatMessage({ defaultMessage: "Register" })}
                      </StyledButton>
                    </div>
                  </form>
                );
              }}
            </Formik>
          );
        }}
      </TypedAccountRegisterMutation>
    </Wrapper>
  );
};

export default RegisterForm;
