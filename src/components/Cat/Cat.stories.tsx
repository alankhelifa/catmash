import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Cat } from './Cat';

storiesOf('Cat', module)
  .addDecorator(story => (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {story()}
    </div>
  ))
  .add('default', () => (
    <Cat
      id={12}
      onClick={action('click')}
      image="http://25.media.tumblr.com/tumblr_mc1lz78RNn1qjc1a7o1_1280.jpg"
      variants={{ tap: { scale: 1.2 } }}
    />
  ));
