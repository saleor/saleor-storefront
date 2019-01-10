import { debounce } from "lodash";
import * as React from "react";

import { TextField } from "../../components";

type changeQuantityInCart = (variantId: string, quantity: number) => void;

interface CartLineQuantityInputProps {
  value: number;
  processing: boolean;
  invalid: boolean;
  variantId: string;
  changeQuantityInCart: changeQuantityInCart;
}

interface CartLineQuantityInputState {
  value: number;
}

class CartLineQuantityInput extends React.PureComponent<
  CartLineQuantityInputProps,
  CartLineQuantityInputState
> {
  static getDerivedStateFromProps(props: CartLineQuantityInputProps) {
    const { invalid, value } = props;
    if (invalid) {
      return { value };
    }
    return null;
  }
  debouncedChangeQuantityInCart: changeQuantityInCart;
  state = { value: this.props.value };

  constructor(props: CartLineQuantityInputProps) {
    super(props);
    this.debouncedChangeQuantityInCart = debounce(
      props.changeQuantityInCart,
      500
    );
  }

  handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (value.length <= target.maxLength) {
      this.debouncedChangeQuantityInCart(
        this.props.variantId,
        parseInt(value, 10)
      );
      this.setState({ value: parseInt(value, 10) });
    }
  };

  render() {
    const { processing } = this.props;
    const { value } = this.state;

    return (
      <TextField
        onChange={this.handleOnChange}
        disabled={processing}
        value={value}
        type="number"
        maxLength={9}
        max={999999999}
      />
    );
  }
}

export default CartLineQuantityInput;
