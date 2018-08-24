import * as React from 'react';

import './scss/index.scss';

type TextFieldProps = {
  error?: string,
  helpText?: string,
  label?: string,
}

const TextField: React.SFC<TextFieldProps> = ({ label='', error, helpText, ...rest}) => (
  <div className='input'>
    <span className='input__label'>{label}</span>
    <input
      {...rest}
      className={`input__field${error ? ' input__field--error' : ''}`}
    />
    {error && <span className='input__error'>{error}</span>}
    {helpText && <span className='input__help-text'>{helpText}</span>}
  </div>
);

export default TextField;
