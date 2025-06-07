import React from 'react';
import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Body1,
  Card,
  CardHeader,

  Button,
  Badge
} from '@fluentui/react-components';
import {
  ArrowRight24Regular,
  SparkleRegular,
  DesignIdeasRegular,
  CodeRegular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalXXL,
    maxWidth: '1200px',
    margin: '0 auto'
  },
  hero: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalXXL
  },
  title: {
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorBrandForeground1
  },
  subtitle: {
    marginBottom: tokens.spacingVerticalXL,
    color: tokens.colorNeutralForeground2,
    maxWidth: '600px',
    margin: `0 auto ${tokens.spacingVerticalXL}`
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalXXL
  },
  featureCard: {
    height: '100%'
  },
  cardIcon: {
    fontSize: '32px',
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalM
  },
  cardTitle: {
    marginBottom: tokens.spacingVerticalS
  },
  cardDescription: {
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL
  },
  getStartedSection: {
    marginTop: tokens.spacingVerticalXXL,
    textAlign: 'center',
    padding: tokens.spacingHorizontalXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge
  }
});

export default function Home() {
  const styles = useStyles();

  const features = [
    {
      icon: DesignIdeasRegular,
      title: 'Modern Design System',
      description: 'Built with Microsoft Fluent Design principles for a cohesive and beautiful user experience.',
      badge: 'Design'
    },
    {
      icon: CodeRegular,
      title: 'React Components',
      description: 'Comprehensive library of accessible React components ready for production use.',
      badge: 'Development'
    },
    {
      icon: SparkleRegular,
      title: 'Theming Support',
      description: 'Customizable themes with dark mode support and brand color integration.',
      badge: 'Customization'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Title1 className={styles.title}>Welcome to Fluent UI Demo</Title1>
        <Body1 className={styles.subtitle}>
          Discover the power of Microsoft's Fluent Design System with this interactive demo. 
          Explore modern React components, theming capabilities, and responsive layouts.
        </Body1>
        <Button 
          appearance="primary" 
          size="large"
          iconAfter={<ArrowRight24Regular />}
        >
          Get Started
        </Button>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card key={index} className={styles.featureCard}>
              <CardHeader
                header={
                  <div>
                    <Badge appearance="outline" color="brand" style={{ marginBottom: tokens.spacingVerticalS }}>
                      {feature.badge}
                    </Badge>
                    <div className={styles.cardIcon}>
                      <IconComponent />
                    </div>
                    <Title2 className={styles.cardTitle}>{feature.title}</Title2>
                  </div>
                }
                description={
                  <Body1 className={styles.cardDescription}>
                    {feature.description}
                  </Body1>
                }
              />
            </Card>
          );
        })}
      </div>

      <div className={styles.getStartedSection}>
        <Title2 style={{ marginBottom: tokens.spacingVerticalM }}>
          Ready to explore?
        </Title2>
        <Body1 style={{ marginBottom: tokens.spacingVerticalL }}>
          Navigate through the demo using the navigation bar above to see different components and features in action.
        </Body1>
        <Button appearance="secondary">
          View Components
        </Button>
      </div>
    </div>
  );
}
