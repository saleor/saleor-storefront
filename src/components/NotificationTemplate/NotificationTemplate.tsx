import * as React from "react";

import { Message } from "..";
import { INotificationTemplate } from "./customTypes";

import "./scss/index.scss";

export const NotificationTemplate: React.FC<INotificationTemplate> = ({
  message,
  options,
  close,
}) => {
  return (
    <div className="notification">
      <Message title={message.title} status={options.type} onClose={close}>
        {message.content}
      </Message>
    </div>
  );
};

export default NotificationTemplate;
