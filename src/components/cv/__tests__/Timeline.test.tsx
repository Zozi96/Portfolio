import { describe, it, expect } from 'vitest';
import { Timeline } from '../Timeline';

const mockRoles = [
  {
    title: 'Senior Software Engineer',
    company: 'ArkusNexus',
    period: 'March 2023 - Present',
    description: ['Lead architect', 'Modernized platform'],
  },
  {
    title: 'Python Developer',
    company: 'Adinfi',
    period: 'April 2022 - March 2023',
    description: ['Engineered backend', 'Improved system performance'],
  }
];

describe('Timeline Component', () => {
  it('should be defined', () => {
    expect(Timeline).toBeDefined();
  });

  it('should be a valid component function', () => {
    expect(typeof Timeline).toBe('function');
  });

  it('should return a valid React element', () => {
    const output = Timeline({ roles: mockRoles }) as any;
    expect(output).toBeDefined();
    expect(output?.props?.children).toHaveLength(mockRoles.length);
  });
});
