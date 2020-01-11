import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'app';
import * as serviceWorker from 'serviceWorker';
import { AppProvider } from 'stores';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
