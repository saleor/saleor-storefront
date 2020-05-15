import * as React from "react";

import { FormattedMessage } from "react-intl";

const OfflinePlaceholder: React.FC<{}> = () => <>
    <FormattedMessage
        defaultMessage={"OFFLINE :("}
    /></>;

export default OfflinePlaceholder;
