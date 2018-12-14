import * as React from "react";

import classNames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Button, ButtonProps } from "..";

interface AddToCartButtonState {
  animate: boolean;
}

class AddToCartButton extends React.PureComponent<
  ButtonProps,
  AddToCartButtonState
> {
  state = { animate: false };
  animationTimeout = 800;
  timeout;

  handleAnimation = (evt: React.MouseEvent<HTMLButtonElement>) => {
    clearTimeout(this.timeout);
    this.props.onClick(evt);

    this.setState({ animate: true }, () => {
      this.timeout = setTimeout(() => {
        this.setState({ animate: false });
      }, this.animationTimeout);
    });
  };

  render() {
    const { animate } = this.state;

    return (
      <Button
        {...this.props}
        onClick={this.handleAnimation}
      >
        <ReactCSSTransitionGroup
          transitionName="product-description__action--fade"
          transitionEnterTimeout={this.animationTimeout}
          transitionLeaveTimeout={this.animationTimeout}
        >
          {animate ? (
            <span key="text">Added</span>
          ) : (
            <span key="children">{this.props.children}</span>
          )}
        </ReactCSSTransitionGroup>
      </Button>
    );
  }
}

export default AddToCartButton;
