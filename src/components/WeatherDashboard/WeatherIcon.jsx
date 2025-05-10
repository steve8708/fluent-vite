import { Icon } from "@fluentui/react";
import { getWeatherInfo } from "../../services/weatherService";

/**
 * Component to display weather icons based on WMO codes
 */
export const WeatherIcon = ({ weatherCode, size = "large", styles = {} }) => {
  const { icon } = getWeatherInfo(weatherCode);

  // Map size to pixel values
  const sizeMap = {
    small: { fontSize: 24, root: { minWidth: 24, minHeight: 24 } },
    medium: { fontSize: 40, root: { minWidth: 40, minHeight: 40 } },
    large: { fontSize: 64, root: { minWidth: 64, minHeight: 64 } },
  };

  const iconSize = sizeMap[size] || sizeMap.medium;

  return (
    <Icon
      iconName={icon}
      styles={{
        root: {
          ...iconSize.root,
          ...styles.root,
        },
        icon: {
          fontSize: iconSize.fontSize,
          ...styles.icon,
        },
      }}
    />
  );
};

export default WeatherIcon;
