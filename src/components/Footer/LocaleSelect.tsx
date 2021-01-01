import "./scss/index.scss";

import * as React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { usePreferences } from "@hooks";
import { commonMessages } from "@temp/intl";
import { localeFlag } from "@temp/components/Locale";
import { PreferencesFormModal } from "@components/organisms";

const LocaleSelect: React.FC = () => {
  const intl = useIntl();
  const {
    preferences: { locale },
  } = usePreferences();
  const [displayModal, setDisplayModal] = React.useState(false);
  return (
    <div className="footer-nav__section right">
      <h4 className="footer-nav__section-header">
        <FormattedMessage {...commonMessages.preferences} />
      </h4>
      <div className="footer-nav__section-content">
        <p>
          <button
            onClick={() => {
              setDisplayModal(true);
            }}
          >
            {localeFlag[locale] && (
              <span className={`flag-icons dot ${localeFlag[locale]}`} />
            )}{" "}
            <FormattedMessage defaultMessage="Lingua" />
          </button>
        </p>
        <div className="footer-paymentMethods">
          <div className="footer-paymentMethods__cards">
            <img src="https://a-dam.com/storage/icons/visa.svg" alt="visa" />
            <img src="https://a-dam.com/storage/icons/amex.svg" alt="amex" />
            <img
              src="https://a-dam.com/storage/icons/mastercard.svg"
              alt="mastercard"
            />
            <img
              src="https://www.mollie.com/external/icons/payment-methods/ideal.svg"
              alt="ideal"
            />
            <img
              src="https://www.mollie.com/external/icons/payment-methods/paypal.svg"
              alt="paypal"
            />
          </div>
        </div>
      </div>
      {displayModal && (
        <PreferencesFormModal
          hideModal={() => {
            setDisplayModal(false);
          }}
          submitBtnText={intl.formatMessage({
            defaultMessage: "Save preferences",
          })}
          title={intl.formatMessage(commonMessages.preferences)}
          formId="preferences-form"
        />
      )}
    </div>
  );
};

export default LocaleSelect;
