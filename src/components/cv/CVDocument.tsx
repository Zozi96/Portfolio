import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';
import type { Content } from '../../data/content';

// Never hyphenate: wrap whole words instead of breaking them.
Font.registerHyphenationCallback((word) => [word]);

/**
 * Styled ("detailed") CV: clean professional light design matching the
 * portfolio direction — white page, near-black text, cobalt accents used
 * sparingly, subtle two-column layout. Linked from the site footer.
 */

const colors = {
  ink: '#14181F',
  text: '#4A5160',
  muted: '#7A8090',
  accent: '#2447D8',
  border: '#E7E8E4',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    paddingTop: 40,
    paddingBottom: 44,
    paddingHorizontal: 46,
    color: colors.text,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
    letterSpacing: 0.2,
  },
  role: {
    fontSize: 10.5,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
    marginTop: 3,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  nameRule: {
    height: 2,
    width: 44,
    backgroundColor: colors.accent,
    marginTop: 8,
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 8.5,
    color: colors.muted,
    marginBottom: 18,
  },
  contactLink: {
    fontSize: 8.5,
    color: colors.muted,
    textDecoration: 'none',
  },
  columns: {
    flexDirection: 'row',
  },
  main: {
    flex: 1,
    paddingRight: 22,
  },
  side: {
    width: 150,
    borderLeftWidth: 0.75,
    borderLeftColor: colors.border,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 3,
  },
  sectionRule: {
    height: 1,
    backgroundColor: colors.accent,
    opacity: 0.35,
    marginBottom: 8,
  },
  section: {
    marginBottom: 14,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.5,
    textAlign: 'left',
  },
  roleBlock: {
    marginBottom: 10,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
  },
  rolePeriod: {
    fontSize: 8,
    color: colors.muted,
    marginLeft: 10,
  },
  roleCompany: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1.5,
  },
  bulletMark: {
    width: 9,
    fontSize: 9,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    textAlign: 'left',
  },
  projectTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
  },
  projectStack: {
    fontSize: 8,
    color: colors.muted,
    marginTop: 1,
    marginBottom: 2,
  },
  sideCategory: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
    marginBottom: 2,
  },
  sideItems: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: colors.text,
    marginBottom: 7,
  },
  sideLine: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: colors.text,
    marginBottom: 4,
  },
  sideStrong: {
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
  },
});

const SectionTitle = ({ children }: { children: string }) => (
  <View minPresenceAhead={48}>
    <Text style={styles.sectionTitle}>{children}</Text>
    <View style={styles.sectionRule} />
  </View>
);

interface CVDocumentProps {
  data: Content;
  language: 'en' | 'es';
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data, language }) => {
  const labels = {
    en: {
      summary: 'Summary',
      experience: 'Experience',
      openSource: 'Open Source',
      skills: 'Core Skills',
      education: 'Education',
      languages: 'Languages',
      spoken: ['English — Professional', 'Spanish — Native'],
    },
    es: {
      summary: 'Resumen',
      experience: 'Experiencia',
      openSource: 'Open Source',
      skills: 'Habilidades',
      education: 'Educación',
      languages: 'Idiomas',
      spoken: ['Inglés — Profesional', 'Español — Nativo'],
    },
  }[language];

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
        <View style={styles.nameRule} />
        <Text style={styles.contactLine}>
          {data.footer.email}
          {'   ·   '}
          <Link src={`https://${data.footer.github}`} style={styles.contactLink}>
            {data.footer.github}
          </Link>
          {'   ·   '}
          <Link src={`https://${data.footer.linkedin}`} style={styles.contactLink}>
            {data.footer.linkedin}
          </Link>
          {'   ·   '}
          <Link src={`https://${data.footer.portfolio}`} style={styles.contactLink}>
            {data.footer.portfolio}
          </Link>
          {'   ·   '}
          Villahermosa, MX
        </Text>

        <View style={styles.columns}>
          <View style={styles.main}>
            <View style={styles.section}>
              <SectionTitle>{labels.summary}</SectionTitle>
              <Text style={styles.paragraph}>{data.hero.subtitle}</Text>
            </View>

            <View style={styles.section}>
              <SectionTitle>{labels.experience}</SectionTitle>
              {data.experience.roles.map((role) => (
                <View key={`${role.title}-${role.company}`} style={styles.roleBlock}>
                  {/* Keep the role header glued to at least its first bullet. */}
                  <View wrap={false}>
                    <View style={styles.roleHeader}>
                      <Text style={styles.roleTitle}>{role.title}</Text>
                      <Text style={styles.rolePeriod}>{role.period}</Text>
                    </View>
                    <Text style={styles.roleCompany}>{role.company}</Text>
                    {role.description.slice(0, 1).map((item, index) => (
                      <View key={index} style={styles.bulletRow}>
                        <Text style={styles.bulletMark}>—</Text>
                        <Text style={styles.bulletText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                  {role.description.slice(1).map((item, index) => (
                    <View key={index} style={styles.bulletRow}>
                      <Text style={styles.bulletMark}>—</Text>
                      <Text style={styles.bulletText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <SectionTitle>{labels.openSource}</SectionTitle>
              {data.personalProjects.items.map((project) => (
                <View key={project.title} style={styles.roleBlock} wrap={false} minPresenceAhead={40}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectStack}>{project.stack.join(' · ')}</Text>
                  <Text style={styles.paragraph}>{project.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.side}>
            <View style={styles.section}>
              <SectionTitle>{labels.skills}</SectionTitle>
              {data.techStack.categories.map((category) => (
                <View key={category.name}>
                  <Text style={styles.sideCategory}>{category.name}</Text>
                  <Text style={styles.sideItems}>{category.items.join(', ')}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <SectionTitle>{labels.education}</SectionTitle>
              {data.education.items.map((item) => (
                <Text key={item.degree} style={styles.sideLine}>
                  <Text style={styles.sideStrong}>{item.degree}</Text>
                  {'\n'}
                  {item.institution}
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <SectionTitle>{labels.languages}</SectionTitle>
              {labels.spoken.map((line) => (
                <Text key={line} style={styles.sideLine}>
                  {line}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
