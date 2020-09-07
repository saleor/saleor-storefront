import { Formik } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ErrorMessage, Radio } from "@components/atoms";
import { Money } from "@components/containers";
import { checkoutMessages } from "@temp/intl";

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
      <S.Title data-test="checkoutPageSubtitle">
        <FormattedMessage {...checkoutMessages.shippingMethod} />
      </S.Title>
      <Formik
        initialValues={{
          shippingMethod: selectedShippingMethodId,
        }}
        enableReinitialize
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
                  <S.Tile
                    checked={checked}
                    key={id}
                    data-test="shippingMethodTile"
                    data-test-id={id}
                  >
                    <Radio
                      name="shippingMethod"
                      value={id}
                      checked={checked}
                      customLabel
                      onChange={() => setFieldValue("shippingMethod", id)}
                    >
                      <S.TileTitle>
                        <span data-test="checkoutShippingMethodOptionName">
                          {name}
                        </span>
                        <S.Price>
                          {" "}
                          | +
                          <Money
                            data-test="checkoutShippingMethodOptionPrice"
                            money={price}
                          />
                        </S.Price>
                      </S.TileTitle>
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
