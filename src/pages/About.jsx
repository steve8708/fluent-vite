import React from "react";
import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Title3,
  Body1,
  Subtitle1,
  Link,
  Card,
  CardHeader,
  Badge,
  Divider,
} from "@fluentui/react-components";
import {
  OpenRegular,
  HeartRegular,
  GlobeRegular,
  CodeRegular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: "calc(100vh - 64px)",
  },
  hero: {
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "40px",
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground1,
    letterSpacing: "-0.01em",
  },
  heroSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.5",
  },
  mainContent: {
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    maxWidth: "1000px",
    margin: "0 auto",
  },
  section: {
    marginBottom: tokens.spacingVerticalXXXL,
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalXL,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "28px",
    letterSpacing: "-0.01em",
  },
  contentText: {
    lineHeight: "1.7",
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: tokens.spacingHorizontalXL,
    marginTop: tokens.spacingVerticalXL,
  },
  statCard: {
    padding: tokens.spacingHorizontalXL,
    textAlign: "center",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow8,
      borderTopColor: tokens.colorBrandStroke2,
      borderRightColor: tokens.colorBrandStroke2,
      borderBottomColor: tokens.colorBrandStroke2,
      borderLeftColor: tokens.colorBrandStroke2,
    },
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalS,
    lineHeight: "1.2",
  },
  statLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
  },
  linksGrid: {
    display: "grid",
    gap: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalXL,
  },
  linkCard: {
    display: "flex",
    alignItems: "center",
    padding: tokens.spacingHorizontalXL,
    textDecoration: "none",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: tokens.shadow8,
      borderTopColor: tokens.colorBrandStroke2,
      borderRightColor: tokens.colorBrandStroke2,
      borderBottomColor: tokens.colorBrandStroke2,
      borderLeftColor: tokens.colorBrandStroke2,
      textDecoration: "none",
    },
  },
  linkIcon: {
    fontSize: "24px",
    color: tokens.colorBrandForeground1,
    marginRight: tokens.spacingHorizontalL,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
    fontSize: tokens.fontSizeBase300,
  },
  linkDescription: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: "1.4",
  },
  externalIcon: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
    marginLeft: tokens.spacingHorizontalM,
  },
  techStack: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
    marginTop: tokens.spacingVerticalL,
    justifyContent: "center",
  },
  techBadge: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  dividerSection: {
    margin: `${tokens.spacingVerticalXXL} 0`,
  },
});

export default function About() {
  const styles = useStyles();

  const links = [
    {
      icon: GlobeRegular,
      title: "Fluent UI Official Website",
      url: "https://fluent2.microsoft.design/",
      description: "Comprehensive design system documentation and guidelines",
    },
    {
      icon: CodeRegular,
      title: "Fluent UI React Documentation",
      url: "https://react.fluentui.dev/",
      description: "Complete API reference and component documentation",
    },
    {
      icon: HeartRegular,
      title: "GitHub Repository",
      url: "https://github.com/microsoft/fluentui",
      description: "Open source community and contribution guidelines",
    },
  ];

  const stats = [
    { number: "100+", label: "Components" },
    { number: "WCAG 2.1", label: "Accessibility" },
    { number: "TypeScript", label: "Built-in Support" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroTitle}>About Fluent UI</div>
        <div className={styles.heroSubtitle}>
          A comprehensive showcase of Microsoft's design system and component
          library
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>What is Fluent UI?</Title2>
          <Body1 className={styles.contentText}>
            Fluent UI is Microsoft's design system that provides a collection of
            UX frameworks for creating beautiful, accessible web applications.
            It's the foundation behind Microsoft products like Office 365,
            Teams, and Azure, ensuring consistency and quality across the entire
            Microsoft ecosystem.
          </Body1>
          <Body1 className={styles.contentText}>
            This demo showcases Fluent UI React v9 components, representing the
            latest generation of Microsoft's design system. Built with modern
            React patterns, accessibility best practices, and performance
            optimizations, these components are designed for enterprise-scale
            applications.
          </Body1>
        </div>

        <Divider className={styles.dividerSection} />

        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>Key Features</Title2>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Card key={index} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        <Divider className={styles.dividerSection} />

        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>Learn More</Title2>
          <div className={styles.linksGrid}>
            {links.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  className={styles.linkCard}
                >
                  <div className={styles.linkIcon}>
                    <IconComponent />
                  </div>
                  <div className={styles.linkContent}>
                    <div className={styles.linkTitle}>{link.title}</div>
                    <div className={styles.linkDescription}>
                      {link.description}
                    </div>
                  </div>
                  <OpenRegular className={styles.externalIcon} />
                </Link>
              );
            })}
          </div>
        </div>

        <Divider className={styles.dividerSection} />

        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>Technology Stack</Title2>
          <Body1 className={styles.contentText}>
            This demonstration application was built using modern web
            technologies and Microsoft's recommended development stack:
          </Body1>
          <div className={styles.techStack}>
            <div className={styles.techBadge}>React 19</div>
            <div className={styles.techBadge}>Fluent UI v9</div>
            <div className={styles.techBadge}>React Router</div>
            <div className={styles.techBadge}>Vite</div>
            <div className={styles.techBadge}>TypeScript</div>
            <div className={styles.techBadge}>Modern CSS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
