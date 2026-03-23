import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path, Link } from '@react-pdf/renderer';
import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';
import { colors, icons } from './Common';
import type { Content } from '../../data/content';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    fontFamily: 'Helvetica',
  },
  header: {
    width: '100%',
    paddingTop: 28,
    paddingBottom: 22,
    paddingHorizontal: 40,
    backgroundColor: colors.sidebarBg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    letterSpacing: 1.5,
  },
  titleRule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  titleText: {
    fontSize: 10,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  titleLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.accent,
    opacity: 0.35,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 0,
    marginBottom: 14,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  contactIcon: {
    width: 9,
    height: 9,
    marginRight: 5,
  },
  contactText: {
    fontSize: 8.5,
    color: colors.sidebarText,
  },
  contactLinkHeader: {
    fontSize: 8.5,
    color: colors.sidebarText,
    textDecoration: 'none',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
  },
  statItem: {
    borderTopWidth: 2,
    borderTopColor: colors.accent,
    paddingTop: 6,
    paddingRight: 16,
  },
  statValue: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
    marginBottom: 1,
  },
  statLabel: {
    fontSize: 6.5,
    color: colors.sidebarText,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});

const Icon = ({ path, gold }: { path: string; gold?: boolean }) => (
  <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
    <Path d={path} fill={gold ? colors.accent : colors.sidebarText} />
  </Svg>
);

interface CVDocumentProps {
  data: Content;
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
      <View style={styles.header}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{data.hero.name}</Text>
        </View>

        <View style={styles.titleRule}>
          <Text style={styles.titleText}>{data.hero.title}</Text>
          <View style={styles.titleLine} />
        </View>

        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Icon path={icons.mail} />
            <Text style={styles.contactText}>{data.footer.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon path={icons.github} />
            <Link src={`https://${data.footer.github}`} style={styles.contactLinkHeader}>
              {data.footer.github}
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Icon path={icons.linkedin} />
            <Link src={`https://${data.footer.linkedin}`} style={styles.contactLinkHeader}>
              {data.footer.linkedin}
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Icon path={icons.globe} />
            <Link src={`https://${data.footer.portfolio}`} style={styles.contactLinkHeader}>
              {data.footer.portfolio}
            </Link>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5+</Text>
            <Text style={styles.statLabel}>{language === 'en' ? 'Years Exp.' : 'Años Exp.'}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>{language === 'en' ? 'Companies' : 'Empresas'}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>{language === 'en' ? 'Industries' : 'Industrias'}</Text>
          </View>
        </View>
      </View>

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
          personalProjects={data.personalProjects.items}
          techStack={data.techStack.categories}
          language={language}
        />
      </View>
    </Page>
  </Document>
);

export default CVDocument;
