import React from "react";

import { useUserDetails } from "@sdk/react";

import { CheckoutContext } from "../../checkout/context";
import { TypedCreateCheckoutMutation } from "../../checkout/queries";
import { CartLine } from "../CartProvider/context";
import AddToCartButton from "./AddToCartButton";

const AddToCart: React.FC<{
  disabled: boolean;
  lines: CartLine[];
  onSubmit: () => void;
}> = ({ disabled, lines, onSubmit }) => {
  const { data: user } = useUserDetails();
  return (
    <CheckoutContext.Consumer>
      {({ checkout, update, loading: checkoutLoading }) => (
        <TypedCreateCheckoutMutation
          onCompleted={async ({ checkoutCreate: { checkout, errors } }) => {
            if (!errors.length) {
              await update({ checkout });
            }
            onSubmit();
          }}
        >
          {(createCheckout, { loading: mutationLoading }) => (
            <AddToCartButton
              className="product-description__action"
              onClick={() => {
                if (user && !checkout) {
                  createCheckout({
                    variables: {
                      checkoutInput: { email: user.email, lines },
                    },
                  });
                } else {
                  onSubmit();
                }
              }}
              disabled={disabled || mutationLoading || checkoutLoading}
            >
              Add to basket
            </AddToCartButton>
          )}
        </TypedCreateCheckoutMutation>
      )}
    </CheckoutContext.Consumer>
  );
};

export default AddToCart;
