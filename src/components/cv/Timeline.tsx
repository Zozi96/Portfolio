import React from 'react';
import { View, Text, StyleSheet, Svg, Circle, Line } from '@react-pdf/renderer';
import { colors } from './Common';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    minHeight: 60,
  },
  leftColumn: {
    width: 20,
    alignItems: 'center',
    position: 'relative',
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 20,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  companyPeriod: {
    fontSize: 9,
    color: colors.secondary,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 8,
    fontSize: 9,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: colors.secondary,
    lineHeight: 1.4,
  },
});

interface Role {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface TimelineItemProps {
  role: Role;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ role, isLast }) => (
  <View style={styles.itemContainer} wrap={false}>
    <View style={styles.leftColumn}>
      <Svg height="100%" width="20">
        {!isLast && (
          <Line
            x1="10"
            y1="12"
            x2="10"
            y2="100%"
            stroke={colors.border}
            strokeWidth={1}
          />
        )}
        <Circle cx="10" cy="10" r="4" fill={colors.primary} />
      </Svg>
    </View>
    <View style={styles.rightColumn}>
      <Text style={styles.roleTitle}>{role.title}</Text>
      <Text style={styles.companyPeriod}>{role.company} | {role.period}</Text>
      {role.description.map((desc, index) => (
        <View key={index} style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{desc}</Text>
        </View>
      ))}
    </View>
  </View>
);

interface TimelineProps {
  roles: Role[];
}

export const Timeline: React.FC<TimelineProps> = ({ roles }) => (
  <View style={styles.container}>
    {roles.map((role, index) => (
      <TimelineItem 
        key={index} 
        role={role} 
        isLast={index === roles.length - 1} 
      />
    ))}
  </View>
);
