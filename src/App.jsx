import { useState, useEffect } from "react";
import {
  Stack,
  Text,
  MessageBar,
  MessageBarType,
  initializeIcons,
  ThemeProvider,
  createTheme,
} from "@fluentui/react";
import {
  LocationSearch,
  WeatherDisplay,
  ForecastDisplay,
} from "./components/WeatherDashboard";
import { getWeatherData } from "./services/weatherService";
import "./App.css";

// Initialize Fluent UI icons
initializeIcons();

// Create custom theme
const theme = createTheme({
  palette: {
    themePrimary: "#0078d4",
    themeLighterAlt: "#f3f9fd",
    themeLighter: "#d0e7f8",
    themeLight: "#a9d3f2",
    themeTertiary: "#5ca9e5",
    themeSecondary: "#1a86d9",
    themeDarkAlt: "#006dc1",
    themeDark: "#005ca3",
    themeDarker: "#004478",
  },
});

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if there's a stored location in localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem("weatherLocation");
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        setSelectedLocation(parsedLocation);
      } catch (e) {
        console.error("Failed to parse saved location", e);
        localStorage.removeItem("weatherLocation");
      }
    }
  }, []);

  // Fetch weather data when location changes
  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation);
      // Save location to localStorage
      localStorage.setItem("weatherLocation", JSON.stringify(selectedLocation));
    }
  }, [selectedLocation]);

  const fetchWeatherData = async (location) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getWeatherData(location.latitude, location.longitude);
      if (data) {
        setWeatherData(data);
      } else {
        setError("Could not fetch weather data. Please try again later.");
      }
    } catch (err) {
      setError("Error fetching weather data. Please try again.");
      console.error("Weather data error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Stack
          className="weather-container"
          tokens={{ childrenGap: 20 }}
          styles={{ root: { width: "100%", maxWidth: "1000px" } }}
        >
          <Stack.Item align="center">
            <Text variant="xxLarge" styles={{ root: { fontWeight: 600 } }}>
              Weather Dashboard
            </Text>
          </Stack.Item>

          <LocationSearch onLocationSelect={handleLocationSelect} />

          {error && (
            <MessageBar messageBarType={MessageBarType.error}>
              {error}
            </MessageBar>
          )}

          {selectedLocation && (
            <WeatherDisplay
              currentWeather={weatherData?.current}
              location={selectedLocation}
              isLoading={isLoading}
              error={error}
            />
          )}

          {weatherData && <ForecastDisplay forecast={weatherData} />}

          {!selectedLocation && !isLoading && (
            <Stack
              horizontalAlign="center"
              verticalAlign="center"
              styles={{ root: { padding: "40px 20px", textAlign: "center" } }}
            >
              <Text variant="large">
                Search for a location to see the current weather and forecast
              </Text>
            </Stack>
          )}
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default App;
