import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../../components';

storiesOf('Buttons', module)
  .add('Static', () => (
    <Button text={'Static Button'} />
  ))
  .add('Hover', () => (
    <Button text={'Hovered Button'} state={'hover'} />
  ))
  .add('Pressed', () => (
    <Button text={'Pressed Button'} state={'active'} />
  ));
