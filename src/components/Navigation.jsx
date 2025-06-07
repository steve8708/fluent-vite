import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Body1,
  Button,
  Avatar,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Divider
} from '@fluentui/react-components';
import {
  HomeRegular,
  InfoRegular,
  GridRegular,
  SettingsRegular,
  PersonRegular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    height: '56px',
    boxSizing: 'border-box'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL
  },
  logo: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM
  },
  navButton: {
    '&[data-current="true"]': {
      backgroundColor: tokens.colorBrandBackground2,
      color: tokens.colorBrandForeground2
    }
  }
});

const navigationItems = [
  { path: '/', label: 'Home', icon: HomeRegular },
  { path: '/about', label: 'About', icon: InfoRegular },
  { path: '/components', label: 'Components', icon: GridRegular },
  { path: '/settings', label: 'Settings', icon: SettingsRegular }
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const styles = useStyles();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Body1 className={styles.logo}>Fluent UI Demo</Body1>
        <div className={styles.navItems}>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isCurrent = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                appearance="subtle"
                icon={<IconComponent />}
                onClick={() => handleNavigation(item.path)}
                className={styles.navButton}
                data-current={isCurrent}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className={styles.navRight}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="subtle"
              icon={<Avatar name="User" size={28} />}
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem icon={<PersonRegular />}>Profile</MenuItem>
              <MenuItem icon={<SettingsRegular />}>Settings</MenuItem>
              <Divider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </nav>
  );
} 