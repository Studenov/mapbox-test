import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { Index } from './components';

export const Application = () => (
  <Provider store={store}>
    <Index />
  </Provider>
);

