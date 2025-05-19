import React from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
} from "@fluentui/react-components";
import { Text, Icon, getTheme } from "@fluentui/react";
import { useTheme } from "../../theme/ThemeProvider";

interface IStatisticCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  iconName?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  onClick?: () => void;
}

const StatisticCard: React.FC<IStatisticCardProps> = ({
  title,
  value,
  subtitle,
  iconName,
  trend,
  trendValue,
  onClick,
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";
  const fluentTheme = getTheme();

  const cardStyle = {
    cursor: onClick ? "pointer" : "default",
    backgroundColor: isDark ? fluentTheme.palette.neutralLighter : "#fff",
    width: "100%",
    minWidth: 200,
    maxWidth: 300,
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: fluentTheme.effects.elevation8,
      transform: onClick ? "translateY(-2px)" : "none",
    },
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 36,
    fontWeight: 600,
    marginTop: 12,
    marginBottom: 12,
    color: isDark
      ? fluentTheme.palette.white
      : fluentTheme.palette.themePrimary,
  };

  const getTrendColor = () => {
    if (trend === "up") return fluentTheme.palette.green;
    if (trend === "down") return fluentTheme.palette.red;
    return fluentTheme.palette.neutralSecondary;
  };

  const getTrendIcon = () => {
    if (trend === "up") return "TriangleSolidUp12";
    if (trend === "down") return "TriangleSolidDown12";
    return "CircleFill";
  };

  return (
    <Card styles={{ root: cardStyle }} onClick={onClick}>
      <CardHeader
        header={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {iconName && <Icon iconName={iconName} style={{ fontSize: 16 }} />}
            <Text variant="medium">{title}</Text>
          </div>
        }
      />
      <CardPreview>
        <div style={{ padding: "0 16px", textAlign: "center" }}>
          <div style={valueStyle}>{value}</div>
          {subtitle && <Text variant="medium">{subtitle}</Text>}
        </div>
      </CardPreview>
      {(trend || trendValue) && (
        <CardFooter>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {trend && (
              <Icon
                iconName={getTrendIcon()}
                style={{ color: getTrendColor(), fontSize: 12 }}
              />
            )}
            {trendValue && (
              <Text variant="small" style={{ color: getTrendColor() }}>
                {trendValue}
              </Text>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatisticCard;
