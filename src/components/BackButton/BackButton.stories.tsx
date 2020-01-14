import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { BackButton } from './BackButton';
import { BrowserRouter } from 'react-router-dom';

storiesOf('BackButton', module)
  .addDecorator(story => (
    <BrowserRouter>
      <div style={{ height: '100%', width: '100%', display: 'flex' }}>{story()}</div>
    </BrowserRouter>
  ))
  .add('default', () => <BackButton to="/" />);
