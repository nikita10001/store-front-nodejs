import React from 'react';
import ReactDOM from 'react-dom/client';
import 'app/styles/index.scss';
import App from './app/App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
