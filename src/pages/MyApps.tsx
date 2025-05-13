import React from 'react';
import styles from './MyApps.module.css';
import { Tile } from '../components';
import { Button } from '@fluentui/react-components';
import { useTheme } from '../theme/ThemeProvider';

// Separate ThemeToggle component to access the theme context
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

export const MyApps: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";
  const darkClass = isDark ? styles.darkContainer : "";

  const apps = [
    {
      id: 1,
      name: 'My Project 1',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7d849d8d95cc1eb6c99e8f22099bb15f966127b1',
      showInfo: true,
      showMenu: true
    },
    {
      id: 2,
      name: 'My Project 2',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7d849d8d95cc1eb6c99e8f22099bb15f966127b2',
      showInfo: true,
      showMenu: true
    },
    {
      id: 3,
      name: 'My Project 3',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7d849d8d95cc1eb6c99e8f22099bb15f966127b3',
      showInfo: true,
      showMenu: true
    }
  ];

  return (
    <div className={`${styles.root} ${darkClass}`}>
      <div className={styles.header}>
        <div className={styles.headerLeftSection}>
          <div className={styles.headerLeftGroup}>
            <div className={styles.headerIcon}>
              <span className={styles.iconFabric} />
            </div>
            <div className={styles.logoWrapper}>
              <svg
                width="108"
                height="24"
                viewBox="0 0 108 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.microsoftLogo}
              >
                <path d="M12 12.5H23V23.5H12V12.5Z" fill="#FFB900" />
                <path d="M0 12.5H11V23.5H0V12.5Z" fill="#00A4EF" />
                <path d="M12 0.5H23V11.5H12V0.5Z" fill="#7FBA00" />
                <path d="M0 0.5H11V11.5H0V0.5Z" fill="#F25022" />
              </svg>
            </div>
            <div className={styles.headerDivider}>
              <div className={styles.dividerVertical} />
              <div className={styles.headerTitle}>
                <div className={styles.titleText}>My Apps</div>
                <div className={styles.iconFabricSmall} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon} />
            <span className={styles.searchText}>Search apps</span>
          </div>
        </div>
        <div className={styles.headerRightSection}>
          <ThemeToggle />
          <div className={styles.headerIcon}>
            <span className={styles.iconFabric} />
          </div>
          <div className={styles.headerIcon}>
            <span className={styles.iconFabric} />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d849d8d95cc1eb6c99e8f22099bb15f966127b1"
            alt="Profile"
            className={styles.profileImage}
          />
        </div>
      </div>

      <div className={styles.navigationSection}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <div className={styles.activeTab}>
              <span className={styles.tabText}>Contoso</span>
              <div className={styles.activeIndicator} />
            </div>
            <div className={styles.tab}>
              <span className={styles.tabText}>Design</span>
            </div>
            <div className={styles.tab}>
              <span className={styles.tabText}>Apps</span>
            </div>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.actionButton}>
            <span className={styles.buttonIcon} />
            <span className={styles.buttonText}>Add apps</span>
          </button>
          <button className={styles.actionButton}>
            <span className={styles.buttonIconBlue} />
            <span className={styles.buttonText}>Create collection</span>
          </button>
          <button className={styles.actionButton}>
            <span className={styles.buttonIcon} />
            <span className={styles.buttonText}>Customize view</span>
          </button>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerTitle}>My Projects</div>
            <button className={styles.settingsButton}>
              <span className={styles.settingsIcon} />
              <span className={styles.settingsText}>Settings</span>
            </button>
            <div className={styles.divider} />
          </div>
          <div className={styles.drawerContent}>
            <div className={styles.tileGrid}>
              {apps.map(app => (
                <Tile
                  key={app.id}
                  imageUrl={app.imageUrl}
                  imageAlt={app.name}
                  text={app.name}
                  showInfo={app.showInfo}
                  showMenu={app.showMenu}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApps; 