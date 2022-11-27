import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore, Store } from '@reduxjs/toolkit';
import leaderBoardReducer from './store/reducers/leader-board'
import userReducer from './store/reducers/user'
import App from './App';

export function render(url: string, store: Store) {
  return renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );
}

export function configureInitialStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      leaderBoard: leaderBoardReducer,
    },
    devTools: true
  });
}
