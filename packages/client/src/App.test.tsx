import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './tests/utils/render-with-router';

describe('App', () => {
  test('app rendering', () => {
    act(() => {
      renderWithRouter('/');
    });
    expect(window.location.pathname).toBe('/');
    expect(document.querySelector('.App')).toBeInTheDocument();
  });

  test('app protected mainPage', async () => {
    act(() => {
      renderWithRouter('/');
    });
    await waitFor(() => {
      expect(window.location.pathname).toBe('/sign-in');
      const title = screen.getByText(/вход/i);
      expect(title).toBeInTheDocument();
    });
  });

  test('app menu', async () => {
    renderWithRouter('/leader-board');
    expect(window.location.pathname).toBe('/leader-board');
    const menuButton = document.querySelector('.anticon-menu') as HTMLElement;
    expect(menuButton).toBeInTheDocument();
  });

  test('app redirect', () => {
    renderWithRouter('/test');
    expect(window.location.pathname).toBe('/test');
    const title = screen.getByText(/404/i);
    expect(title).toBeInTheDocument();
  });

  test('app sign-up', () => {
    renderWithRouter('/sign-up');
    expect(window.location.pathname).toBe('/sign-up');
    const title = screen.getByText(/регистрация/i);
    expect(title).toBeInTheDocument();
  });

  test('app game canvas', () => {
    renderWithRouter('/game');
    const buttonStart = screen.getByTestId('startGame');
    fireEvent.click(buttonStart);
    const canvas = document.querySelector('canvas') as HTMLElement;
    expect(canvas).toBeInTheDocument();
  });

  test('app game start button', () => {
    renderWithRouter('/game');
    const buttonStart = screen.getByTestId('startGame');
    expect(buttonStart).toBeInTheDocument();
  });
});
