import {
  Stack,
  Text,
  Spinner,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import { WeatherIcon } from "./WeatherIcon";
import {
  getWeatherInfo,
  getWindDirection,
} from "../../services/weatherService";

export const WeatherDisplay = ({
  currentWeather,
  location,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { minHeight: "300px" } }}
      >
        <Spinner label="Loading weather data..." labelPosition="right" />
      </Stack>
    );
  }

  if (error) {
    return (
      <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
    );
  }

  if (!currentWeather) {
    return null;
  }

  const {
    weather_code,
    temperature_2m,
    apparent_temperature,
    relative_humidity_2m,
    wind_speed_10m,
    wind_direction_10m,
  } = currentWeather;

  const { description } = getWeatherInfo(weather_code);
  const windDir = getWindDirection(wind_direction_10m);

  return (
    <Stack className="weather-display" tokens={{ childrenGap: 16 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack.Item>
          <Text variant="xxLarge" styles={{ root: { fontWeight: 600 } }}>
            {location.name}
          </Text>
          <Text variant="large" styles={{ root: { opacity: 0.8 } }}>
            {location.country} {location.admin1 ? `- ${location.admin1}` : ""}
          </Text>
        </Stack.Item>
      </Stack>

      <Stack
        horizontal
        wrap
        horizontalAlign="space-between"
        verticalAlign="center"
        tokens={{ childrenGap: 20 }}
        styles={{
          root: {
            backgroundColor: "rgba(0, 120, 212, 0.08)",
            borderRadius: "8px",
            padding: "20px",
            marginTop: "20px",
          },
        }}
      >
        <Stack.Item>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
            <WeatherIcon weatherCode={weather_code} />
            <Stack tokens={{ childrenGap: 4 }}>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 600 } }}>
                {Math.round(temperature_2m)}°C
              </Text>
              <Text variant="medium">{description}</Text>
              <Text variant="small">
                Feels like {Math.round(apparent_temperature)}°C
              </Text>
            </Stack>
          </Stack>
        </Stack.Item>

        <Stack.Item>
          <Stack tokens={{ childrenGap: 12 }}>
            <WeatherDetail
              label="Humidity"
              value={`${Math.round(relative_humidity_2m)}%`}
            />
            <WeatherDetail
              label="Wind"
              value={`${windDir} ${Math.round(wind_speed_10m)} km/h`}
            />
          </Stack>
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

const WeatherDetail = ({ label, value }) => (
  <Stack horizontal tokens={{ childrenGap: 8 }}>
    <Text
      variant="medium"
      styles={{ root: { fontWeight: 600, minWidth: "80px" } }}
    >
      {label}:
    </Text>
    <Text variant="medium">{value}</Text>
  </Stack>
);

export default WeatherDisplay;
