import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import type { Content } from '../../data/content';

// Never hyphenate: wrap whole words instead of breaking them.
Font.registerHyphenationCallback((word) => [word]);

/**
 * ATS-optimized CV: single column, Helvetica only, no tables, pills,
 * icons, or graphics. This is the default "Download CV" artifact.
 */

const ink = '#000000';
const body = '#222222';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    paddingTop: 42,
    paddingBottom: 46,
    paddingHorizontal: 52,
    color: body,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: ink,
  },
  role: {
    fontSize: 11,
    color: body,
    marginTop: 3,
  },
  contactLine: {
    fontSize: 9,
    color: body,
    marginTop: 6,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: ink,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: '#999999',
  },
  paragraph: {
    fontSize: 9.5,
    lineHeight: 1.45,
    textAlign: 'left',
  },
  skillLine: {
    fontSize: 9.5,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  skillCategory: {
    fontFamily: 'Helvetica-Bold',
    color: ink,
  },
  roleBlock: {
    marginBottom: 9,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2.5,
  },
  roleTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: ink,
  },
  rolePeriod: {
    fontSize: 9,
    color: body,
    marginLeft: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1.5,
  },
  bulletMark: {
    width: 10,
    fontSize: 9.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.4,
    textAlign: 'left',
  },
  simpleLine: {
    fontSize: 9.5,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
    color: ink,
  },
});

interface ATSDocumentProps {
  data: Content;
  language: 'en' | 'es';
}

export const ATSDocument: React.FC<ATSDocumentProps> = ({ data, language }) => {
  const labels = {
    en: {
      summary: 'Summary',
      skills: 'Core Skills',
      experience: 'Experience',
      education: 'Education',
      openSource: 'Open Source',
      languages: 'Languages',
      spoken: ['English — Professional', 'Spanish — Native'],
    },
    es: {
      summary: 'Resumen',
      skills: 'Habilidades Clave',
      experience: 'Experiencia',
      education: 'Educación',
      openSource: 'Open Source',
      languages: 'Idiomas',
      spoken: ['Inglés — Profesional', 'Español — Nativo'],
    },
  }[language];

  const contactLine = [
    data.footer.email,
    data.footer.github,
    data.footer.linkedin,
    data.footer.portfolio,
    'Villahermosa, MX',
  ].join(' | ');

  return (
    <Document
      title={`${data.hero.name} - CV`}
      author={data.hero.name}
      subject={`${data.hero.card.roleValue} Resume`}
      keywords={data.seo.keywords}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.hero.name}</Text>
        <Text style={styles.role}>{data.hero.card.roleValue}</Text>
        <Text style={styles.contactLine}>{contactLine}</Text>

        <View wrap={false}>
          <Text style={styles.sectionTitle}>{labels.summary}</Text>
          <Text style={styles.paragraph}>{data.hero.subtitle}</Text>
        </View>

        <View wrap={false}>
          <Text style={styles.sectionTitle}>{labels.skills}</Text>
          {data.techStack.categories.map((category) => (
            <Text key={category.name} style={styles.skillLine}>
              <Text style={styles.skillCategory}>{category.name}: </Text>
              {category.items.join(', ')}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle} minPresenceAhead={48}>
          {labels.experience}
        </Text>
        {data.experience.roles.map((role) => (
          <View key={`${role.title}-${role.company}`} style={styles.roleBlock}>
            {/* Keep the role header glued to at least its first bullet. */}
            <View wrap={false}>
              <View style={styles.roleHeader}>
                <Text style={styles.roleTitle}>
                  {role.title} — {role.company}
                </Text>
                <Text style={styles.rolePeriod}>{role.period}</Text>
              </View>
              {role.description.slice(0, 1).map((item, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletMark}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
            {role.description.slice(1).map((item, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bulletMark}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        <View wrap={false}>
          <Text style={styles.sectionTitle}>{labels.education}</Text>
          {data.education.items.map((item) => (
            <Text key={item.degree} style={styles.simpleLine}>
              <Text style={styles.bold}>{item.degree}</Text> — {item.institution}
            </Text>
          ))}
        </View>

        <View wrap={false}>
          <Text style={styles.sectionTitle}>{labels.openSource}</Text>
          {data.personalProjects.items.map((project) => (
            <View key={project.title} style={styles.roleBlock}>
              <Text style={styles.simpleLine}>
                <Text style={styles.bold}>{project.title}</Text> — {project.description}
              </Text>
            </View>
          ))}
        </View>

        <View wrap={false}>
          <Text style={styles.sectionTitle}>{labels.languages}</Text>
          {labels.spoken.map((line) => (
            <Text key={line} style={styles.simpleLine}>
              {line}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ATSDocument;
