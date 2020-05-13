
import * as React from "react";

import useLocale from "@saleor/@next/hooks/useLocale";
import { useIntl } from "react-intl";

const withLocale = (Component: any) => {
    return (props: any) => {
      const { locale } = useLocale()
      const intl = useIntl();
      return <Component locale={locale.toUpperCase()} intl={intl} {...props} />;
    };
};

export default withLocale;