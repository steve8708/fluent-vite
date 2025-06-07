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
    padding: `0 ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    height: '64px',
    boxSizing: 'border-box',
    boxShadow: tokens.shadow4,
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXL
  },
  logo: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    letterSpacing: '-0.01em'
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL
  },
  navButton: {
    minHeight: '40px',
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightMedium,
    transition: 'all 0.15s ease-in-out',
    '&[data-current="true"]': {
      backgroundColor: tokens.colorBrandBackground2,
      color: tokens.colorBrandForeground2,
      fontWeight: tokens.fontWeightSemibold
    },
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: 'translateY(-1px)'
    },
    '&[data-current="true"]:hover': {
      backgroundColor: tokens.colorBrandBackground2Hover
    }
  },
  avatarButton: {
    borderRadius: tokens.borderRadiusCircular,
    padding: tokens.spacingHorizontalXS,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
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
        <Body1 className={styles.logo}>Fluent UI</Body1>
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
              className={styles.avatarButton}
              icon={<Avatar name="User" size={32} />}
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem icon={<PersonRegular />}>View profile</MenuItem>
              <MenuItem icon={<SettingsRegular />}>Account settings</MenuItem>
              <Divider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </nav>
  );
} 