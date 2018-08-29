import * as React from "react";

import {
  OverlayContext,
  OverlayContextInterface,
  OverlayType
} from "../App/context";

class OverlayProvider extends React.Component<{}, OverlayContextInterface> {
  show = (type: OverlayType) => {
    this.setState({ type });
  };

  hide = () => {
    this.setState({ type: null });
  };

  state = {
    type: null,
    show: this.show,
    hide: this.hide
  };

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export default OverlayProvider;
