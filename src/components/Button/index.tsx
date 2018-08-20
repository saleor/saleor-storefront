import * as React from 'react';

import './scss/index.scss';

interface ButtonProps {
  text: string,
  state: 'hover' | 'active'
}

const Button: React.SFC<ButtonProps> = (props) => (
  <button className={props.state}>
    <span>
      {props.text}
    </span>
  </button>
)

export default Button;
