import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../../router/app-router';

const renderWithRouter = (initialRoute = '/', component?: JSX.Element) => {
  window.history.pushState({}, 'Test page', initialRoute);
  render(
    <BrowserRouter>
      <AppRouter />
      {component}
    </BrowserRouter>
  );
};
export default renderWithRouter;
