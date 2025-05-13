import { tokens } from '@fluentui/react-components';
import { useTheme } from './ThemeProvider';

interface FluentTokens {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  hoverBackgroundColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  focusColor: string;
  disabledBackgroundColor: string;
  disabledTextColor: string;
  disabledBorderColor: string;
}

const useFluentTokens = (variant: 'primary' | 'secondary' = 'primary'): FluentTokens => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  const tokensByVariant: Record<'primary' | 'secondary', FluentTokens> = {
    primary: {
      backgroundColor: isDark ? tokens.colorBrandBackground : tokens.colorBrandBackground,
      textColor: tokens.colorNeutralForegroundOnBrand,
      borderColor: 'transparent',
      hoverBackgroundColor: isDark ? tokens.colorBrandBackgroundHover : tokens.colorBrandBackgroundHover,
      hoverTextColor: tokens.colorNeutralForegroundOnBrand,
      hoverBorderColor: 'transparent',
      focusColor: tokens.colorBrandStroke1,
      disabledBackgroundColor: isDark ? tokens.colorNeutralBackgroundDisabled : tokens.colorNeutralBackgroundDisabled,
      disabledTextColor: tokens.colorNeutralForegroundDisabled,
      disabledBorderColor: 'transparent',
    },
    secondary: {
      backgroundColor: 'transparent',
      textColor: isDark ? tokens.colorNeutralForeground1 : tokens.colorNeutralForeground1,
      borderColor: isDark ? tokens.colorNeutralStroke1 : tokens.colorNeutralStroke1,
      hoverBackgroundColor: isDark ? tokens.colorNeutralBackground1Hover : tokens.colorNeutralBackground1Hover,
      hoverTextColor: isDark ? tokens.colorNeutralForeground1Hover : tokens.colorNeutralForeground1Hover,
      hoverBorderColor: isDark ? tokens.colorNeutralStroke1Hover : tokens.colorNeutralStroke1Hover,
      focusColor: tokens.colorBrandStroke1,
      disabledBackgroundColor: 'transparent',
      disabledTextColor: tokens.colorNeutralForegroundDisabled,
      disabledBorderColor: tokens.colorNeutralStrokeDisabled,
    },
  };

  return tokensByVariant[variant];
};

export default useFluentTokens; 