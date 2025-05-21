import React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  MarqueeSelection,
  mergeStyleSets,
  IObjectWithKey,
  Stack,
  SearchBox,
  Text,
  useTheme,
  ITheme,
} from "@fluentui/react";
import { UserEditModal } from "./UserEditModal";

interface IUser extends IObjectWithKey {
  key: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
}

interface UserListProps {
  users: IUser[];
}

const getClassNames = (theme: ITheme) =>
  mergeStyleSets({
    container: {
      padding: "20px",
      backgroundColor: theme.palette.white,
    },
    header: {
      marginBottom: "20px",
    },
    searchBox: {
      width: "300px",
      marginBottom: "20px",
    },
  });

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const theme = useTheme();
  const classes = getClassNames(theme);

  const columns: IColumn[] = [
    {
      key: "name",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "email",
      name: "Email",
      fieldName: "email",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "role",
      name: "Role",
      fieldName: "role",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "lastActive",
      name: "Last Active",
      fieldName: "lastActive",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ];

  const selection = new Selection({
    onSelectionChanged: () => {
      const selectedItems = selection.getSelection() as IUser[];
      if (selectedItems.length === 1) {
        setSelectedUser(selectedItems[0]);
      } else {
        setSelectedUser(null);
      }
    },
  });

  const filteredUsers = React.useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [users, searchQuery]);

  const handleEditUser = () => {
    if (selectedUser) {
      setIsEditModalOpen(true);
    }
  };

  const handleEditModalDismiss = () => {
    setIsEditModalOpen(false);
  };

  const handleUserUpdate = (updatedUser: IUser) => {
    // Handle user update logic here
    setIsEditModalOpen(false);
  };

  return (
    <Stack className={classes.container}>
      <Stack className={classes.header}>
        <Text variant="xLarge">Users</Text>
      </Stack>

      <SearchBox
        className={classes.searchBox}
        placeholder="Search users..."
        onChange={(_, newValue) => setSearchQuery(newValue || "")}
      />

      <MarqueeSelection selection={selection}>
        <DetailsList
          items={filteredUsers}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selection={selection}
          selectionMode={SelectionMode.single}
          selectionPreservedOnEmptyClick={true}
          onItemInvoked={handleEditUser}
        />
      </MarqueeSelection>

      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onDismiss={handleEditModalDismiss}
          onSave={handleUserUpdate}
        />
      )}
    </Stack>
  );
};
