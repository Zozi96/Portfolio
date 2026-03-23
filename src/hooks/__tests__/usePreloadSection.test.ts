import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePreloadSection } from '../usePreloadSection';

describe('usePreloadSection', () => {
  const mockImportFn = vi.fn().mockResolvedValue({ default: () => null });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a ref', () => {
    const { result } = renderHook(() => usePreloadSection(mockImportFn));
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('should call importFn via requestIdleCallback on mount', () => {
    vi.useFakeTimers();
    renderHook(() => usePreloadSection(mockImportFn));

    // Fast-forward past the setTimeout fallback
    vi.advanceTimersByTime(1100);

    expect(mockImportFn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
