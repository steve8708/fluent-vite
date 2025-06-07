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
    padding: tokens.spacingHorizontalXXL,
    maxWidth: '1200px',
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
  componentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL
  },
  componentCard: {
    padding: tokens.spacingHorizontalL
  },
  componentTitle: {
    marginBottom: tokens.spacingVerticalM
  },
  componentDemo: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM
  },
  demoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    flexWrap: 'wrap'
  },
  tabContent: {
    padding: tokens.spacingVerticalL
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
      <div className={styles.header}>
        <Title1 className={styles.title}>Component Showcase</Title1>
        <Body1>
          Explore and interact with various Fluent UI React components
        </Body1>
      </div>

      <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value)}>
        <Tab value="forms">Form Controls</Tab>
        <Tab value="buttons">Buttons & Actions</Tab>
        <Tab value="feedback">Feedback & Status</Tab>
        <Tab value="layout">Layout & Structure</Tab>
      </TabList>

      {selectedTab === 'forms' && (
        <div className={styles.tabContent}>
          <div className={styles.componentsGrid}>
            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Input Fields</Title3>} />
              <div className={styles.componentDemo}>
                <Input 
                  placeholder="Enter text here..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input 
                  type="password" 
                  placeholder="Password..."
                />
                <Textarea 
                  placeholder="Enter multiple lines..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={3}
                />
              </div>
            </Card>

            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Selection Controls</Title3>} />
              <div className={styles.componentDemo}>
                <div className={styles.demoRow}>
                  <Switch 
                    checked={switchChecked}
                    onChange={(e) => setSwitchChecked(e.currentTarget.checked)}
                    label="Toggle me"
                  />
                </div>
                <div className={styles.demoRow}>
                  <Checkbox 
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.currentTarget.checked)}
                    label="Check me"
                  />
                </div>
                <RadioGroup 
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.value)}
                >
                  <Radio value="option1" label="Option 1" />
                  <Radio value="option2" label="Option 2" />
                </RadioGroup>
              </div>
            </Card>

            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Dropdown</Title3>} />
              <div className={styles.componentDemo}>
                <Dropdown 
                  placeholder="Select an option..."
                  value={dropdownValue}
                  onOptionSelect={(e, data) => setDropdownValue(data.optionValue)}
                >
                  <Option value="react">React</Option>
                  <Option value="vue">Vue</Option>
                  <Option value="angular">Angular</Option>
                  <Option value="svelte">Svelte</Option>
                </Dropdown>
              </div>
            </Card>
          </div>
        </div>
      )}

      {selectedTab === 'buttons' && (
        <div className={styles.tabContent}>
          <div className={styles.componentsGrid}>
            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Button Variants</Title3>} />
              <div className={styles.componentDemo}>
                <div className={styles.demoRow}>
                  <Button appearance="primary">Primary</Button>
                  <Button appearance="secondary">Secondary</Button>
                  <Button appearance="outline">Outline</Button>
                  <Button appearance="subtle">Subtle</Button>
                </div>
                <div className={styles.demoRow}>
                  <Button size="small">Small</Button>
                  <Button size="medium">Medium</Button>
                  <Button size="large">Large</Button>
                </div>
              </div>
            </Card>

            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Icon Buttons</Title3>} />
              <div className={styles.componentDemo}>
                <div className={styles.demoRow}>
                  <Button icon={<AddRegular />} appearance="primary">Add</Button>
                  <Button icon={<EditRegular />} appearance="secondary">Edit</Button>
                  <Button icon={<DeleteRegular />} appearance="outline">Delete</Button>
                </div>
                <div className={styles.demoRow}>
                  <Button icon={<StarRegular />} iconPosition="after">Favorite</Button>
                  <Button icon={<HeartRegular />} iconPosition="after">Like</Button>
                  <Button icon={<SendRegular />} iconPosition="after">Send</Button>
                </div>
              </div>
            </Card>

            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Button States</Title3>} />
              <div className={styles.componentDemo}>
                <div className={styles.demoRow}>
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
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
              <CardHeader header={<Title3 className={styles.componentTitle}>Progress & Loading</Title3>} />
              <div className={styles.componentDemo}>
                <ProgressBar value={0.75} />
                <ProgressBar />
                <div className={styles.demoRow}>
                  <Spinner size="tiny" />
                  <Spinner size="extra-small" />
                  <Spinner size="small" />
                  <Spinner size="medium" />
                </div>
              </div>
            </Card>

            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Badges</Title3>} />
              <div className={styles.componentDemo}>
                <div className={styles.demoRow}>
                  <Badge appearance="filled">Filled</Badge>
                  <Badge appearance="outline">Outline</Badge>
                  <Badge appearance="tint">Tint</Badge>
                  <Badge appearance="ghost">Ghost</Badge>
                </div>
                <div className={styles.demoRow}>
                  <Badge color="brand">Brand</Badge>
                  <Badge color="danger">Danger</Badge>
                  <Badge color="important">Important</Badge>
                  <Badge color="informative">Info</Badge>
                  <Badge color="severe">Severe</Badge>
                  <Badge color="subtle">Subtle</Badge>
                  <Badge color="success">Success</Badge>
                  <Badge color="warning">Warning</Badge>
                </div>
              </div>
            </Card>

            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Messages & Toasts</Title3>} />
              <div className={styles.componentDemo}>
                <MessageBar intent="info">
                  <MessageBarBody>This is an info message.</MessageBarBody>
                </MessageBar>
                <MessageBar intent="success">
                  <MessageBarBody>Operation completed successfully!</MessageBarBody>
                </MessageBar>
                <MessageBar intent="warning">
                  <MessageBarBody>Please review your settings.</MessageBarBody>
                </MessageBar>
                <MessageBar intent="error">
                  <MessageBarBody>An error occurred during processing.</MessageBarBody>
                </MessageBar>
                <Button onClick={showToast} appearance="primary">
                  Show Toast
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
              <CardHeader 
                header={<Title3 className={styles.componentTitle}>Card Examples</Title3>}
                description="Cards can contain various content types"
              />
              <CardFooter>
                <Button appearance="primary">Action</Button>
                <Button>Cancel</Button>
              </CardFooter>
            </Card>

            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Dividers</Title3>} />
              <div className={styles.componentDemo}>
                <Body1>Content above divider</Body1>
                <Divider />
                <Body1>Content below divider</Body1>
                <Divider appearance="subtle" />
                <Body1>Subtle divider above</Body1>
              </div>
            </Card>

            <Card className={styles.componentCard}>
              <CardHeader header={<Title3 className={styles.componentTitle}>Typography</Title3>} />
              <div className={styles.componentDemo}>
                <Title1>Title 1</Title1>
                <Title2>Title 2</Title2>
                <Title3>Title 3</Title3>
                <Body1>Body 1 - Regular text content</Body1>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 