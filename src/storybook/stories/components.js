import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Input } from '../../components';

storiesOf('Components', module)
  .add('Button', () => (
    <Button>
      <span>Sample Button</span>
    </Button>
  ))
  .add('Input', () => (
    <div className='input-section'>
      <Input label='Input label' defaultValue='Text inside'/>
      <Input label='Input label' defaultValue='Text inside' disabled={true} />
      <Input label='Input label' defaultValue='Text inside' helpText={'Assistive text'} />
      <Input label='Input label' defaultValue='Text inside' error={'There is a problem with this field'} />
    </div>
  ));
