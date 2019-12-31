import React from "react";

import { useUserDetails } from "@sdk/react";

import { CartLine } from "../../../../components/CartProvider/context";
import { CheckoutContext } from "../../../../components/checkout/context";
import { TypedCreateCheckoutMutation } from "../../checkout/queries";
import AddToCartButton from "./AddToCartButton";

const AddToCart: React.FC<{
  disabled: boolean;
  lines: CartLine[];
  onSubmit: () => void;
}> = ({ disabled, lines, onSubmit }) => {
  const { data: user } = useUserDetails();

  const {
    checkout,
    update: checkoutUpdate,
    loading: checkoutLoading,
  } = React.useContext(CheckoutContext);

  return (
    <TypedCreateCheckoutMutation
      onCompleted={async ({ checkoutCreate: { checkout, errors } }) => {
        if (!errors.length) {
          await checkoutUpdate({ checkout });
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
  );
};

export default AddToCart;
