import { describe, it, expect } from 'vitest';
import React from 'react';
import { ProjectCard } from '../ProjectCard';

const mockProject = {
  title: 'Portfolio Website',
  category: 'Personal Project',
  description: 'A modern portfolio built with React and Tailwind.',
  stack: ['React', 'TypeScript', 'Tailwind'],
};

describe('ProjectCard Component', () => {
  it('should be defined', () => {
    expect(ProjectCard).toBeDefined();
  });

  it('should render project details correctly', () => {
    const output = ProjectCard(mockProject);
    expect(output).toBeDefined();
    
    // Check if props are passed correctly to children (simplified check)
    const json = JSON.stringify(output);
    expect(json).toContain(mockProject.title);
    expect(json).toContain(mockProject.category);
    expect(json).toContain(mockProject.description);
    mockProject.stack.forEach(tech => {
      expect(json).toContain(tech);
    });
  });
});
