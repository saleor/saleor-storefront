import * as React from "react";

import "./scss/index.scss";

import {
  OverlayContext,
  OverlayContextInterface,
  OverlayType
} from "../App/context";

export class OverlayProvider extends React.Component<
  { children: React.ReactNode },
  OverlayContextInterface
> {
  constructor(props) {
    super(props);
    this.state = {
      hide: this.hide,
      show: this.show,
      type: null
    };
  }

  show = (type: OverlayType) => {
    this.setState({ type });
    document.body.style.overflow = "hidden";
  };

  hide = () => {
    this.setState({ type: null });
  };

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export const Overlay: React.SFC<{ type?: OverlayType; onClose(): void }> = ({
  children,
  type,
  onClose
}) => (
  <div
    className={`overlay${type ? ` overlay--${type}` : ""}`}
    onClick={() => onClose()}
  >
    <div className="overlay__wrapper" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);
