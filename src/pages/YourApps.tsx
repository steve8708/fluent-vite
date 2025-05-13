import React from 'react';
import styles from './YourApps.module.css';
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

export const YourApps: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";
  const darkClass = isDark ? styles.darkContainer : "";

  const apps = [
    {
      id: 1,
      name: 'Outlook',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/bc24f99bda11b9a51c1af9ac9c4ae6b5d8a750f8',
      showInfo: true
    },
    {
      id: 2,
      name: 'Teams',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/1ff0e53d3f1e92d8bc862a98d002a5f94a277103',
      showInfo: true,
      showMenu: true
    },
    {
      id: 3,
      name: 'Adobe Identity Manager',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/501c14b555e97171336c862709079e3ed8b65109',
      showInfo: true,
      showMenu: true
    },
    {
      id: 4,
      name: 'Atlassian Cloud',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/35506f950f4fcce946dd354fdec496ab842a3f61',
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
                <div className={styles.titleText}>Your Apps</div>
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
            src="https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/cfc3b72d8ac723a68719a3aa4d8c675a02faf42c"
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
            <div className={styles.drawerTitle}>Productivity</div>
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

export default YourApps; 