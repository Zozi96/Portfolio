import { describe, it, expect } from 'vitest';
import { colors, icons } from '../Common';

describe('CV Common Styles', () => {
  it('should define the correct palette constants', () => {
    expect(colors).toBeDefined();
    expect(colors.primary).toBe('#0f172a');
    expect(colors.secondary).toBe('#475569');
    expect(colors.accent).toBe('#D4A853');
    expect(colors.surface).toBe('#f8fafc');
  });

  it('should define SVG path constants for minimalist icons', () => {
    expect(icons).toBeDefined();
    expect(icons.mail).toBeDefined();
    expect(icons.github).toBeDefined();
    expect(icons.linkedin).toBeDefined();
    expect(icons.globe).toBeDefined();
    expect(icons.globe2).toBeDefined();
    expect(icons.bullet).toBeDefined();
  });
});
