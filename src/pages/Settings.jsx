import React, { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Title3,
  Body1,
  Button,
  Switch,
  RadioGroup,
  Radio,
  Dropdown,
  Option,
  Card,
  CardHeader,
  Divider,
  Field,
  Slider,
  SpinButton,
  Badge,
} from "@fluentui/react-components";
import {
  DarkThemeRegular,
  BrightnessHighRegular,
  SettingsRegular,
  SaveRegular,
  ArrowCounterclockwiseRegular,
  CheckmarkRegular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: "calc(100vh - 64px)",
  },
  hero: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
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
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  sectionIcon: {
    fontSize: "24px",
    color: tokens.colorBrandForeground1,
  },
  settingCard: {
    marginBottom: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderTopColor: tokens.colorBrandStroke2,
      borderRightColor: tokens.colorBrandStroke2,
      borderBottomColor: tokens.colorBrandStroke2,
      borderLeftColor: tokens.colorBrandStroke2,
      boxShadow: tokens.shadow4,
    },
  },
  settingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: tokens.spacingHorizontalXL,
    gap: tokens.spacingHorizontalL,
    minHeight: "80px",
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    marginBottom: tokens.spacingVerticalXS,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
  },
  settingDescription: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: "1.4",
  },
  settingControl: {
    minWidth: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  colorPreview: {
    width: "20px",
    height: "20px",
    borderRadius: tokens.borderRadiusCircular,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    marginRight: tokens.spacingHorizontalS,
  },
  radioGroupContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
  },
  sliderContainer: {
    minWidth: "150px",
    textAlign: "center",
  },
  sliderLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXS,
  },
  actionButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    justifyContent: "center",
    marginTop: tokens.spacingVerticalXXL,
    padding: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  actionButton: {
    fontWeight: tokens.fontWeightSemibold,
    minWidth: "140px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-1px)",
    },
  },
  preferenceGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: tokens.spacingHorizontalL,
  },
  statsCard: {
    textAlign: "center",
    padding: tokens.spacingHorizontalXL,
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
  statValue: {
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
  dividerSection: {
    margin: `${tokens.spacingVerticalXXL} 0`,
  },
});

