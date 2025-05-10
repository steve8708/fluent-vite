import { useEffect, useState } from "react";
import {
  Stack,
  Spinner,
  SpinnerSize,
  Text,
  PrimaryButton,
  SearchBox,
  Dropdown,
  mergeStyles,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import UserCard from "./UserCard";

const dashboardContainerClassName = mergeStyles({
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
});

const headerClassName = mergeStyles({
  width: "100%",
  marginBottom: "20px",
});

const titleClassName = mergeStyles({
  fontSize: "28px",
  fontWeight: "600",
  margin: "0 0 20px 0",
  color: "#333",
});

const controlsClassName = mergeStyles({
  width: "100%",
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  marginBottom: "20px",
});

const userGridClassName = mergeStyles({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "20px",
  width: "100%",
  margin: "20px 0",
});

const errorContainerClassName = mergeStyles({
  margin: "40px 0",
});

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [userCount, setUserCount] = useState(12);

  const sortOptions = [
    { key: "name", text: "Name" },
    { key: "country", text: "Country" },
    { key: "age", text: "Age" },
  ];

  useEffect(() => {
    fetchUsers();
  }, [userCount]);

  useEffect(() => {
    if (users.length > 0) {
      filterAndSortUsers();
    }
  }, [users, searchText, sortBy]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${userCount}&seed=abc123`,
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.results);
      setFilteredUsers(data.results);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    // Filter users based on search text
    let filtered = users;

    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = users.filter(
        (user) =>
          `${user.name.first} ${user.name.last}`
            .toLowerCase()
            .includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch) ||
          user.location.country.toLowerCase().includes(lowerSearch) ||
          user.location.city.toLowerCase().includes(lowerSearch),
      );
    }

    // Sort users based on selected option
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return `${a.name.first} ${a.name.last}`.localeCompare(
            `${b.name.first} ${b.name.last}`,
          );
        case "country":
          return a.location.country.localeCompare(b.location.country);
        case "age":
          return a.dob.age - b.dob.age;
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  };

  const handleSearchChange = (_, value) => {
    setSearchText(value || "");
  };

  const handleSortChange = (_, option) => {
    setSortBy(option.key);
  };

  const handleLoadMore = () => {
    setUserCount((prevCount) => prevCount + 8);
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  if (error) {
    return (
      <div className={dashboardContainerClassName}>
        <div className={errorContainerClassName}>
          <MessageBar messageBarType={MessageBarType.error}>
            Error loading users: {error}
          </MessageBar>
          <PrimaryButton onClick={handleRefresh} style={{ marginTop: "20px" }}>
            Try Again
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className={dashboardContainerClassName}>
      <div className={headerClassName}>
        <Text as="h1" className={titleClassName}>
          User Dashboard
        </Text>

        <div className={controlsClassName}>
          <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
            <Stack.Item grow>
              <SearchBox
                placeholder="Search by name, email, location..."
                onChange={handleSearchChange}
                value={searchText}
                styles={{ root: { width: "100%" } }}
              />
            </Stack.Item>
            <Dropdown
              placeholder="Sort by"
              label="Sort by"
              options={sortOptions}
              selectedKey={sortBy}
              onChange={handleSortChange}
              styles={{ root: { minWidth: 120 } }}
            />
            <PrimaryButton
              onClick={handleRefresh}
              iconProps={{ iconName: "Refresh" }}
            >
              Refresh
            </PrimaryButton>
          </Stack>
        </div>
      </div>

      {loading && users.length === 0 ? (
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          styles={{ root: { height: "300px" } }}
        >
          <Spinner size={SpinnerSize.large} label="Loading users..." />
        </Stack>
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            <div className={userGridClassName}>
              {filteredUsers.map((user, index) => (
                <UserCard key={`${user.login.uuid}-${index}`} user={user} />
              ))}
            </div>
          ) : (
            <Stack
              horizontalAlign="center"
              styles={{ root: { margin: "40px 0" } }}
            >
              <Text variant="large">No users match your search criteria</Text>
            </Stack>
          )}

          <Stack horizontalAlign="center" tokens={{ padding: "20px 0" }}>
            <PrimaryButton
              onClick={handleLoadMore}
              iconProps={{ iconName: "Add" }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More Users"}
            </PrimaryButton>
          </Stack>
        </>
      )}
    </div>
  );
};

export default Dashboard;
