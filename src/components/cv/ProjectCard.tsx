import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors } from './Common';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  category: {
    fontSize: 9,
    fontStyle: 'italic',
    color: colors.secondary,
    marginBottom: 5,
  },
  description: {
    fontSize: 9,
    color: colors.secondary,
    lineHeight: 1.4,
    marginBottom: 8,
  },
  stackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  badge: {
    backgroundColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 8,
    color: colors.primary,
    fontWeight: 'bold',
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
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.category}>{category}</Text>
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
