import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Title3,
  Body1,
  Button,
  Input,
  Textarea,
  Switch,
  Checkbox,
  RadioGroup,
  Radio,
  Dropdown,
  Option,
  Card,
  CardHeader,
  CardFooter,
  Badge,
  ProgressBar,
  Spinner,
  MessageBar,
  MessageBarBody,
  Divider,
  Tab,
  TabList
} from '@fluentui/react-components';
import {
  AddRegular,
  DeleteRegular,
  EditRegular,
  StarRegular,
  HeartRegular,
  SendRegular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: 'calc(100vh - 64px)'
  },
  hero: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: 'center'
  },
  heroTitle: {
    fontSize: '40px',
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground1,
    letterSpacing: '-0.01em'
  },
  heroSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.5'
  },
  tabsContainer: {
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL} 0`,
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: tokens.colorNeutralBackground1
  },
  tabsList: {
    marginBottom: tokens.spacingVerticalXL,
    justifyContent: 'center'
  },
  tabContent: {
    padding: `0 0 ${tokens.spacingVerticalXXXL}`,
    animation: 'fadeIn 0.3s ease-in-out'
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  componentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: tokens.spacingHorizontalXL,
    marginTop: tokens.spacingVerticalL
  },
  componentCard: {
    padding: tokens.spacingHorizontalXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow8,
      borderColor: tokens.colorBrandStroke2
    }
  },
  componentTitle: {
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: '20px'
  },
  componentDemo: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  demoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
    minHeight: '40px'
  },
  demoInput: {
    minWidth: '200px',
    flex: 1
  },
  demoTextarea: {
    minWidth: '100%',
    resize: 'vertical'
  },
  demoButton: {
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      transform: 'translateY(-1px)'
    }
  },
  progressDemo: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    width: '100%'
  },
  progressLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXS
  },
  spinnerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
    justifyContent: 'space-around',
    padding: tokens.spacingVerticalM
  },
  badgeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: tokens.spacingHorizontalS,
    alignItems: 'center'
  },
  messageBarStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  cardFooterDemo: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    justifyContent: 'flex-end'
  },
  typographyDemo: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS
  }
});

export default function Components() {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [dropdownValue, setDropdownValue] = useState('');
  const [selectedTab, setSelectedTab] = useState('forms');
  
  const showToast = () => {
    alert('Toast functionality would appear here!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroTitle}>Component Library</div>
        <div className={styles.heroSubtitle}>
          Explore and interact with comprehensive Fluent UI React components
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <TabList 
          selectedValue={selectedTab} 
          onTabSelect={(_, data) => setSelectedTab(data.value)}
          className={styles.tabsList}
        >
          <Tab value="forms">Form Controls</Tab>
          <Tab value="buttons">Buttons & Actions</Tab>
          <Tab value="feedback">Feedback & Status</Tab>
          <Tab value="layout">Layout & Structure</Tab>
        </TabList>

        {selectedTab === 'forms' && (
          <div className={styles.tabContent}>
            <div className={styles.componentsGrid}>
              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Input Fields</Title3>
                <div className={styles.componentDemo}>
                  <Input 
                    placeholder="Enter your name..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={styles.demoInput}
                  />
                  <Input 
                    type="password" 
                    placeholder="Enter password..."
                    className={styles.demoInput}
                  />
                  <Textarea 
                    placeholder="Tell us about yourself..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    rows={3}
                    className={styles.demoTextarea}
                  />
                </div>
              </Card>

              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Selection Controls</Title3>
                <div className={styles.componentDemo}>
                  <div className={styles.demoRow}>
                    <Switch 
                      checked={switchChecked}
                      onChange={(e) => setSwitchChecked(e.currentTarget.checked)}
                      label="Enable notifications"
                    />
                  </div>
                  <div className={styles.demoRow}>
                    <Checkbox 
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.currentTarget.checked)}
                      label="I agree to the terms"
                    />
                  </div>
                  <RadioGroup 
                    value={radioValue}
                    onChange={(e) => setRadioValue(e.target.value)}
                    layout="vertical"
                  >
                    <Radio value="option1" label="Personal account" />
                    <Radio value="option2" label="Business account" />
                    <Radio value="option3" label="Enterprise account" />
                  </RadioGroup>
                </div>
              </Card>

              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Dropdown Selection</Title3>
                <div className={styles.componentDemo}>
                  <Dropdown 
                    placeholder="Choose your framework..."
                    value={dropdownValue}
                    onOptionSelect={(e, data) => setDropdownValue(data.optionValue)}
                    className={styles.demoInput}
                  >
                    <Option value="react">React</Option>
                    <Option value="vue">Vue.js</Option>
                    <Option value="angular">Angular</Option>
                    <Option value="svelte">Svelte</Option>
                  </Dropdown>
                  {dropdownValue && (
                    <Body1>Selected: {dropdownValue}</Body1>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'buttons' && (
          <div className={styles.tabContent}>
            <div className={styles.componentsGrid}>
              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Button Styles</Title3>
                <div className={styles.componentDemo}>
                  <div className={styles.demoRow}>
                    <Button appearance="primary" className={styles.demoButton}>Primary</Button>
                    <Button appearance="secondary" className={styles.demoButton}>Secondary</Button>
                    <Button appearance="outline" className={styles.demoButton}>Outline</Button>
                    <Button appearance="subtle" className={styles.demoButton}>Subtle</Button>
                  </div>
                  <div className={styles.demoRow}>
                    <Button size="small" className={styles.demoButton}>Small</Button>
                    <Button size="medium" className={styles.demoButton}>Medium</Button>
                    <Button size="large" className={styles.demoButton}>Large</Button>
                  </div>
                </div>
              </Card>

              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Action Buttons</Title3>
                <div className={styles.componentDemo}>
                  <div className={styles.demoRow}>
                    <Button icon={<AddRegular />} appearance="primary" className={styles.demoButton}>
                      Create New
                    </Button>
                    <Button icon={<EditRegular />} appearance="secondary" className={styles.demoButton}>
                      Edit Item
                    </Button>
                  </div>
                  <div className={styles.demoRow}>
                    <Button icon={<DeleteRegular />} appearance="outline" className={styles.demoButton}>
                      Delete
                    </Button>
                    <Button icon={<StarRegular />} iconPosition="after" className={styles.demoButton}>
                      Add to Favorites
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Interactive States</Title3>
                <div className={styles.componentDemo}>
                  <div className={styles.demoRow}>
                    <Button className={styles.demoButton}>Normal State</Button>
                    <Button disabled>Disabled State</Button>
                  </div>
                  <div className={styles.demoRow}>
                    <Button icon={<HeartRegular />} iconPosition="after" className={styles.demoButton}>
                      Like
                    </Button>
                    <Button icon={<SendRegular />} iconPosition="after" appearance="primary" className={styles.demoButton}>
                      Send Message
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'feedback' && (
          <div className={styles.tabContent}>
            <div className={styles.componentsGrid}>
              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Progress Indicators</Title3>
                <div className={styles.progressDemo}>
                  <div>
                    <div className={styles.progressLabel}>Upload Progress (75%)</div>
                    <ProgressBar value={0.75} />
                  </div>
                  <div>
                    <div className={styles.progressLabel}>Loading...</div>
                    <ProgressBar />
                  </div>
                  <div className={styles.spinnerRow}>
                    <div>
                      <div className={styles.progressLabel}>Loading States</div>
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center' }}>
                        <Spinner size="tiny" />
                        <Spinner size="extra-small" />
                        <Spinner size="small" />
                        <Spinner size="medium" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Status Badges</Title3>
                <div className={styles.componentDemo}>
                  <div className={styles.badgeGrid}>
                    <Badge appearance="filled" color="brand">Active</Badge>
                    <Badge appearance="outline" color="success">Online</Badge>
                    <Badge appearance="tint" color="warning">Pending</Badge>
                    <Badge appearance="ghost" color="danger">Error</Badge>
                  </div>
                  <div className={styles.badgeGrid}>
                    <Badge color="important">High Priority</Badge>
                    <Badge color="informative">Info</Badge>
                    <Badge color="severe">Critical</Badge>
                    <Badge color="subtle">Draft</Badge>
                  </div>
                </div>
              </Card>

              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Message Bars</Title3>
                <div className={styles.messageBarStack}>
                  <MessageBar intent="info">
                    <MessageBarBody>Your changes have been saved automatically.</MessageBarBody>
                  </MessageBar>
                  <MessageBar intent="success">
                    <MessageBarBody>Operation completed successfully!</MessageBarBody>
                  </MessageBar>
                  <MessageBar intent="warning">
                    <MessageBarBody>Please review your account settings.</MessageBarBody>
                  </MessageBar>
                  <MessageBar intent="error">
                    <MessageBarBody>Unable to process your request. Please try again.</MessageBarBody>
                  </MessageBar>
                  <Button onClick={showToast} appearance="primary">
                    Show Toast Notification
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'layout' && (
          <div className={styles.tabContent}>
            <div className={styles.componentsGrid}>
              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Card Layouts</Title3>
                <Body1 style={{ marginBottom: tokens.spacingVerticalL, color: tokens.colorNeutralForeground2 }}>
                  Cards provide flexible containers for grouping related content and actions.
                </Body1>
                <div className={styles.cardFooterDemo}>
                  <Button appearance="secondary">Cancel</Button>
                  <Button appearance="primary">Save Changes</Button>
                </div>
              </Card>

              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Content Dividers</Title3>
                <div className={styles.componentDemo}>
                  <Body1>Section header content</Body1>
                  <Divider />
                  <Body1>Main content area with important information</Body1>
                  <Divider appearance="subtle" />
                  <Body1>Footer content or additional details</Body1>
                </div>
              </Card>

              <Card className={styles.componentCard}>
                <Title3 className={styles.componentTitle}>Typography Scale</Title3>
                <div className={styles.typographyDemo}>
                  <Title1>Display Title (Title1)</Title1>
                  <Title2>Section Heading (Title2)</Title2>
                  <Title3>Subsection Title (Title3)</Title3>
                  <Body1>Body text for paragraphs and general content (Body1)</Body1>
                  <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                    Secondary text for descriptions and metadata
                  </Body1>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 