import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  SearchBox,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Pivot,
  PivotItem,
  Stack,
  StackItem,
  Text,
  Persona,
  PersonaSize,
  PersonaPresence,
  ProgressIndicator,
  getTheme,
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardActivity,
  Dialog,
  DialogType,
  DialogFooter,
  IStackTokens,
  CommandBarButton,
  DefaultButton,
  PrimaryButton,
  Panel,
  PanelType,
  Link,
} from "@fluentui/react";
import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
} from "@fluentui/react-components";
import {
  AreaChart,
  IChartProps,
  ILineChartPoints,
  DonutChart,
  IDonutChartData,
} from "@fluentui/react-charting";
import { useTheme } from "../theme/ThemeProvider";
import styles from "./CrmDashboard.module.css";

interface IUser {
  id: string;
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  registered: {
    date: string;
    age: number;
  };
  dob: {
    date: string;
    age: number;
  };
}

interface IUserActivity {
  key: string;
  label: string;
  date: string;
  description: string;
}

const CrmDashboard: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";
  const theme = getTheme();
  const darkClass = isDark ? styles.darkContainer : "";

  // State
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [activityLog, setActivityLog] = useState<IUserActivity[]>([]);

  // Get users from randomuser.me API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://randomuser.me/api/?results=50&seed=crm123",
        );
        const data = await response.json();

        // Add custom ID to each user
        const usersWithIds = data.results.map((user: any, index: number) => ({
          ...user,
          id: `user-${index}`,
        }));

        setUsers(usersWithIds);
        setFilteredUsers(usersWithIds);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Generate activity log for the selected user
  useEffect(() => {
    if (selectedUser) {
      const activities: IUserActivity[] = [
        {
          key: "1",
          label: "Email Sent",
          date: "Today",
          description: `Sent welcome email to ${selectedUser.name.first}`,
        },
        {
          key: "2",
          label: "Call Scheduled",
          date: "Yesterday",
          description: "Scheduled introduction call",
        },
        {
          key: "3",
          label: "Note Added",
          date: "3 days ago",
          description: "Customer interested in premium plan",
        },
        {
          key: "4",
          label: "Task Completed",
          date: "1 week ago",
          description: "Updated contact information",
        },
      ];
      setActivityLog(activities);
    }
  }, [selectedUser]);

  // Columns for DetailsList
  const columns: IColumn[] = [
    {
      key: "profile",
      name: "Contact",
      minWidth: 150,
      maxWidth: 220,
      onRender: (item: IUser) => (
        <Persona
          imageUrl={item.picture.thumbnail}
          text={`${item.name.first} ${item.name.last}`}
          secondaryText={item.email}
          size={PersonaSize.size40}
          presence={getRandomPresence()}
        />
      ),
    },
    {
      key: "location",
      name: "Location",
      minWidth: 120,
      maxWidth: 180,
      onRender: (item: IUser) => (
        <span>{`${item.location.city}, ${item.location.country}`}</span>
      ),
    },
    {
      key: "phone",
      name: "Phone",
      fieldName: "phone",
      minWidth: 100,
      maxWidth: 120,
    },
    {
      key: "age",
      name: "Age",
      minWidth: 50,
      maxWidth: 60,
      onRender: (item: IUser) => <span>{item.dob.age}</span>,
    },
    {
      key: "registered",
      name: "Member Since",
      minWidth: 100,
      maxWidth: 120,
      onRender: (item: IUser) => (
        <span>{new Date(item.registered.date).toLocaleDateString()}</span>
      ),
    },
    {
      key: "actions",
      name: "Actions",
      minWidth: 120,
      maxWidth: 120,
      onRender: (item: IUser) => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <Link onClick={() => handleViewDetails(item)}>View</Link>
          <Link onClick={() => handleEditUser(item)}>Edit</Link>
          <Link onClick={() => handleDeleteUser(item)}>Delete</Link>
        </Stack>
      ),
    },
  ];

  // Selection setup for DetailsList
  const selection = new Selection({
    onSelectionChanged: () => {
      const selectedItems = selection.getSelection() as IUser[];
      if (selectedItems.length > 0) {
        setSelectedUser(selectedItems[0]);
      } else {
        setSelectedUser(null);
      }
    },
  });

  // Statistics data
  const getGenderStats = (): IDonutChartData[] => {
    const maleCount = users.filter((user) => user.gender === "male").length;
    const femaleCount = users.filter((user) => user.gender === "female").length;

    return [
      {
        key: "Male",
        data: maleCount,
        color: theme.palette.blue,
      },
      {
        key: "Female",
        data: femaleCount,
        color: theme.palette.magenta,
      },
    ];
  };

  const getAgeDistribution = (): ILineChartPoints[] => {
    const ageGroups = {
      "18-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51-60": 0,
      "60+": 0,
    };

    users.forEach((user) => {
      const age = user.dob.age;
      if (age <= 30) ageGroups["18-30"]++;
      else if (age <= 40) ageGroups["31-40"]++;
      else if (age <= 50) ageGroups["41-50"]++;
      else if (age <= 60) ageGroups["51-60"]++;
      else ageGroups["60+"]++;
    });

    return Object.keys(ageGroups).map((group) => ({
      x: group,
      y: ageGroups[group as keyof typeof ageGroups],
    }));
  };

  const getAgeChartData = (): IChartProps => {
    const data = getAgeDistribution();
    return {
      chartTitle: "Age Distribution",
      lineChartData: [
        {
          legend: "Age Groups",
          data,
          color: theme.palette.blue,
        },
      ],
    };
  };

  // Helper functions
  const getRandomPresence = (): PersonaPresence => {
    const presences = [
      PersonaPresence.online,
      PersonaPresence.away,
      PersonaPresence.busy,
      PersonaPresence.offline,
    ];
    return presences[Math.floor(Math.random() * presences.length)];
  };

  const handleSearch = (newValue?: string): void => {
    const searchVal = newValue !== undefined ? newValue : searchText;
    setSearchText(searchVal);

    if (!searchVal) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(
      (user) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchVal.toLowerCase()) ||
        user.email.toLowerCase().includes(searchVal.toLowerCase()) ||
        user.location.city.toLowerCase().includes(searchVal.toLowerCase()) ||
        user.location.country.toLowerCase().includes(searchVal.toLowerCase()),
    );

    setFilteredUsers(filtered);
  };

  const handleViewDetails = (user: IUser): void => {
    setSelectedUser(user);
    setIsPanelOpen(true);
  };

  const handleEditUser = (user: IUser): void => {
    setSelectedUser(user);
    // In a real app, this would open an edit form
    alert(
      `Edit functionality would be implemented for: ${user.name.first} ${user.name.last}`,
    );
  };

  const handleDeleteUser = (user: IUser): void => {
    setSelectedUser(user);
    setIsDialogVisible(true);
  };

  const confirmDelete = (): void => {
    if (selectedUser) {
      // In a real app, this would call an API to delete the user
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setFilteredUsers(
        updatedUsers.filter(
          (user) =>
            `${user.name.first} ${user.name.last}`
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase()) ||
            user.location.city
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            user.location.country
              .toLowerCase()
              .includes(searchText.toLowerCase()),
        ),
      );
      setIsDialogVisible(false);
    }
  };

  const stackTokens: IStackTokens = { childrenGap: 16 };

  return (
    <div className={`${styles.container} ${darkClass}`}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>CRM Dashboard</h1>
          </div>
          <div className={styles.headerRight}>
            <CommandBarButton
              iconProps={{ iconName: "Refresh" }}
              text="Refresh Data"
              onClick={() => window.location.reload()}
            />
            <CommandBarButton
              iconProps={{ iconName: "Add" }}
              text="Add Contact"
              onClick={() =>
                alert("Add contact functionality would be implemented here")
              }
            />
          </div>
        </div>
      </header>

      <div className={styles.content}>
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            dismissButtonAriaLabel="Close"
          >
            {error}
          </MessageBar>
        )}

        <Stack tokens={stackTokens}>
          {/* Dashboard Statistics */}
          <Stack
            horizontal
            tokens={stackTokens}
            className={styles.statsContainer}
          >
            <Card className={styles.statCard}>
              <CardHeader
                header={<Text variant="large">Total Contacts</Text>}
              />
              <CardPreview className={styles.statPreview}>
                <Text
                  variant="xxLarge"
                  style={{ textAlign: "center", paddingTop: "70px" }}
                >
                  {users.length}
                </Text>
              </CardPreview>
              <CardFooter>
                <Text>Active customer database</Text>
              </CardFooter>
            </Card>

            <Card className={styles.statCard}>
              <CardHeader header={<Text variant="large">Average Age</Text>} />
              <CardPreview className={styles.statPreview}>
                <Text
                  variant="xxLarge"
                  style={{ textAlign: "center", paddingTop: "70px" }}
                >
                  {users.length
                    ? Math.round(
                        users.reduce((sum, user) => sum + user.dob.age, 0) /
                          users.length,
                      )
                    : 0}
                </Text>
              </CardPreview>
              <CardFooter>
                <Text>Years</Text>
              </CardFooter>
            </Card>

            <Card className={styles.statCard}>
              <CardHeader header={<Text variant="large">Countries</Text>} />
              <CardPreview className={styles.statPreview}>
                <Text
                  variant="xxLarge"
                  style={{ textAlign: "center", paddingTop: "70px" }}
                >
                  {new Set(users.map((user) => user.location.country)).size}
                </Text>
              </CardPreview>
              <CardFooter>
                <Text>Unique locations</Text>
              </CardFooter>
            </Card>

            <Card className={styles.statCard}>
              <CardHeader header={<Text variant="large">New Today</Text>} />
              <CardPreview className={styles.statPreview}>
                <Text
                  variant="xxLarge"
                  style={{ textAlign: "center", paddingTop: "70px" }}
                >
                  5
                </Text>
              </CardPreview>
              <CardFooter>
                <Text>Recent additions</Text>
              </CardFooter>
            </Card>
          </Stack>

          {/* Charts */}
          <Stack
            horizontal
            tokens={stackTokens}
            className={styles.chartsContainer}
          >
            <Stack.Item className={styles.donutChart}>
              <Card>
                <CardHeader
                  header={<Text variant="large">Gender Distribution</Text>}
                />
                <CardPreview className={styles.chartPreview}>
                  {users.length > 0 && (
                    <DonutChart
                      data={getGenderStats()}
                      innerRadius={70}
                      hideLabels={false}
                      legendProps={{
                        allowFocusOnLegends: true,
                        styles: { text: { color: isDark ? "#fff" : "#333" } },
                      }}
                    />
                  )}
                </CardPreview>
              </Card>
            </Stack.Item>

            <Stack.Item className={styles.lineChart}>
              <Card>
                <CardHeader
                  header={<Text variant="large">Age Distribution</Text>}
                />
                <CardPreview className={styles.chartPreview}>
                  {users.length > 0 && (
                    <AreaChart
                      data={getAgeChartData()}
                      legendsOverflowText={"Overflow Items"}
                      ignoreMissingVales={true}
                      yAxisTickCount={5}
                      legendProps={{
                        allowFocusOnLegends: true,
                        styles: { text: { color: isDark ? "#fff" : "#333" } },
                      }}
                    />
                  )}
                </CardPreview>
              </Card>
            </Stack.Item>
          </Stack>

          {/* User List */}
          <Stack className={styles.userListContainer}>
            <Card>
              <CardHeader
                header={<Text variant="large">Customer Database</Text>}
                action={
                  <SearchBox
                    placeholder="Search users..."
                    onChange={(_, newValue) => handleSearch(newValue)}
                    value={searchText}
                    className={styles.searchBox}
                  />
                }
              />
              <CardPreview>
                {isLoading ? (
                  <Spinner size={SpinnerSize.large} label="Loading users..." />
                ) : (
                  <>
                    <div className={styles.userCountInfo}>
                      <Text>{filteredUsers.length} contacts found</Text>
                    </div>
                    <DetailsList
                      items={filteredUsers}
                      columns={columns}
                      selectionMode={SelectionMode.single}
                      layoutMode={DetailsListLayoutMode.justified}
                      selection={selection}
                      selectionPreservedOnEmptyClick={true}
                      onItemInvoked={handleViewDetails}
                      className={styles.userTable}
                    />
                  </>
                )}
              </CardPreview>
            </Card>
          </Stack>
        </Stack>
      </div>

      {/* User Details Panel */}
      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        headerText="Customer Details"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        isLightDismiss
      >
        {selectedUser && (
          <div className={styles.userDetails}>
            <Stack tokens={{ childrenGap: 20 }}>
              <Stack
                horizontal
                tokens={{ childrenGap: 15 }}
                horizontalAlign="start"
                verticalAlign="center"
              >
                <img
                  src={selectedUser.picture.large}
                  alt={`${selectedUser.name.first} ${selectedUser.name.last}`}
                  className={styles.userDetailImage}
                />
                <Stack>
                  <Text variant="xLarge">{`${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`}</Text>
                  <Text variant="mediumPlus">{selectedUser.email}</Text>
                  <Text variant="medium">{`${selectedUser.location.city}, ${selectedUser.location.country}`}</Text>
                </Stack>
              </Stack>

              <Pivot aria-label="User Details Sections">
                <PivotItem headerText="Profile">
                  <div className={styles.pivotContent}>
                    <Stack tokens={{ childrenGap: 15 }}>
                      <div className={styles.detailItem}>
                        <Text variant="mediumPlus">Contact Information</Text>
                        <Stack
                          tokens={{ childrenGap: 8 }}
                          className={styles.detailSection}
                        >
                          <div className={styles.detailRow}>
                            <Text>Phone:</Text>
                            <Text>{selectedUser.phone}</Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>Mobile:</Text>
                            <Text>{selectedUser.cell}</Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>Email:</Text>
                            <Text>{selectedUser.email}</Text>
                          </div>
                        </Stack>
                      </div>

                      <div className={styles.detailItem}>
                        <Text variant="mediumPlus">Address</Text>
                        <Stack
                          tokens={{ childrenGap: 8 }}
                          className={styles.detailSection}
                        >
                          <div className={styles.detailRow}>
                            <Text>Street:</Text>
                            <Text>{`${selectedUser.location.street.number} ${selectedUser.location.street.name}`}</Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>City:</Text>
                            <Text>{selectedUser.location.city}</Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>State:</Text>
                            <Text>{selectedUser.location.state}</Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>Country:</Text>
                            <Text>{selectedUser.location.country}</Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>Postal Code:</Text>
                            <Text>{selectedUser.location.postcode}</Text>
                          </div>
                        </Stack>
                      </div>

                      <div className={styles.detailItem}>
                        <Text variant="mediumPlus">Personal Information</Text>
                        <Stack
                          tokens={{ childrenGap: 8 }}
                          className={styles.detailSection}
                        >
                          <div className={styles.detailRow}>
                            <Text>Date of Birth:</Text>
                            <Text>
                              {new Date(
                                selectedUser.dob.date,
                              ).toLocaleDateString()}
                            </Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>Age:</Text>
                            <Text>{selectedUser.dob.age}</Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>Gender:</Text>
                            <Text>
                              {selectedUser.gender.charAt(0).toUpperCase() +
                                selectedUser.gender.slice(1)}
                            </Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>Nationality:</Text>
                            <Text>{selectedUser.nat}</Text>
                          </div>
                          <div className={styles.detailRow}>
                            <Text>Member Since:</Text>
                            <Text>
                              {new Date(
                                selectedUser.registered.date,
                              ).toLocaleDateString()}
                            </Text>
                          </div>
                        </Stack>
                      </div>
                    </Stack>
                  </div>
                </PivotItem>

                <PivotItem headerText="Activity">
                  <div className={styles.pivotContent}>
                    <div className={styles.activityFeed}>
                      {activityLog.map((activity) => (
                        <DocumentCard
                          key={activity.key}
                          className={styles.activityCard}
                        >
                          <DocumentCardDetails>
                            <DocumentCardTitle title={activity.label} />
                            <DocumentCardActivity
                              activity={activity.description}
                              people={[
                                {
                                  name: "System",
                                  profileImageSrc: "",
                                },
                              ]}
                              timestamp={activity.date}
                            />
                          </DocumentCardDetails>
                        </DocumentCard>
                      ))}
                    </div>
                  </div>
                </PivotItem>

                <PivotItem headerText="Deals">
                  <div className={styles.pivotContent}>
                    <Stack tokens={{ childrenGap: 15 }}>
                      <Text variant="mediumPlus">Active Deals</Text>
                      <div className={styles.dealItem}>
                        <Text variant="medium">Basic Plan Subscription</Text>
                        <div className={styles.dealProgress}>
                          <Text>Progress: 75%</Text>
                          <ProgressIndicator percentComplete={0.75} />
                        </div>
                        <div className={styles.dealValue}>
                          <Text>Value: $1,200</Text>
                          <Text>Expected close: 2 weeks</Text>
                        </div>
                      </div>
                      <div className={styles.dealItem}>
                        <Text variant="medium">Premium Service Add-on</Text>
                        <div className={styles.dealProgress}>
                          <Text>Progress: 30%</Text>
                          <ProgressIndicator percentComplete={0.3} />
                        </div>
                        <div className={styles.dealValue}>
                          <Text>Value: $450</Text>
                          <Text>Expected close: 1 month</Text>
                        </div>
                      </div>
                    </Stack>
                  </div>
                </PivotItem>

                <PivotItem headerText="Notes">
                  <div className={styles.pivotContent}>
                    <Stack tokens={{ childrenGap: 15 }}>
                      <Text variant="mediumPlus">Customer Notes</Text>
                      <div className={styles.noteItem}>
                        <div className={styles.noteHeader}>
                          <Text variant="medium">Initial Contact</Text>
                          <Text>2 weeks ago</Text>
                        </div>
                        <Text>
                          Customer expressed interest in our premium services.
                          Follow up in two weeks.
                        </Text>
                      </div>
                      <div className={styles.noteItem}>
                        <div className={styles.noteHeader}>
                          <Text variant="medium">Feedback Call</Text>
                          <Text>1 week ago</Text>
                        </div>
                        <Text>
                          Customer is happy with the basic service but had
                          questions about advanced features.
                        </Text>
                      </div>
                      <div className={styles.addNote}>
                        <PrimaryButton
                          text="Add Note"
                          onClick={() =>
                            alert(
                              "Add note functionality would be implemented here",
                            )
                          }
                        />
                      </div>
                    </Stack>
                  </div>
                </PivotItem>
              </Pivot>

              <Stack
                horizontal
                tokens={{ childrenGap: 10 }}
                horizontalAlign="end"
              >
                <DefaultButton
                  text="Close"
                  onClick={() => setIsPanelOpen(false)}
                />
                <PrimaryButton
                  text="Edit Customer"
                  onClick={() => handleEditUser(selectedUser)}
                />
              </Stack>
            </Stack>
          </div>
        )}
      </Panel>

      {/* Delete Confirmation Dialog */}
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Confirm Delete",
          subText: selectedUser
            ? `Are you sure you want to delete ${selectedUser.name.first} ${selectedUser.name.last}? This action cannot be undone.`
            : "Are you sure you want to delete this contact?",
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } },
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={confirmDelete} text="Delete" />
          <DefaultButton
            onClick={() => setIsDialogVisible(false)}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CrmDashboard;
