import { Formik } from "formik";
import React from "react";

import { ErrorMessage, Radio } from "@components/atoms";
import { Money } from "@components/containers";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShipping: React.FC<IProps> = ({
  shippingMethods,
  selectedShippingMethodId,
  selectShippingMethod,
  errors,
  formId,
  formRef,
}: IProps) => {
  return (
    <section>
      <S.Title data-test="checkoutPageSubtitle">SHIPPING METHOD</S.Title>
      <Formik
        initialValues={{
          shippingMethod: selectedShippingMethodId,
        }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          if (selectShippingMethod && values.shippingMethod) {
            selectShippingMethod(values.shippingMethod);
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
            <S.ShippingMethodForm
              id={formId}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              {shippingMethods.map(({ id, name, price }, index) => {
                const checked =
                  !!values.shippingMethod && values.shippingMethod === id;

                return (
                  <S.Tile checked={checked} key={id} data-test="shippingMethodTile" data-test-id={id}>
                    <Radio
                      name="shippingMethod"
                      value={id}
                      checked={checked}
                      customLabel={true}
                      onChange={() => setFieldValue("shippingMethod", id)}
                    >
                      <span
                        data-test={`checkoutShippingMethodOptionName`}
                      >
                        {name}
                      </span>
                      <S.Price>
                        {" "}
                        | +
                        {
                          <Money
                            data-test={`checkoutShippingMethodOptionPrice`}
                            money={price}
                          />
                        }
                      </S.Price>
                    </Radio>
                  </S.Tile>
                );
              })}
              <ErrorMessage errors={errors} />
            </S.ShippingMethodForm>
          );
        }}
      </Formik>
    </section>
  );
};

export { CheckoutShipping };
