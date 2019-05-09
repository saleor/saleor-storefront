import * as React from "react";

import { Message } from "..";
import { INotificationTemplate } from "./customTypes";

export const NotificationTemplate: React.FC<INotificationTemplate> = ({
  message,
  options,
  close
}) => {
  return (
    <Message title={message.title} status={options.type} onClose={close}>
      {message.content}
    </Message>
  );
};

export default NotificationTemplate;
