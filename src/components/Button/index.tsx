import * as React from 'react';

import './scss/index.scss';

const Button: React.SFC = ({ children }) => (
  <button>
    {children}
  </button>
);

export default Button;
