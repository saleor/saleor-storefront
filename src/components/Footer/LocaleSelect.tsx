import "./scss/index.scss";

import * as React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { usePreferences } from "@hooks";
import { commonMessages } from "@temp/intl";
import { localeNames, localeFlag } from "@temp/components/Locale";
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
          <FormattedMessage {...commonMessages.language} />:{" "}
          <button
            onClick={() => {
              setDisplayModal(true);
            }}
          >
            {localeNames[locale]}{" "}
            {localeFlag[locale] && (
              <span className={`flag-icons dot ${localeFlag[locale]}`} />
            )}{" "}
            | <FormattedMessage defaultMessage="CHANGE" />
          </button>
        </p>
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
