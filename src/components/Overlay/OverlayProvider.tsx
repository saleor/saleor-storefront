import * as React from "react";

import { OverlayContext, OverlayContextInterface } from "../App/context";

class OverlayProvider extends React.Component<{}, OverlayContextInterface> {
  showOverlay = (type: "checkout" | "navigation") => {
    this.setState({ type });
  };

  closeOverlay = () => {
    this.setState({ type: null });
  };

  constructor(props) {
    super(props);
    this.state = {
      type: null,
      showOverlay: this.showOverlay,
      closeOverlay: this.closeOverlay
    };
  }

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export default OverlayProvider;
