import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors } from './Common';
import { Timeline } from './Timeline';
import { ProjectCard } from './ProjectCard';

const styles = StyleSheet.create({
  mainContent: {
    width: '70%',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    paddingBottom: 2,
  },
  summary: {
    fontSize: 9,
    color: colors.secondary,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
});

interface MainContentProps {
  summary: string;
  experience: {
    title: string;
    company: string;
    period: string;
    description: string[];
  }[];
  projects: {
    title: string;
    category: string;
    description: string;
    stack: string[];
  }[];
  language: 'en' | 'es';
}

export const MainContent: React.FC<MainContentProps> = ({
  summary,
  experience,
  projects,
  language,
}) => {
  const labels = {
    en: {
      summary: 'Professional Summary',
      experience: 'Professional Experience',
      projects: 'Key Projects',
    },
    es: {
      summary: 'Resumen Profesional',
      experience: 'Experiencia Profesional',
      projects: 'Proyectos Clave',
    },
  }[language];

  return (
    <View style={styles.mainContent}>
      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{labels.summary}</Text>
        <Text style={styles.summary}>{summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{labels.experience}</Text>
        <Timeline roles={experience} />
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{labels.projects}</Text>
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </View>
    </View>
  );
};
