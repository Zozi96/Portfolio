import React from 'react';
import { View, Text, StyleSheet, Svg, Path, Link } from '@react-pdf/renderer';
import { colors, icons } from './Common';

const styles = StyleSheet.create({
  sidebar: {
    width: '30%',
    backgroundColor: colors.sidebarBg,
    paddingTop: 24,
    paddingHorizontal: 18,
    paddingBottom: 20,
    alignSelf: 'stretch',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleBar: {
    width: 3,
    height: 12,
    backgroundColor: colors.accent,
    marginRight: 7,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.sidebarTitle,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  contactIcon: {
    width: 9,
    height: 9,
    marginRight: 7,
  },
  contactText: {
    fontSize: 8,
    color: colors.sidebarText,
  },
  contactLink: {
    fontSize: 8,
    color: colors.accent,
    textDecoration: 'none',
  },
  techCategory: {
    marginBottom: 9,
  },
  techCategoryName: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.sidebarTitle,
    marginBottom: 4,
    opacity: 0.7,
  },
  techItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techBadge: {
    backgroundColor: colors.badgeBg,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 3,
    marginBottom: 3,
  },
  techText: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  languageDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: 7,
    opacity: 0.8,
  },
  languageText: {
    fontSize: 8,
    color: colors.sidebarText,
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
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionTitleBar} />
          <Text style={styles.sectionTitle}>{labels.contact}</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon path={icons.mail} />
          <Text style={styles.contactText}>{email}</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon path={icons.github} />
          <Link src={`https://${github.replace('https://', '')}`} style={styles.contactLink}>
            {github.replace('https://', '')}
          </Link>
        </View>
        <View style={styles.contactItem}>
          <Icon path={icons.linkedin} />
          <Link src={`https://${linkedin.replace('https://', '')}`} style={styles.contactLink}>
            {linkedin.replace('https://', '')}
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionTitleBar} />
          <Text style={styles.sectionTitle}>{labels.techStack}</Text>
        </View>
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

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionTitleBar} />
          <Text style={styles.sectionTitle}>{labels.languages}</Text>
        </View>
        {labels.spokenLanguages.map((lang, index) => (
          <View key={index} style={styles.languageItem}>
            <View style={styles.languageDot} />
            <Text style={styles.languageText}>{lang}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
