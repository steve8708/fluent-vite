/**
 * Weather service to interact with Open Meteo API
 */

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_API_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Search for a location by name
 * @param {string} query - The location name to search for
 * @returns {Promise<Array>} - Array of location results
 */
export const searchLocation = async (query) => {
  try {
    const response = await fetch(
      `${GEOCODING_API_URL}?name=${encodeURIComponent(query)}&count=5`,
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching for location:", error);
    return [];
  }
};

/**
 * Get the current weather and forecast for a location
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {Promise<Object>} - Weather data
 */
export const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${FORECAST_API_URL}?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code` +
        `&timezone=auto`,
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

/**
 * Get weather icon and description from WMO code
 * @param {number} code - WMO weather code
 * @returns {Object} - Icon and description
 */
export const getWeatherInfo = (code) => {
  const weatherMapping = {
    0: { icon: "Weather", description: "Clear sky" },
    1: { icon: "PartlySunny", description: "Mainly clear" },
    2: { icon: "PartlySunny", description: "Partly cloudy" },
    3: { icon: "CloudyLegacy", description: "Overcast" },
    45: { icon: "Fog", description: "Fog" },
    48: { icon: "Fog", description: "Depositing rime fog" },
    51: { icon: "Rain", description: "Light drizzle" },
    53: { icon: "Rain", description: "Moderate drizzle" },
    55: { icon: "Rain", description: "Dense drizzle" },
    56: { icon: "Snow", description: "Light freezing drizzle" },
    57: { icon: "Snow", description: "Dense freezing drizzle" },
    61: { icon: "Rain", description: "Slight rain" },
    63: { icon: "Rain", description: "Moderate rain" },
    65: { icon: "Rain", description: "Heavy rain" },
    66: { icon: "Snow", description: "Light freezing rain" },
    67: { icon: "Snow", description: "Heavy freezing rain" },
    71: { icon: "Snow", description: "Slight snowfall" },
    73: { icon: "Snow", description: "Moderate snowfall" },
    75: { icon: "Snow", description: "Heavy snowfall" },
    77: { icon: "Snow", description: "Snow grains" },
    80: { icon: "Rain", description: "Slight rain showers" },
    81: { icon: "Rain", description: "Moderate rain showers" },
    82: { icon: "Rain", description: "Violent rain showers" },
    85: { icon: "Snow", description: "Slight snow showers" },
    86: { icon: "Snow", description: "Heavy snow showers" },
    95: { icon: "Thunder", description: "Thunderstorm" },
    96: { icon: "Thunder", description: "Thunderstorm with slight hail" },
    99: { icon: "Thunder", description: "Thunderstorm with heavy hail" },
  };

  return weatherMapping[code] || { icon: "Unknown", description: "Unknown" };
};

/**
 * Format wind direction in degrees to cardinal direction
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} - Cardinal direction
 */
export const getWindDirection = (degrees) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Format a date to a readable string
 * @param {string} dateString - Date string
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
