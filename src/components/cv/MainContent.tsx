import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors } from './Common';
import { Timeline } from './Timeline';
import { ProjectCard } from './ProjectCard';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleBar: {
    width: 3,
    height: 14,
    backgroundColor: colors.accent,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summary: {
    fontSize: 9.5,
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
  personalProjects: {
    title: string;
    category: string;
    description: string;
    stack: string[];
  }[];
  techStack: {
    name: string;
    items: string[];
  }[];
  language: 'en' | 'es';
}

export const MainContent: React.FC<MainContentProps> = ({
  summary,
  experience,
  personalProjects,
  language,
}) => {
  const labels = {
    en: {
      summary: 'Professional Summary',
      experience: 'Professional Experience',
      projects: 'Personal Projects',
    },
    es: {
      summary: 'Resumen Profesional',
      experience: 'Experiencia Profesional',
      projects: 'Proyectos Personales',
    },
  }[language];

  return (
    <View style={styles.mainContent}>
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionTitleBar} />
          <Text style={styles.sectionTitle}>{labels.summary}</Text>
        </View>
        <Text style={styles.summary}>{summary}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionTitleBar} />
          <Text style={styles.sectionTitle}>{labels.experience}</Text>
        </View>
        <Timeline roles={experience} />
      </View>

      {personalProjects.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <View style={styles.sectionTitleBar} />
            <Text style={styles.sectionTitle}>{labels.projects}</Text>
          </View>
          {personalProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              category={project.category}
              description={project.description}
              stack={project.stack}
            />
          ))}
        </View>
      )}
    </View>
  );
};
