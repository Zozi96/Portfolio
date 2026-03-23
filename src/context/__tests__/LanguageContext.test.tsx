import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';
import { setTranslations } from '../../utils/translations';
import type { ReactNode } from 'react';

const mockContent = {
  en: {
    hello: 'Hello',
    nested: {
      world: 'World',
    },
  },
  es: {
    hello: 'Hola',
    nested: {
      world: 'Mundo',
    },
  },
};

setTranslations(mockContent);

const TestComponent = () => {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="hello">{t('hello')}</span>
      <span data-testid="nested">{t('nested.world')}</span>
      <button data-testid="set-en" onClick={() => setLocale('en')}>English</button>
      <button data-testid="set-es" onClick={() => setLocale('es')}>Spanish</button>
    </div>
  );
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should provide default English locale', () => {
    render(<TestComponent />, { wrapper });
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('should translate keys correctly', () => {
    render(<TestComponent />, { wrapper });
    expect(screen.getByTestId('hello')).toHaveTextContent('Hello');
    expect(screen.getByTestId('nested')).toHaveTextContent('World');
  });

  it('should change locale and update translations', () => {
    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByTestId('set-es'));

    expect(screen.getByTestId('locale')).toHaveTextContent('es');
    expect(screen.getByTestId('hello')).toHaveTextContent('Hola');
    expect(screen.getByTestId('nested')).toHaveTextContent('Mundo');
  });

  it('should persist locale to localStorage', () => {
    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByTestId('set-es'));
    expect(localStorage.setItem).toHaveBeenCalledWith('locale', 'es');
  });

  it('should update document lang attribute', () => {
    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByTestId('set-es'));
    expect(document.documentElement.lang).toBe('es');
  });

  it('should return key if translation not found', () => {
    const MissingKeyComponent = () => {
      const { t } = useLanguage();
      return <span data-testid="missing">{t('nonexistent.key')}</span>;
    };

    render(<MissingKeyComponent />, { wrapper });
    expect(screen.getByTestId('missing')).toHaveTextContent('nonexistent.key');
  });

  it('should throw error when useLanguage is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within LanguageProvider');

    consoleError.mockRestore();
  });
});
