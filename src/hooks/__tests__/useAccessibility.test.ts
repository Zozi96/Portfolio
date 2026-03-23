import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAnnouncer, useSkipLink } from '../useAccessibility';

describe('useAnnouncer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should create aria-live element when announcing', () => {
    const { result } = renderHook(() => useAnnouncer());

    result.current.announce('Test message');

    const announcer = document.querySelector('[role="status"]');
    expect(announcer).toBeInTheDocument();
    expect(announcer).toHaveAttribute('aria-live', 'polite');
    expect(announcer).toHaveTextContent('Test message');
  });

  it('should use assertive priority when specified', () => {
    const { result } = renderHook(() => useAnnouncer());

    result.current.announce('Urgent message', 'assertive');

    const announcer = document.querySelector('[role="status"]');
    expect(announcer).toHaveAttribute('aria-live', 'assertive');
  });

  it('should remove announcer after timeout', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAnnouncer());

    result.current.announce('Test message');
    expect(document.querySelector('[role="status"]')).toBeInTheDocument();

    vi.advanceTimersByTime(1100);
    expect(document.querySelector('[role="status"]')).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});

describe('useSkipLink', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main id="main-content">Content</main>';
  });

  it('should focus main content when skipToContent is called', () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    result.current.skipToContent();

    const mainContent = document.getElementById('main-content');
    expect(mainContent).toHaveAttribute('tabindex', '-1');
    expect(document.activeElement).toBe(mainContent);
  });

  it('should remove tabindex on blur', () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    result.current.skipToContent();

    const mainContent = document.getElementById('main-content');
    mainContent?.blur();

    expect(mainContent).not.toHaveAttribute('tabindex');
  });
});
