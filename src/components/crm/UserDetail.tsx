import React from "react";
import {
  Stack,
  IStackTokens,
  Text,
  Persona,
  PersonaSize,
  DefaultButton,
  PrimaryButton,
  Label,
  getTheme,
} from "@fluentui/react";
import { useTheme } from "../../theme/ThemeProvider";

interface IUserDetailProps {
  imageUrl: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  age: number;
  dob: string;
  registered: string;
  nationality: string;
  onEdit?: () => void;
  onClose?: () => void;
}

const UserDetail: React.FC<IUserDetailProps> = ({
  imageUrl,
  name,
  email,
  phone,
  location,
  address,
  age,
  dob,
  registered,
  nationality,
  onEdit,
  onClose,
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";
  const fluentTheme = getTheme();

  const stackTokens: IStackTokens = { childrenGap: 16 };
  const nestedStackTokens: IStackTokens = { childrenGap: 8 };

  const detailSectionStyle: React.CSSProperties = {
    backgroundColor: isDark
      ? fluentTheme.palette.neutralLighter
      : fluentTheme.palette.neutralLighterAlt,
    padding: "12px",
    borderRadius: "4px",
  };

  const detailLabelStyle: React.CSSProperties = {
    width: 120,
    fontWeight: 600,
    color: isDark
      ? fluentTheme.palette.neutralPrimary
      : fluentTheme.palette.neutralSecondary,
  };

  return (
    <Stack tokens={stackTokens}>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        horizontalAlign="start"
        verticalAlign="center"
      >
        <Persona
          imageUrl={imageUrl}
          text={name}
          size={PersonaSize.size100}
          secondaryText={email}
          tertiaryText={location}
        />
      </Stack>

      <Stack tokens={stackTokens}>
        <Label>Contact Information</Label>
        <Stack style={detailSectionStyle} tokens={nestedStackTokens}>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Email:</Text>
            <Text>{email}</Text>
          </Stack>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Phone:</Text>
            <Text>{phone}</Text>
          </Stack>
        </Stack>

        <Label>Address</Label>
        <Stack style={detailSectionStyle} tokens={nestedStackTokens}>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Street:</Text>
            <Text>{address.street}</Text>
          </Stack>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>City:</Text>
            <Text>{address.city}</Text>
          </Stack>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>State:</Text>
            <Text>{address.state}</Text>
          </Stack>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Country:</Text>
            <Text>{address.country}</Text>
          </Stack>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Postal Code:</Text>
            <Text>{address.postcode}</Text>
          </Stack>
        </Stack>

        <Label>Personal Information</Label>
        <Stack style={detailSectionStyle} tokens={nestedStackTokens}>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Date of Birth:</Text>
            <Text>{dob}</Text>
          </Stack>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Age:</Text>
            <Text>{age}</Text>
          </Stack>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Nationality:</Text>
            <Text>{nationality}</Text>
          </Stack>
          <Stack horizontal horizontalAlign="space-between">
            <Text style={detailLabelStyle}>Member Since:</Text>
            <Text>{registered}</Text>
          </Stack>
        </Stack>

        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
          {onClose && <DefaultButton text="Close" onClick={onClose} />}
          {onEdit && <PrimaryButton text="Edit" onClick={onEdit} />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserDetail;
