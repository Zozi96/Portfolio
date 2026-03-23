import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentMeta } from '../useDocumentMeta';

describe('useDocumentMeta', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.title = '';
    document.head.innerHTML = '';
  });

  it('should update document title', () => {
    renderHook(() =>
      useDocumentMeta({
        title: 'Test Title',
        description: 'Test Description',
      })
    );

    expect(document.title).toBe('Test Title');
  });

  it('should create meta description tag', () => {
    renderHook(() =>
      useDocumentMeta({
        title: 'Test',
        description: 'Test Description',
      })
    );

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription?.getAttribute('content')).toBe('Test Description');
  });

  it('should create Open Graph meta tags', () => {
    renderHook(() =>
      useDocumentMeta({
        title: 'Test',
        description: 'Test Description',
        ogTitle: 'OG Test Title',
        ogDescription: 'OG Test Description',
        ogType: 'website',
      })
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogType = document.querySelector('meta[property="og:type"]');

    expect(ogTitle?.getAttribute('content')).toBe('OG Test Title');
    expect(ogDescription?.getAttribute('content')).toBe('OG Test Description');
    expect(ogType?.getAttribute('content')).toBe('website');
  });

  it('should create Twitter Card meta tags', () => {
    renderHook(() =>
      useDocumentMeta({
        title: 'Test',
        description: 'Test Description',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Twitter Title',
        twitterDescription: 'Twitter Description',
      })
    );

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');

    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
    expect(twitterTitle?.getAttribute('content')).toBe('Twitter Title');
  });

  it('should update existing meta tags instead of creating duplicates', () => {
    const { rerender } = renderHook(
      (props) => useDocumentMeta(props),
      {
        initialProps: {
          title: 'First Title',
          description: 'First Description',
        },
      }
    );

    rerender({
      title: 'Second Title',
      description: 'Second Description',
    });

    const metaDescriptions = document.querySelectorAll('meta[name="description"]');
    expect(metaDescriptions).toHaveLength(1);
    expect(metaDescriptions[0]?.getAttribute('content')).toBe('Second Description');
  });
});
