import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';
import type { ReactNode } from 'react';

const TestComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button data-testid="toggle" onClick={toggleTheme}>Toggle</button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>Dark</button>
      <button data-testid="set-light" onClick={() => setTheme('light')}>Light</button>
    </div>
  );
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should provide default light theme', () => {
    render(<TestComponent />, { wrapper });
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('should toggle theme', () => {
    render(<TestComponent />, { wrapper });
    const toggleBtn = screen.getByTestId('toggle');

    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should set theme directly', () => {
    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByTestId('set-dark'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    fireEvent.click(screen.getByTestId('set-light'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('should persist theme to localStorage', () => {
    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByTestId('set-dark'));
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should throw error when useTheme is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within ThemeProvider');

    consoleError.mockRestore();
  });
});
