import { fireEvent, render, screen } from '@testing-library/react';
import Game from './pages/game';
import renderWithRouter from './tests/utils/render-with-router';

describe('App', () => {
  test('app rendering', () => {
    renderWithRouter();
    expect(window.location.pathname).toBe('/');
    expect(screen.getByText(/Играть/i)).toBeInTheDocument();
  });

  test('app menu', () => {
    renderWithRouter('/leader-board');
    expect(window.location.pathname).toBe('/leader-board');
    const menuButton = document.querySelector('.anticon-menu') as HTMLElement;
    expect(menuButton).toBeInTheDocument();
  });

  test('app menu navigation', async () => {
    renderWithRouter('/leader-board');
    const menuButton = document.querySelector('.anticon-menu') as HTMLElement;
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);
    const homeLink = document.querySelector(
      "[data-menu-id='rc-menu-uuid-test-home'] span a"
    ) as HTMLElement;
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    expect(screen.getByText(/Играть/i)).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  test('app redirect', () => {
    renderWithRouter('/test');
    expect(window.location.pathname).toBe('/');
  });

  test('app sign-in', () => {
    renderWithRouter('/sign-in');
    expect(window.location.pathname).toBe('/sign-in');
    const title = screen.getByText(/вход/i);
    expect(title).toBeInTheDocument();
  });

  test('app sign-up', () => {
    renderWithRouter('/sign-up');
    expect(window.location.pathname).toBe('/sign-up');
    const title = screen.getByText(/регистрация/i);
    expect(title).toBeInTheDocument();
  });

  test('app game canvas', () => {
    render(<Game />);
    const canvas = document.querySelector('canvas') as HTMLElement;
    expect(canvas).toBeInTheDocument();
  });

  test('app game start-stop', () => {
    render(<Game />);
    const buttonStart = screen.getByText(/start/i);
    expect(buttonStart).toBeInTheDocument();
    fireEvent.click(buttonStart);
    expect(buttonStart.textContent).toBe('stop');
  });
});
