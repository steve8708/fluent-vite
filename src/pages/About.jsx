import React from 'react';
import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Body1,
  Link,
  Card,
  CardHeader,
  Badge,
  Divider
} from '@fluentui/react-components';
import {
  OpenRegular,
  HeartRegular,
  GlobeRegular,
  CodeRegular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalXXL,
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalXL
  },
  title: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorBrandForeground1
  },
  section: {
    marginBottom: tokens.spacingVerticalXXL
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground1
  },
  content: {
    lineHeight: '1.6',
    marginBottom: tokens.spacingVerticalL
  },
  linksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  linkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL
  },
  statCard: {
    textAlign: 'center',
    padding: tokens.spacingHorizontalL
  },
  statNumber: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalS
  },
  statLabel: {
    color: tokens.colorNeutralForeground2
  }
});

export default function About() {
  const styles = useStyles();

  const links = [
    {
      icon: GlobeRegular,
      title: 'Fluent UI Official Website',
      url: 'https://fluent2.microsoft.design/',
      description: 'Learn more about Microsoft Fluent Design'
    },
    {
      icon: CodeRegular,
      title: 'Fluent UI React',
      url: 'https://react.fluentui.dev/',
      description: 'Official React components documentation'
    },
    {
      icon: HeartRegular,
      title: 'GitHub Repository',
      url: 'https://github.com/microsoft/fluentui',
      description: 'Open source Fluent UI components'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title1 className={styles.title}>About This Demo</Title1>
        <Body1>
          A showcase of Microsoft Fluent UI components and design principles
        </Body1>
      </div>

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>What is Fluent UI?</Title2>
        <Body1 className={styles.content}>
          Fluent UI is Microsoft's design system that provides a collection of UX frameworks 
          for creating beautiful, accessible web applications. It's used across Microsoft 
          products like Office 365, Teams, and Azure to ensure consistency and quality.
        </Body1>
        <Body1 className={styles.content}>
          This demo showcases Fluent UI React v9 components, which are the latest generation 
          of components built with modern React patterns, accessibility best practices, and 
          performance optimizations.
        </Body1>
      </div>

      <Divider />

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>Key Features</Title2>
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <CardHeader
              header={
                <div>
                  <div className={styles.statNumber}>100+</div>
                  <div className={styles.statLabel}>Components</div>
                </div>
              }
            />
          </Card>
          <Card className={styles.statCard}>
            <CardHeader
              header={
                <div>
                  <div className={styles.statNumber}>WCAG 2.1</div>
                  <div className={styles.statLabel}>Accessibility</div>
                </div>
              }
            />
          </Card>
          <Card className={styles.statCard}>
            <CardHeader
              header={
                <div>
                  <div className={styles.statNumber}>TypeScript</div>
                  <div className={styles.statLabel}>Built-in</div>
                </div>
              }
            />
          </Card>
        </div>
      </div>

      <Divider />

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>Learn More</Title2>
        <div className={styles.linksList}>
          {links.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                className={styles.linkItem}
              >
                <IconComponent />
                <div>
                  <div style={{ fontWeight: tokens.fontWeightSemibold }}>
                    {link.title}
                  </div>
                  <div style={{ color: tokens.colorNeutralForeground2, fontSize: tokens.fontSizeBase200 }}>
                    {link.description}
                  </div>
                </div>
                <OpenRegular style={{ marginLeft: 'auto' }} />
              </Link>
            );
          })}
        </div>
      </div>

      <Divider />

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>About This App</Title2>
        <Body1 className={styles.content}>
          This demo application was built with:
        </Body1>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalS, flexWrap: 'wrap', marginTop: tokens.spacingVerticalM }}>
          <Badge appearance="outline">React 19</Badge>
          <Badge appearance="outline">Fluent UI v9</Badge>
          <Badge appearance="outline">React Router</Badge>
          <Badge appearance="outline">Vite</Badge>
        </div>
      </div>
    </div>
  );
} 