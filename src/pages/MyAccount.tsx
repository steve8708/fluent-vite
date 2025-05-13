import React from 'react';
import {
  AppItem,
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { PersonCircle32Regular } from '@fluentui/react-icons';
import { Button, DrawerProps, Tooltip } from '@fluentui/react-components';
import { useTheme } from '../theme/ThemeProvider';
import styles from './MyAccount.module.css';

type DrawerType = Required<DrawerProps>["type"];

// Theme toggle component for light/dark mode switching
const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Button
      appearance="subtle"
      icon={<i className={`ti ti-${themeMode === "light" ? "moon" : "sun"}`} />}
      onClick={toggleTheme}
      className={styles.themeToggle}
    >
      {themeMode === "light" ? "Dark mode" : "Light mode"}
    </Button>
  );
};

export const MyAccount: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [type] = React.useState<DrawerType>("inline");
  const { themeMode } = useTheme();

  const isDark = themeMode === "dark";
  const darkClass = isDark ? styles.darkContainer : "";

  return (
    <div className={`${styles.root} ${darkClass}`}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue=""
        open={isOpen}
        type={type}
        multiple={true}
        className={styles.nav}
      >
        <NavDrawerHeader>
          <Tooltip content="Close Navigation" relationship="label">
            <Hamburger onClick={() => setIsOpen(!isOpen)} />
          </Tooltip>
        </NavDrawerHeader>

        <NavDrawerBody>
          <AppItem icon={<PersonCircle32Regular />}>Contoso HR</AppItem>
          <NavItem
            icon={
              <img
                src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/ce33bc8301fc8b1e4db7d11bbeaffb06c07605b5"
                alt=""
              />
            }
            value="1"
          >
            Home
          </NavItem>
          <NavCategory value="2">
            <NavCategoryItem
              icon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/ca0079d790411a410e1538294d17cfc779b616c6"
                  alt=""
                />
              }
            >
              My Account
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="3">Profile</NavSubItem>
              <NavSubItem value="4">Settings</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="5">
            <NavCategoryItem
              icon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/2226286e5ede9dd9be054c77e98175f0d08c4dfd"
                  alt=""
                />
              }
            >
              My Apps
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="6">Installed Apps</NavSubItem>
              <NavSubItem value="7">Available Apps</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="8">
            <NavCategoryItem
              icon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/d751ff669710788a9131fab49602f46b7180ecd0"
                  alt=""
                />
              }
            >
              My Groups
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="9">Active Groups</NavSubItem>
              <NavSubItem value="10">Pending Invites</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="11">
            <NavCategoryItem
              icon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/533bfffe511f2803ae2c351f22fef219a90e6be7"
                  alt=""
                />
              }
            >
              My Access
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="12">Permissions</NavSubItem>
              <NavSubItem value="13">Security</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavDivider />
          <NavItem
            icon={
              <img
                src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/ee186d718251a3d5027878001163baa91c03986b"
                alt=""
              />
            }
            value="14"
          >
            Give feedback
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>

      <div className={`${styles.content} ${darkClass}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Tooltip content="Toggle navigation pane" relationship="label">
              <Hamburger onClick={() => setIsOpen(!isOpen)} />
            </Tooltip>
          </div>
          <div className={styles.headerRight}>
            <ThemeToggle />
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>Welcome to Contoso, Carlos!</h1>
            <div className={styles.profileContainer}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/61ae2431a50dc8e4444b7458be53d6430d7172b7"
                alt="Profile"
                className={styles.profileImage}
              />
              <div className={styles.profileInfo}>
                <div className={styles.profileName}>
                  <div className={styles.nameHeader}>Carlos Slattery</div>
                </div>
                <div className={styles.employeeInfo}>
                  <div className={styles.infoColumn}>
                    <div className={styles.infoItem}>Marketing Manager</div>
                    <div className={styles.infoItem}>carlos@contoso.com</div>
                  </div>
                  <div className={styles.infoColumn}>
                    <div className={styles.infoItem}>+1 (415) 555-2222</div>
                    <div className={styles.infoItem}>
                      San Francisco, Building Cedar Square / 312B
                    </div>
                  </div>
                </div>
                <div className={styles.editLink}>
                  <span>Why can't I edit this?</span>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/12e5a3de993f0f597c5694088dc69b60a88f1332"
                    alt="Info"
                    className={styles.infoIcon}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount; 