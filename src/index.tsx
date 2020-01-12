import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app';
import * as serviceWorker from 'serviceWorker';
import { AppProvider } from 'stores';

ReactDOM.render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>,
  document.getElementById('root'),
);

setTimeout(() => {
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}, 1000);

serviceWorker.unregister();
