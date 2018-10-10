import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import "./scss/index.scss";

import {
  ContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType
} from "./context";

class OverlayProvider extends React.Component<
  RouteComponentProps<{}>,
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

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.hide();
    }
  }

  show = (
    type: OverlayType,
    theme?: OverlayTheme,
    context?: ContextInterface
  ) => {
    this.setState({ type, theme, context });
    document.body.style.overflow = type !== OverlayType.message ? "hidden" : "";
    if (type === OverlayType.message) {
      setTimeout(() => this.hide(), 1000);
    }
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

export default withRouter(OverlayProvider);
