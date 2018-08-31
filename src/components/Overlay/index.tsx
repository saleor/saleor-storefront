import * as React from "react";

import "./scss/index.scss";

import { OverlayType } from "../App/context";

interface OverlayProps {
  children: React.ReactNode;
  type?: OverlayType;
  onClose(): void;
}
class Overlay extends React.Component<OverlayProps, {}> {
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  render() {
    return (
      <div
        className={`overlay${
          this.props.type ? ` overlay--${this.props.type}` : ""
        }`}
        onClick={() => {
          this.props.onClose();
        }}
      >
        <div className="overlay__wrapper" onClick={e => e.stopPropagation()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Overlay;
