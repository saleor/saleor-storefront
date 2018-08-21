import * as React from 'react';

import './scss/index.scss';

const Button: React.SFC<{}> = (props) => (
  <button>
    {props.children}
  </button>
)

export default Button;
