import * as React from "react";

import "./scss/index.scss";

const Overlay: React.SFC<{ onClose(): void }> = ({ onClose, children }) => (
  <div
    className="overlay"
    onClick={() => {
      onClose();
    }}
  >
    <div className="overlay__wrapper" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

export default Overlay;
