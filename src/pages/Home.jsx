import React from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Title3,
  Body1,
  Subtitle1,
  Card,
  CardHeader,
  Button,
  Badge,
  Divider,
} from "@fluentui/react-components";
import {
  ArrowRight24Regular,
  SparkleRegular,
  DesignIdeasRegular,
  CodeRegular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: "calc(100vh - 64px)",
  },
  hero: {
    background: `linear-gradient(135deg, #0078d4 0%, #106ebe 100%)`,
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    textAlign: "center",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)",
      pointerEvents: "none",
    },
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "1.2",
    marginBottom: tokens.spacingVerticalL,
    color: "#ffffff",
    letterSpacing: "-0.02em",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  heroSubtitle: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: "1.5",
    marginBottom: tokens.spacingVerticalXXL,
    color: "#ffffff",
    opacity: 0.95,
    maxWidth: "600px",
    margin: `0 auto ${tokens.spacingVerticalXXL}`,
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
  },
  heroButton: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
    height: "48px",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: "#ffffff",
    color: "#0078d4",
    border: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
      backgroundColor: "#f8f9fa",
    },
  },
  mainContent: {
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: `${tokens.spacingVerticalXXXL}`,
    color: tokens.colorNeutralForeground1,
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "-0.01em",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: tokens.spacingHorizontalXL,
    marginBottom: `${tokens.spacingVerticalXXXL}`,
  },
  featureCard: {
    height: "100%",
    padding: tokens.spacingHorizontalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    transition: "all 0.2s ease-in-out",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.shadow16,
      borderTopColor: tokens.colorBrandStroke2,
      borderRightColor: tokens.colorBrandStroke2,
      borderBottomColor: tokens.colorBrandStroke2,
      borderLeftColor: tokens.colorBrandStroke2,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: tokens.colorBrandBackground,
    },
  },
  featureHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalL,
  },
  featureBadge: {
    marginRight: tokens.spacingHorizontalM,
  },
  featureIcon: {
    fontSize: "32px",
    color: tokens.colorBrandForeground1,
    marginLeft: "auto",
  },
  featureTitle: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  featureDescription: {
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.6",
  },
  ctaSection: {
    textAlign: "center",
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    position: "relative",
    maxWidth: "700px",
    margin: "0 auto",
  },
  ctaTitle: {
    marginBottom: tokens.spacingVerticalXL,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "28px",
  },
  ctaDescription: {
    marginBottom: tokens.spacingVerticalXXL,
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.6",
    fontSize: tokens.fontSizeBase300,
    display: "block",
    maxWidth: "none",
  },
  ctaButton: {
    fontWeight: tokens.fontWeightSemibold,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    borderRadius: tokens.borderRadiusMedium,
    transition: "all 0.2s ease-in-out",
    fontSize: tokens.fontSizeBase300,
    "&:hover": {
      transform: "translateY(-1px)",
    },
  },
});

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();

  const features = [
    {
      icon: DesignIdeasRegular,
      title: "Modern Design System",
      description:
        "Built with Microsoft Fluent Design principles for cohesive, beautiful user experiences that feel natural and intuitive.",
      badge: "Design",
      color: "brand",
    },
    {
      icon: CodeRegular,
      title: "Production Ready",
      description:
        "Enterprise-grade React components with TypeScript support, accessibility compliance, and performance optimizations.",
      badge: "Development",
      color: "success",
    },
    {
      icon: SparkleRegular,
      title: "Customizable Theming",
      description:
        "Flexible theming system with dark mode support, brand color integration, and responsive design tokens.",
      badge: "Customization",
      color: "important",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTitle}>Welcome to Fluent UI</div>
          <div className={styles.heroSubtitle}>
            Experience the power of Microsoft's design system. Build beautiful,
            accessible applications with modern React components and
            enterprise-grade functionality.
          </div>
          <Button
            appearance="primary"
            size="large"
            className={styles.heroButton}
            iconAfter={<ArrowRight24Regular />}
            onClick={() => navigate("/components")}
          >
            Explore Components
          </Button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <Title2 className={styles.sectionTitle}>Why Choose Fluent UI?</Title2>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className={styles.featureCard}>
                <div className={styles.featureHeader}>
                  <Badge
                    appearance="outline"
                    color={feature.color}
                    className={styles.featureBadge}
                  >
                    {feature.badge}
                  </Badge>
                  <div className={styles.featureIcon}>
                    <IconComponent />
                  </div>
                </div>
                <Title3 className={styles.featureTitle}>{feature.title}</Title3>
                <Body1 className={styles.featureDescription}>
                  {feature.description}
                </Body1>
              </Card>
            );
          })}
        </div>

        <div className={styles.ctaSection}>
          <Title2 className={styles.ctaTitle}>Ready to get started?</Title2>
          <div className={styles.ctaDescription}>
            Explore our comprehensive component library and see how Fluent UI
            can transform your application development experience.
          </div>
          <Button
            appearance="secondary"
            className={styles.ctaButton}
            onClick={() => navigate("/components")}
          >
            View All Components
          </Button>
        </div>
      </div>
    </div>
  );
}
