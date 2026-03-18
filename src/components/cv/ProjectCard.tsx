import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors } from './Common';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    padding: 10,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  category: {
    fontSize: 7.5,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    opacity: 0.85,
  },
  description: {
    fontSize: 8.5,
    color: colors.secondary,
    lineHeight: 1.45,
    marginBottom: 7,
    marginTop: 4,
  },
  stackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  badge: {
    backgroundColor: colors.badgeBg,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
  },
});

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  stack: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  description,
  stack,
}) => (
  <View style={styles.card} wrap={false}>
    <View style={styles.titleRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
    </View>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.stackContainer}>
      {stack.map((tech, index) => (
        <View key={index} style={styles.badge}>
          <Text style={styles.badgeText}>{tech}</Text>
        </View>
      ))}
    </View>
  </View>
);
