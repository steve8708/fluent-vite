import { useState } from "react";
import { Stack, TextField, PrimaryButton, Text } from "@fluentui/react";
import { searchLocation } from "../../services/weatherService";

export const LocationSearch = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a location name");
      return;
    }

    setError("");
    setIsSearching(true);
    try {
      const results = await searchLocation(searchQuery);
      setSearchResults(results);
      if (results.length === 0) {
        setError("No locations found. Try another search term.");
      }
    } catch (err) {
      setError("Error searching for location. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (location) => {
    onLocationSelect(location);
    setSearchResults([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <TextField
          placeholder="Enter city name..."
          value={searchQuery}
          onChange={(_, newValue) => setSearchQuery(newValue)}
          onKeyDown={handleKeyPress}
          styles={{ root: { width: "100%" } }}
          disabled={isSearching}
          errorMessage={error}
        />
        <PrimaryButton
          text="Search"
          onClick={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
        />
      </Stack>

      {searchResults.length > 0 && (
        <Stack
          className="search-results"
          tokens={{ childrenGap: 8 }}
          styles={{
            root: {
              maxHeight: "300px",
              overflowY: "auto",
              background: "#fff",
              borderRadius: "4px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              padding: "8px 0",
            },
          }}
        >
          {searchResults.map((result) => (
            <Stack
              key={result.id}
              horizontal
              horizontalAlign="space-between"
              verticalAlign="center"
              onClick={() => handleSelectLocation(result)}
              styles={{
                root: {
                  padding: "12px 16px",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#f3f2f1",
                  },
                },
              }}
            >
              <Stack.Item>
                <Text variant="medium">{result.name}</Text>
              </Stack.Item>
              <Stack.Item>
                <Text variant="small">
                  {result.country} {result.admin1 ? `- ${result.admin1}` : ""}
                </Text>
              </Stack.Item>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default LocationSearch;
