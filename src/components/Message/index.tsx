import * as React from "react";
import ReactSVG from "react-svg";

import "./scss/index.scss";

type MessageProps = {
  visible: boolean,
  title: string,
  status?: "success"| "error",
}

const Message: React.SFC<MessageProps> = ({ visible, title, status="neutral", children }) => (
  <div className={`message message__status-${status}${!visible ? ' message--hidden' : ''}`}>
    <p className="message__title">{title}</p>
    {children ? <div className="message__content">{children}</div> : null}
    <ReactSVG path="../../images/x.svg" className="message__close-icon" />
  </div>
);

export default Message;
