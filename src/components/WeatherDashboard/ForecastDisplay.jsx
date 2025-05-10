import { Stack, Text } from "@fluentui/react";
import { WeatherIcon } from "./WeatherIcon";
import { formatDate, getWeatherInfo } from "../../services/weatherService";

export const ForecastDisplay = ({ forecast }) => {
  if (!forecast || !forecast.daily) {
    return null;
  }

  const { daily } = forecast;
  const numDays = daily.time.length;
  const forecastData = [];

  for (let i = 0; i < numDays; i++) {
    forecastData.push({
      date: daily.time[i],
      maxTemp: daily.temperature_2m_max[i],
      minTemp: daily.temperature_2m_min[i],
      precipitation: daily.precipitation_sum[i],
      weatherCode: daily.weather_code[i],
    });
  }

  return (
    <Stack className="forecast-display">
      <Text
        variant="xLarge"
        styles={{
          root: {
            fontWeight: 600,
            marginBottom: 16,
            marginTop: 24,
          },
        }}
      >
        7-Day Forecast
      </Text>

      <Stack
        horizontal
        horizontalAlign="space-between"
        wrap
        styles={{
          root: {
            overflowX: "auto",
            padding: "4px",
          },
        }}
      >
        {forecastData.map((day) => (
          <ForecastDay key={day.date} day={day} />
        ))}
      </Stack>
    </Stack>
  );
};

const ForecastDay = ({ day }) => {
  const { date, maxTemp, minTemp, precipitation, weatherCode } = day;
  const { description } = getWeatherInfo(weatherCode);
  const formattedDate = formatDate(date);

  return (
    <Stack
      className="forecast-day"
      horizontalAlign="center"
      tokens={{ childrenGap: 8 }}
      styles={{
        root: {
          padding: "16px",
          minWidth: "120px",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 120, 212, 0.04)",
          margin: "4px",
          transition: "all 0.2s ease",
          ":hover": {
            backgroundColor: "rgba(0, 120, 212, 0.08)",
          },
        },
      }}
    >
      <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
        {formattedDate}
      </Text>

      <WeatherIcon weatherCode={weatherCode} size="small" />

      <Text
        variant="small"
        styles={{ root: { textAlign: "center", height: "40px" } }}
      >
        {description}
      </Text>

      <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="center">
        <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
          {Math.round(maxTemp)}°
        </Text>
        <Text variant="medium" styles={{ root: { opacity: 0.7 } }}>
          {Math.round(minTemp)}°
        </Text>
      </Stack>

      {precipitation > 0 && (
        <Text variant="small">{precipitation.toFixed(1)} mm</Text>
      )}
    </Stack>
  );
};

export default ForecastDisplay;
