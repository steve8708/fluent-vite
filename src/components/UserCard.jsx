import { useState } from "react";
import {
  PersonaSize,
  Persona,
  PersonaPresence,
  Text,
  DocumentCard,
  DocumentCardDetails,
  Stack,
  IconButton,
  mergeStyles,
} from "@fluentui/react";

const cardClassName = mergeStyles({
  maxWidth: "340px",
  minWidth: "300px",
  margin: "10px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
  },
});

const infoContainerClassName = mergeStyles({
  padding: "16px",
  width: "100%",
});

const iconButtonClassName = mergeStyles({
  marginLeft: "auto",
});

const UserCard = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date string to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <DocumentCard className={cardClassName}>
      <DocumentCardDetails>
        <Stack horizontal verticalAlign="center" tokens={{ padding: "12px" }}>
          <Persona
            imageUrl={user.picture.large}
            size={PersonaSize.size72}
            presence={PersonaPresence.online}
            imageAlt={`${user.name.first} ${user.name.last}`}
            text={`${user.name.first} ${user.name.last}`}
            secondaryText={user.email}
          />
          <IconButton
            className={iconButtonClassName}
            iconProps={{ iconName: isExpanded ? "ChevronUp" : "ChevronDown" }}
            onClick={toggleExpanded}
            ariaLabel={isExpanded ? "Show less" : "Show more"}
          />
        </Stack>

        <div className={infoContainerClassName}>
          <Stack tokens={{ childrenGap: 8 }}>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <Text variant="medium">
                <b>Phone:</b> {user.phone}
              </Text>
            </Stack>

            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <Text variant="medium">
                <b>Location:</b> {user.location.city}, {user.location.country}
              </Text>
            </Stack>

            {isExpanded && (
              <>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Text variant="medium">
                    <b>Street:</b> {user.location.street.number}{" "}
                    {user.location.street.name}
                  </Text>
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Text variant="medium">
                    <b>Postal Code:</b> {user.location.postcode}
                  </Text>
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Text variant="medium">
                    <b>Date of Birth:</b> {formatDate(user.dob.date)} (
                    {user.dob.age} years)
                  </Text>
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Text variant="medium">
                    <b>Registered:</b> {formatDate(user.registered.date)}
                  </Text>
                </Stack>
              </>
            )}
          </Stack>
        </div>
      </DocumentCardDetails>
    </DocumentCard>
  );
};

export default UserCard;
