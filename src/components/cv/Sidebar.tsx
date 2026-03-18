import React from 'react';
import { View, Text, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { colors, icons } from './Common';

const styles = StyleSheet.create({
  sidebar: {
    width: '30%',
    backgroundColor: colors.surface,
    padding: 20,
    height: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    paddingBottom: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 8,
  },
  contactText: {
    fontSize: 8,
    color: colors.secondary,
  },
  techCategory: {
    marginBottom: 10,
  },
  techCategoryName: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 4,
  },
  techItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techBadge: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 4,
  },
  techText: {
    fontSize: 7,
    color: colors.primary,
  },
  languageItem: {
    marginBottom: 4,
  },
  languageText: {
    fontSize: 8,
    color: colors.secondary,
  },
});

const Icon = ({ path }: { path: string }) => (
  <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
    <Path d={path} fill={colors.accent} />
  </Svg>
);

interface SidebarProps {
  email: string;
  github: string;
  linkedin: string;
  techStack: {
    name: string;
    items: string[];
  }[];
  language: 'en' | 'es';
}

export const Sidebar: React.FC<SidebarProps> = ({
  email,
  github,
  linkedin,
  techStack,
  language,
}) => {
  const labels = {
    en: {
      contact: 'Contact',
      techStack: 'Tech Stack',
      languages: 'Languages',
      spokenLanguages: [
        'English (Professional)',
        'Spanish (Native)',
      ],
    },
    es: {
      contact: 'Contacto',
      techStack: 'Stack Tecnológico',
      languages: 'Idiomas',
      spokenLanguages: [
        'Inglés (Profesional)',
        'Español (Nativo)',
      ],
    },
  }[language];

  return (
    <View style={styles.sidebar}>
      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{labels.contact}</Text>
        <View style={styles.contactItem}>
          <Icon path={icons.mail} />
          <Text style={styles.contactText}>{email}</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon path={icons.github} />
          <Text style={styles.contactText}>{github.replace('https://', '')}</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon path={icons.linkedin} />
          <Text style={styles.contactText}>{linkedin.replace('https://', '')}</Text>
        </View>
      </View>

      {/* Tech Stack Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{labels.techStack}</Text>
        {techStack.map((category, index) => (
          <View key={index} style={styles.techCategory}>
            <Text style={styles.techCategoryName}>{category.name}</Text>
            <View style={styles.techItems}>
              {category.items.map((item, i) => (
                <View key={i} style={styles.techBadge}>
                  <Text style={styles.techText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Spoken Languages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{labels.languages}</Text>
        {labels.spokenLanguages.map((lang, index) => (
          <View key={index} style={styles.languageItem}>
            <Text style={styles.languageText}>• {lang}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
