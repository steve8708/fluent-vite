import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Button,
  Text,
  CardFooter,
  tokens,
} from "@fluentui/react-components";
import { useTheme } from "../theme/ThemeProvider";
import { User } from "../pages/Users";

interface UserCardProps {
  user: User;
  onEdit: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  // Format name and location
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;

  return (
    <Card
      style={{
        maxWidth: "100%",
        minHeight: "220px",
        backgroundColor: isDark
          ? tokens.colorNeutralBackground1
          : tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow4,
        border: `1px solid ${isDark ? tokens.colorNeutralStroke1 : tokens.colorNeutralStroke1}`,
      }}
    >
      <CardHeader
        image={
          <Avatar
            image={{ src: user.picture.large }}
            size={56}
            aria-label={fullName}
          />
        }
        header={
          <Text weight="semibold" size={400}>
            {fullName}
          </Text>
        }
        description={
          <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
            {user.email}
          </Text>
        }
      />

      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ marginBottom: "8px" }}>
          <Text
            size={200}
            weight="semibold"
            style={{ color: tokens.colorNeutralForeground3 }}
          >
            Location
          </Text>
          <Text size={300}>{location}</Text>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <Text
            size={200}
            weight="semibold"
            style={{ color: tokens.colorNeutralForeground3 }}
          >
            Phone
          </Text>
          <Text size={300}>{user.phone}</Text>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <Text
            size={200}
            weight="semibold"
            style={{ color: tokens.colorNeutralForeground3 }}
          >
            Gender
          </Text>
          <Text size={300} style={{ textTransform: "capitalize" }}>
            {user.gender}
          </Text>
        </div>
      </div>

      <CardFooter>
        <Button
          appearance="primary"
          onClick={onEdit}
          icon={<i className="ti ti-pencil" />}
        >
          Edit
        </Button>
        <Button
          appearance="subtle"
          icon={<i className="ti ti-user" />}
          style={{ marginLeft: "auto" }}
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
