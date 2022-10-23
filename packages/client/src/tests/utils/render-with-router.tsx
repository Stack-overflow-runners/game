import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../hooks/auth';
import { store } from '../../store';
import AppRouter from '../../router/app-router';

const renderWithRouter = (initialRoute = '/', component?: JSX.Element) => {
  window.history.pushState({}, 'Test page', initialRoute);
  render(
    <Provider store={store}>
      <AuthProvider>
        <div className="App">
          <BrowserRouter>
            <AppRouter />
            {component}
          </BrowserRouter>
        </div>
      </AuthProvider>
    </Provider>
  );
};
export default renderWithRouter;
