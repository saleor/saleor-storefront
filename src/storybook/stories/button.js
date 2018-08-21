import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../../components';

storiesOf('Components', module)
  .add('Button', () => (
    <Button>
      <span>Sample Button</span>
    </Button>
  ));
