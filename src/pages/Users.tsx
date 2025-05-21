import React from "react";
import { Stack } from "@fluentui/react";
import { UserList } from "../components";

const mockUsers = [
  {
    key: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    lastActive: "2023-04-01",
  },
  {
    key: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    lastActive: "2023-04-02",
  },
  // Add more mock users as needed
];

export const Users: React.FC = () => {
  return (
    <Stack>
      <UserList users={mockUsers} />
    </Stack>
  );
};
