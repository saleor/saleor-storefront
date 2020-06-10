import * as React from "react";

import { Message } from "../Message";
import { IProps } from "./types";

export const NotificationTemplate: React.FC<IProps> = ({
  message,
  options,
  close,
}) => {
  return (
    <Message
      actionText={message.actionText}
      status={options.type}
      title={message.title}
      onClick={close}
    >
      {message.content}
    </Message>
  );
};
