import * as React from "react";

import "./scss/index.scss";

import {
  ContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType
} from "./context";

export class OverlayProvider extends React.Component<
  { children: React.ReactNode },
  OverlayContextInterface
> {
  constructor(props) {
    super(props);
    this.state = {
      context: null,
      hide: this.hide,
      show: this.show,
      theme: null,
      type: null
    };
  }

  show = (
    type: OverlayType,
    theme?: OverlayTheme,
    context?: ContextInterface
  ) => {
    this.setState({ type, theme, context });
    document.body.style.overflow = type !== OverlayType.message ? "hidden" : "";
  };

  hide = () => {
    this.setState({ type: null });
    document.body.style.overflow = "";
  };

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export const Overlay: React.SFC<{ context: OverlayContextInterface }> = ({
  children,
  context: { type, theme, hide }
}) => (
  <div
    className={`overlay${type ? ` overlay--${type}` : ""}`}
    onClick={() => hide()}
  >
    <div className={`overlay__${theme}`} onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);
