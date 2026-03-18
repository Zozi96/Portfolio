import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors } from './Common';

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  itemWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  itemContainer: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    paddingLeft: 12,
    marginLeft: 7,
  },
  dotOuter: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.sidebarBg,
    position: 'absolute',
    left: -11,
    top: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleCompanyContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 1,
  },
  roleTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.5,
    color: colors.primary,
  },
  separator: {
    fontSize: 10,
    color: colors.accent,
    marginHorizontal: 4,
    opacity: 0.6,
  },
  companyName: {
    fontSize: 10,
    color: colors.secondary,
  },
  periodPill: {
    backgroundColor: colors.badgeBg,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  periodText: {
    fontSize: 7.5,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
  },
  bulletPoint: {
    marginBottom: 2,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontSize: 9,
    color: colors.accent,
    marginRight: 4,
    marginTop: 0.5,
    opacity: 0.7,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: colors.secondary,
    lineHeight: 1.45,
    textAlign: 'justify',
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
}

const TimelineItem: React.FC<TimelineItemProps> = ({ role }) => (
  <View style={styles.itemWrapper} wrap={false}>
    <View style={styles.dotOuter} />
    <View style={styles.itemContainer}>
      <View style={styles.headerRow}>
        <View style={styles.titleCompanyContainer}>
          <Text style={styles.roleTitle}>{role.title}</Text>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.companyName}>{role.company}</Text>
        </View>
        <View style={styles.periodPill}>
          <Text style={styles.periodText}>{role.period}</Text>
        </View>
      </View>
      {role.description.map((desc, index) => (
        <View key={index} style={styles.bulletPoint}>
          <Text style={styles.bulletDot}>›</Text>
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
      />
    ))}
  </View>
);
