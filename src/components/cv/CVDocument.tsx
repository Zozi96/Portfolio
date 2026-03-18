import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { colors } from './Common';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    fontFamily: 'Helvetica',
  },
  header: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 30,
    color: colors.white,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});

interface CVDocumentProps {
  data: any;
  language: 'en' | 'es';
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data, language }) => (
  <Document
    title={`${data.hero.name} - CV`}
    author={data.hero.name}
    subject={`${data.hero.title} Resume`}
    keywords={data.seo.keywords}
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.hero.name}</Text>
        <Text style={styles.title}>{data.hero.title}</Text>
      </View>

      {/* Main Body */}
      <View style={styles.contentContainer}>
        <Sidebar
          email={data.footer.email}
          github={data.footer.github}
          linkedin={data.footer.linkedin}
          techStack={data.techStack.categories}
          language={language}
        />
        <MainContent
          summary={data.hero.subtitle}
          experience={data.experience.roles}
          projects={data.projects.items}
          language={language}
        />
      </View>
    </Page>
  </Document>
);

export default CVDocument;