export default function Settings() {
  const styles = useStyles();
  const { themeMode, setThemeMode } = useTheme();

  // Other settings (not theme related)
  const [colorScheme, setColorScheme] = useState("blue");
  const [density, setDensity] = useState("normal");

  // UI preferences
  const [animations, setAnimations] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  // Accessibility settings
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [motionReduced, setMotionReduced] = useState(false);

  // Performance settings
  const [prefetchData, setPrefetchData] = useState(true);
  const [cacheTimeout, setCacheTimeout] = useState(30);

  const handleSaveSettings = () => {
    // Simulate saving settings
    console.log("Settings saved!");
  };

  const handleResetSettings = () => {
    // Reset to defaults
    setThemeMode("light");
    setColorScheme("blue");
    setDensity("normal");
    setAnimations(true);
    setSoundEffects(false);
    setNotifications(true);
    setAutoSave(true);
    setHighContrast(false);
    setFontSize(14);
    setMotionReduced(false);
    setPrefetchData(true);
    setCacheTimeout(30);
  };

  const colorSchemes = [
    { value: "blue", label: "Blue", color: tokens.colorBrandBackground },
    { value: "green", label: "Green", color: "#107c10" },
    { value: "purple", label: "Purple", color: "#5c2d91" },
    { value: "red", label: "Red", color: "#d13438" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroTitle}>Application Settings</div>
        <div className={styles.heroSubtitle}>
          Customize your Fluent UI experience with personalized preferences and
          accessibility options
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>
            <DarkThemeRegular className={styles.sectionIcon} />
            Appearance & Theme
          </Title2>

          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>Theme Mode</div>
                <div className={styles.settingDescription}>
                  Choose how the interface appears throughout the application
                </div>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.radioGroupContainer}>
                  <RadioGroup
                    value={themeMode}
                    onChange={(e, data) => setThemeMode(data.value)}
                    layout="horizontal"
                  >
                    <Radio value="light" label="Light" />
                    <Radio value="dark" label="Dark" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </Card>

          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>Brand Color</div>
                <div className={styles.settingDescription}>
                  Select your preferred accent color for interactive elements
                </div>
              </div>
              <div className={styles.settingControl}>
                <Dropdown
                  value={colorScheme}
                  onOptionSelect={(e, data) => setColorScheme(data.optionValue)}
                  style={{ minWidth: "150px" }}
                >
                  {colorSchemes.map((scheme) => (
                    <Option key={scheme.value} value={scheme.value}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          className={styles.colorPreview}
                          style={{ backgroundColor: scheme.color }}
                        />
                        {scheme.label}
                      </div>
                    </Option>
                  ))}
                </Dropdown>
              </div>
            </div>
          </Card>

          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>Interface Density</div>
                <div className={styles.settingDescription}>
                  Control spacing and component sizes for optimal comfort
                </div>
              </div>
              <div className={styles.settingControl}>
                <Dropdown
                  value={density}
                  onOptionSelect={(e, data) => setDensity(data.optionValue)}
                  style={{ minWidth: "150px" }}
                >
                  <Option value="compact">Compact</Option>
                  <Option value="normal">Normal</Option>
                  <Option value="comfortable">Comfortable</Option>
                </Dropdown>
              </div>
            </div>
          </Card>
        </div>

        <Divider className={styles.dividerSection} />

        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>
            <SettingsRegular className={styles.sectionIcon} />
            User Experience
          </Title2>

          <div className={styles.preferenceGrid}>
            <Card className={styles.settingCard}>
              <div className={styles.settingRow}>
                <div className={styles.settingContent}>
                  <div className={styles.settingTitle}>Smooth Animations</div>
                  <div className={styles.settingDescription}>
                    Enable transitions and motion effects
                  </div>
                </div>
                <Switch
                  checked={animations}
                  onChange={(e) => setAnimations(e.currentTarget.checked)}
                />
              </div>
            </Card>

            <Card className={styles.settingCard}>
              <div className={styles.settingRow}>
                <div className={styles.settingContent}>
                  <div className={styles.settingTitle}>Sound Effects</div>
                  <div className={styles.settingDescription}>
                    Play audio feedback for interactions
                  </div>
                </div>
                <Switch
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.currentTarget.checked)}
                />
              </div>
            </Card>

            <Card className={styles.settingCard}>
              <div className={styles.settingRow}>
                <div className={styles.settingContent}>
                  <div className={styles.settingTitle}>Push Notifications</div>
                  <div className={styles.settingDescription}>
                    Receive real-time notifications and updates
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.currentTarget.checked)}
                />
              </div>
            </Card>

            <Card className={styles.settingCard}>
              <div className={styles.settingRow}>
                <div className={styles.settingContent}>
                  <div className={styles.settingTitle}>Auto Save</div>
                  <div className={styles.settingDescription}>
                    Automatically save changes and preferences
                  </div>
                </div>
                <Switch
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.currentTarget.checked)}
                />
              </div>
            </Card>
          </div>
        </div>

        <Divider className={styles.dividerSection} />

        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>
            <BrightnessHighRegular className={styles.sectionIcon} />
            Accessibility
          </Title2>

          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>High Contrast Mode</div>
                <div className={styles.settingDescription}>
                  Increase contrast for improved visibility and readability
                </div>
              </div>
              <Switch
                checked={highContrast}
                onChange={(e) => setHighContrast(e.currentTarget.checked)}
              />
            </div>
          </Card>

          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>Font Size</div>
                <div className={styles.settingDescription}>
                  Adjust text size for better readability and comfort
                </div>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.sliderContainer}>
                  <Slider
                    min={12}
                    max={20}
                    value={fontSize}
                    onChange={(e, data) => setFontSize(data.value)}
                  />
                  <div className={styles.sliderLabel}>{fontSize}px</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>Reduced Motion</div>
                <div className={styles.settingDescription}>
                  Minimize animations and transitions for better accessibility
                </div>
              </div>
              <Switch
                checked={motionReduced}
                onChange={(e) => setMotionReduced(e.currentTarget.checked)}
              />
            </div>
          </Card>
        </div>

        <Divider className={styles.dividerSection} />

        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>Performance & Data</Title2>

          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>Prefetch Data</div>
                <div className={styles.settingDescription}>
                  Load content in advance for faster navigation and improved
                  performance
                </div>
              </div>
              <Switch
                checked={prefetchData}
                onChange={(e) => setPrefetchData(e.currentTarget.checked)}
              />
            </div>
          </Card>

          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>Cache Duration</div>
                <div className={styles.settingDescription}>
                  How long to keep data cached locally (in minutes)
                </div>
              </div>
              <div className={styles.settingControl}>
                <SpinButton
                  value={cacheTimeout}
                  onChange={(e, data) => setCacheTimeout(data.value || 0)}
                  min={5}
                  max={120}
                  step={5}
                  style={{ width: "100px" }}
                />
              </div>
            </div>
          </Card>
        </div>

        <Divider className={styles.dividerSection} />

        <div className={styles.section}>
          <Title2 className={styles.sectionTitle}>Usage Analytics</Title2>
          <div className={styles.statsGrid}>
            <Card className={styles.statsCard}>
              <div className={styles.statValue}>2,847</div>
              <div className={styles.statLabel}>Components Rendered</div>
            </Card>
            <Card className={styles.statsCard}>
              <div className={styles.statValue}>47</div>
              <div className={styles.statLabel}>Active Sessions</div>
            </Card>
            <Card className={styles.statsCard}>
              <div className={styles.statValue}>99.2%</div>
              <div className={styles.statLabel}>Uptime</div>
            </Card>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Button
            appearance="primary"
            icon={<SaveRegular />}
            onClick={handleSaveSettings}
            className={styles.actionButton}
          >
            Save Settings
          </Button>
          <Button
            appearance="secondary"
            icon={<ArrowCounterclockwiseRegular />}
            onClick={handleResetSettings}
            className={styles.actionButton}
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
}
