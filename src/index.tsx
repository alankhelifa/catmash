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

setTimeout(() => {
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}, 1000);

serviceWorker.unregister();
