import React from "react";
import { FormattedMessage } from "react-intl";

export const OfflinePlaceholder: React.FC = () => {
  return (
    <FormattedMessage
      defaultMessage="OFFLINE :("
      description="offline placeholder"
    />
  );
};
OfflinePlaceholder.displayName = "OfflinePlaceholder";
export default OfflinePlaceholder;
