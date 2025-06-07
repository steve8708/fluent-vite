import React, { useState } from 'react';
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
  Badge
} from '@fluentui/react-components';
import {
  DarkThemeRegular,
  BrightnessHighRegular,
  SettingsRegular,
  SaveRegular,
  ArrowCounterclockwiseRegular,
  CheckmarkRegular
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
    marginBottom: tokens.spacingVerticalXL
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground1
  },
  settingCard: {
    marginBottom: tokens.spacingVerticalL
  },
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: tokens.spacingVerticalM,
    gap: tokens.spacingHorizontalL
  },
  settingContent: {
    flex: 1
  },
  settingTitle: {
    marginBottom: tokens.spacingVerticalXS,
    fontWeight: tokens.fontWeightSemibold
  },
  settingDescription: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200
  },
  settingControl: {
    minWidth: '150px'
  },
  colorPreview: {
    width: '20px',
    height: '20px',
    borderRadius: tokens.borderRadiusCircular,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    marginRight: tokens.spacingHorizontalS
  },
  actionButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    justifyContent: 'center',
    marginTop: tokens.spacingVerticalXL
  },
  preferenceGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalL,
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  statsCard: {
    textAlign: 'center',
    padding: tokens.spacingHorizontalL
  },
  statValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalXS
  },
  statLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200
  }
});

export default function Settings() {
  const styles = useStyles();
  
  // Theme settings
  const [theme, setTheme] = useState('system');
  const [colorScheme, setColorScheme] = useState('blue');
  const [density, setDensity] = useState('normal');
  
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
    console.log('Settings saved!');
  };

  const handleResetSettings = () => {
    // Reset to defaults
    setTheme('system');
    setColorScheme('blue');
    setDensity('normal');
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
    { value: 'blue', label: 'Blue', color: tokens.colorBrandBackground },
    { value: 'green', label: 'Green', color: '#107c10' },
    { value: 'purple', label: 'Purple', color: '#5c2d91' },
    { value: 'red', label: 'Red', color: '#d13438' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title1 className={styles.title}>Settings</Title1>
        <Body1>
          Customize your Fluent UI experience
        </Body1>
      </div>

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>Appearance</Title2>
        
        <Card className={styles.settingCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <div className={styles.settingTitle}>Theme</div>
              <div className={styles.settingDescription}>
                Choose how the interface appears
              </div>
            </div>
            <div className={styles.settingControl}>
              <RadioGroup 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                layout="horizontal"
              >
                <Radio value="light" label="Light" />
                <Radio value="dark" label="Dark" />
                <Radio value="system" label="System" />
              </RadioGroup>
            </div>
          </div>
        </Card>

        <Card className={styles.settingCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <div className={styles.settingTitle}>Color Scheme</div>
              <div className={styles.settingDescription}>
                Select your preferred brand color
              </div>
            </div>
            <div className={styles.settingControl}>
              <Dropdown 
                value={colorScheme}
                onOptionSelect={(e, data) => setColorScheme(data.optionValue)}
              >
                {colorSchemes.map((scheme) => (
                  <Option key={scheme.value} value={scheme.value}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
              <div className={styles.settingTitle}>Density</div>
              <div className={styles.settingDescription}>
                Control spacing and component sizes
              </div>
            </div>
            <div className={styles.settingControl}>
              <Dropdown 
                value={density}
                onOptionSelect={(e, data) => setDensity(data.optionValue)}
              >
                <Option value="compact">Compact</Option>
                <Option value="normal">Normal</Option>
                <Option value="comfortable">Comfortable</Option>
              </Dropdown>
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>User Experience</Title2>
        
        <div className={styles.preferenceGrid}>
          <Card className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div className={styles.settingContent}>
                <div className={styles.settingTitle}>Animations</div>
                <div className={styles.settingDescription}>
                  Enable smooth transitions and motion
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
                  Play sounds for interactions
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
                <div className={styles.settingTitle}>Notifications</div>
                <div className={styles.settingDescription}>
                  Show toast notifications
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
                  Automatically save changes
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

      <Divider />

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>Accessibility</Title2>
        
        <Card className={styles.settingCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <div className={styles.settingTitle}>High Contrast</div>
              <div className={styles.settingDescription}>
                Increase contrast for better visibility
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
                Adjust text size for better readability
              </div>
            </div>
            <div className={styles.settingControl}>
              <Field>
                <Slider
                  min={12}
                  max={20}
                  value={fontSize}
                  onChange={(e, data) => setFontSize(data.value)}
                />
                <div style={{ textAlign: 'center', marginTop: tokens.spacingVerticalXS }}>
                  {fontSize}px
                </div>
              </Field>
            </div>
          </div>
        </Card>

        <Card className={styles.settingCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <div className={styles.settingTitle}>Reduced Motion</div>
              <div className={styles.settingDescription}>
                Minimize animations and transitions
              </div>
            </div>
            <Switch 
              checked={motionReduced}
              onChange={(e) => setMotionReduced(e.currentTarget.checked)}
            />
          </div>
        </Card>
      </div>

      <Divider />

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>Performance</Title2>
        
        <Card className={styles.settingCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <div className={styles.settingTitle}>Prefetch Data</div>
              <div className={styles.settingDescription}>
                Load data in advance for faster navigation
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
              <div className={styles.settingTitle}>Cache Timeout</div>
              <div className={styles.settingDescription}>
                How long to keep data cached (minutes)
              </div>
            </div>
            <div className={styles.settingControl}>
              <SpinButton
                value={cacheTimeout}
                onChange={(e, data) => setCacheTimeout(data.value || 0)}
                min={5}
                max={120}
                step={5}
              />
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>Usage Statistics</Title2>
        <div className={styles.preferenceGrid}>
          <Card className={styles.statsCard}>
            <div className={styles.statValue}>1,247</div>
            <div className={styles.statLabel}>Components Rendered</div>
          </Card>
          <Card className={styles.statsCard}>
            <div className={styles.statValue}>23</div>
            <div className={styles.statLabel}>Sessions Today</div>
          </Card>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <Button 
          appearance="primary" 
          icon={<SaveRegular />}
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
        <Button 
          appearance="secondary" 
          icon={<ArrowCounterclockwiseRegular />}
          onClick={handleResetSettings}
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
} 