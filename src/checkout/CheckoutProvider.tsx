import * as React from "react";

import { useCheckoutDetails, useUserCheckout } from "@sdk/react";

import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "./context";

enum LocalStorageKeys {
  Token = "checkoutToken",
}

interface ProviderProps {
  children: React.ReactNode;
  user: {
    data: any;
    loading: boolean;
  };
}

const getStoredToken = (): null | string =>
  localStorage.getItem(LocalStorageKeys.Token);

const setCheckoutToken = (token: null | string) => {
  if (token) {
    localStorage.setItem(LocalStorageKeys.Token, token);
  } else {
    localStorage.removeItem(LocalStorageKeys.Token);
  }
};

export const CheckoutProvider: React.FC<ProviderProps> = ({
  children,
  user,
}: ProviderProps) => {
  const [cardData, setCardData] = React.useState(null);
  const [checkout, setCheckout] = React.useState(null);
  const [dummyStatus, setDummyStatus] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [shippingAsBilling, setShippingAsBilling] = React.useState(false);
  /**
   * Flag to determine, when the user checkout should be fetched from the
   * API and override the current, storred one - happens after user log in
   */
  const [syncUserCheckout, setSyncUserCheckout] = React.useState(false);
  /**
   * Flag to determine, when the cart lines should override the checkout
   * lines - happens after user logs in
   */
  const [syncWithCart, setSyncWithCart] = React.useState(false);

  React.useEffect(() => {
    if (user.data && !syncUserCheckout) {
      setSyncUserCheckout(true);
    }
  }, [user.data]);

  const getCurrentStep = () => {
    if (!checkout) {
      return CheckoutStep.ShippingAddress;
    }

    const isShippingOptionStep =
      checkout.availableShippingMethods.length && !!checkout.shippingAddress;
    const isBillingStep = isShippingOptionStep && !!checkout.shippingMethod;
    const isPaymentStep = isBillingStep && !!checkout.billingAddress;
    const isReviewStep = isPaymentStep && !!(cardData || dummyStatus);

    if (isReviewStep) {
      return CheckoutStep.Review;
    } else if (isPaymentStep) {
      return CheckoutStep.Payment;
    } else if (isBillingStep) {
      return CheckoutStep.BillingAddress;
    } else if (isShippingOptionStep) {
      return CheckoutStep.ShippingOption;
    }
    return CheckoutStep.ShippingAddress;
  };

  const update = async (checkoutData: CheckoutContextInterface) => {
    if ("cardData" in checkoutData) {
      await setCardData(checkoutData.cardData);
    }
    if ("dummyStatus" in checkoutData) {
      await setDummyStatus(checkoutData.dummyStatus);
    }
    if ("loading" in checkoutData) {
      await setLoading(checkoutData.loading);
    }
    if ("shippingAsBilling" in checkoutData) {
      await setShippingAsBilling(checkoutData.shippingAsBilling);
    }
    if ("syncUserCheckout" in checkoutData) {
      await setSyncUserCheckout(checkoutData.syncUserCheckout);
    }
    if ("syncWithCart" in checkoutData) {
      await setSyncWithCart(checkoutData.syncWithCart);
    }
    if ("checkout" in checkoutData) {
      await setCheckout(checkoutData.checkout);
      setCheckoutToken(checkoutData.checkout.token);
    }
  };

  const clear = () => {
    setCardData(null);
    setCheckout(null);
    setDummyStatus(null);
    setShippingAsBilling(false);
    setCheckoutToken(null);
  };

  const getContext = () => ({
    cardData,
    checkout,
    clear,
    dummyStatus,
    loading,
    shippingAsBilling,
    step: getCurrentStep(),
    syncUserCheckout,
    syncWithCart,
    update,
  });

  const skipUserCheckoutFetch = !syncUserCheckout;

  const { data: userCheckout, loading: userCheckoutLoading } = useUserCheckout({
    skip: skipUserCheckoutFetch,
  });

  if (userCheckout && syncUserCheckout) {
    setCheckout(userCheckout);
    setLoading(false);
    setSyncUserCheckout(false);
    setSyncWithCart(true);
    setCheckoutToken(userCheckout.token);
  } else if (!userCheckout && syncUserCheckout) {
    setSyncUserCheckout(false);
  }

  const token = getStoredToken();

  const skipLocalStorageCheckoutFetch = !!(
    userCheckoutLoading ||
    user.loading ||
    !token ||
    checkout ||
    user.data
  );

  const { data: checkoutDetails } = useCheckoutDetails(
    {
      token,
    },
    { skip: skipLocalStorageCheckoutFetch }
  );

  if (checkoutDetails && !checkout) {
    setCheckout(checkoutDetails);
    setLoading(false);
    setCheckoutToken(checkoutDetails.token);
  }

  return (
    <CheckoutContext.Provider value={getContext()}>
      {children}
    </CheckoutContext.Provider>
  );
};
