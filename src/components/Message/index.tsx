import * as React from "react";
import ReactSVG from "react-svg";

import "./scss/index.scss";

interface MessageProps {
  title: string;
  status?: "success" | "error";
  onClose: () => void;
}

const Message: React.SFC<MessageProps> = ({
  title,
  status = "neutral",
  children,
  onClose
}) => (
  <div className={`message message__status-${status}`}>
    <p className="message__title">{title}</p>
    {children ? <div className="message__content">{children}</div> : null}
    <ReactSVG
      path="../../images/x.svg"
      className="message__close-icon"
      onClick={() => onClose()}
    />
  </div>
);

export default Message;
