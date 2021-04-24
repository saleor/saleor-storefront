import "./scss/index.scss";

import * as React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { usePreferences } from "@hooks";
import { commonMessages } from "@temp/intl";
import {
  localeNames,
  localeFlag,
  localeFlagShipsTo,
} from "@temp/components/Locale";
import {
  PreferencesFormModal,
  PreferencesFormShippingModal,
} from "@components/organisms";

const LocaleSelect: React.FC = () => {
  const intl = useIntl();
  const {
    preferences: { locale },
  } = usePreferences();
  const [displayModal, setDisplayModal] = React.useState(false);
  const [displayModalShipsTo, setDisplayModalShipsTo] = React.useState(false);

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
            {intl.formatMessage(commonMessages.language)}
            {": "}
            {localeNames[locale]}
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              setDisplayModalShipsTo(true);
            }}
          >
            {localeFlagShipsTo[locale] && (
              <span className={`flag-icons dot ${localeFlagShipsTo[locale]}`} />
            )}{" "}
            {intl.formatMessage(commonMessages.shippingto)}{" "}
          </button>
        </p>
        {locale === "it" ? (
          <b className="footer-nav__section-subheader">
            {intl.formatMessage(commonMessages.shippingtooptions_1)}
          </b>
        ) : (
          <b className="footer-nav__section-subheader">
            {intl.formatMessage(commonMessages.shippingtooptions_2)}
          </b>
        )}
        <div className="footer-paymentMethods">
          <div className="footer-paymentMethods__cards">
            <img
              src="https://api.a-dam.com/storage/icons/visa.svg"
              alt="visa"
            />
            <img
              src="https://api.a-dam.com/storage/icons/amex.svg"
              alt="amex"
            />
            <img
              src="https://api.a-dam.com/storage/icons/mastercard.svg"
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
      {displayModalShipsTo && (
        <PreferencesFormShippingModal
          hideModal={() => {
            setDisplayModalShipsTo(false);
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
