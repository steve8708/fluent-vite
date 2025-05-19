import React from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
} from "@fluentui/react-components";
import { Text, Icon, Stack, IStackTokens, getTheme } from "@fluentui/react";
import { useTheme } from "../../theme/ThemeProvider";

interface IUserCardProps {
  name: string;
  email: string;
  location: string;
  imageUrl: string;
  phone: string;
  onClick?: () => void;
  statusIcon?: string;
  statusText?: string;
}

const UserCard: React.FC<IUserCardProps> = ({
  name,
  email,
  location,
  imageUrl,
  phone,
  onClick,
  statusIcon = "CircleFill",
  statusText = "Active",
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";
  const fluentTheme = getTheme();

  const stackTokens: IStackTokens = { childrenGap: 8 };

  const cardStyles = {
    root: {
      width: "100%",
      maxWidth: 300,
      backgroundColor: isDark ? fluentTheme.palette.neutralLighter : "#fff",
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.2s ease",
      "&:hover": {
        boxShadow: fluentTheme.effects.elevation8,
        transform: onClick ? "translateY(-2px)" : "none",
      },
    },
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
  };

  const iconColor =
    statusText === "Active"
      ? fluentTheme.palette.green
      : statusText === "Away"
        ? fluentTheme.palette.yellow
        : fluentTheme.palette.neutralTertiary;

  return (
    <Card styles={cardStyles} onClick={onClick}>
      <CardPreview>
        <img src={imageUrl} alt={name} style={imageStyle} />
      </CardPreview>
      <CardHeader
        header={
          <Text variant="large" block>
            {name}
          </Text>
        }
        description={
          <Stack tokens={stackTokens}>
            <Text variant="small">{email}</Text>
            <Text variant="small">{location}</Text>
            <Text variant="small">{phone}</Text>
          </Stack>
        }
      />
      <CardFooter>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Icon iconName={statusIcon} style={{ color: iconColor }} />
          <Text variant="small">{statusText}</Text>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
