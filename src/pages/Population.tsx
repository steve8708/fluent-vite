import React, { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Card,
  CardHeader,
  Text,
  Title3,
  Subtitle1,
  tokens,
  Badge,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";
import { useTheme } from "../theme/ThemeProvider";
import { ArrowSync24Regular } from "@fluentui/react-icons";
import styles from "./Population.module.css";

// Define the shape of the API response
interface PopulationData {
  "ID Nation": string;
  Nation: string;
  "ID Year": number;
  Year: string;
  Population: number;
  "Slug Nation": string;
}

interface ApiResponse {
  data: PopulationData[];
  source: any[];
}

// ThemeToggle component for light/dark mode switching
const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Button
      appearance="subtle"
      icon={<i className={`ti ti-${themeMode === "light" ? "moon" : "sun"}`} />}
      onClick={toggleTheme}
      style={{
        color: tokens.colorNeutralForeground1,
        backgroundColor: "transparent",
      }}
    >
      {themeMode === "light" ? "Dark mode" : "Light mode"}
    </Button>
  );
};

// Create a simple bar chart without using FluentUI charting library
const SimpleBarChart: React.FC<{ data: PopulationData[] }> = ({ data }) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  // Find the maximum population value for scaling
  const maxPopulation = Math.max(...data.map((item) => item.Population));

  return (
    <div className={styles.simpleChart}>
      <div className={styles.chartBars}>
        {data.map((item) => (
          <div key={item.Year} className={styles.barContainer}>
            <div
              className={styles.bar}
              style={{
                height: `${(item.Population / maxPopulation) * 100}%`,
                backgroundColor: isDark
                  ? tokens.colorBrandForeground1
                  : tokens.colorBrandBackground,
              }}
              title={`${item.Year}: ${item.Population.toLocaleString()}`}
            />
            <div className={styles.barLabel}>{item.Year}</div>
          </div>
        ))}
      </div>
      <div className={styles.yAxis}>
        <div className={styles.yAxisLabel}>
          {Math.floor(maxPopulation / 1000000)}M
        </div>
        <div className={styles.yAxisLabel}>
          {Math.floor(maxPopulation / 2000000)}M
        </div>
        <div className={styles.yAxisLabel}>0</div>
      </div>
    </div>
  );
};

// Create a simple line chart without using FluentUI charting library
const SimpleLineChart: React.FC<{ data: PopulationData[] }> = ({ data }) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  // Find min and max years and populations for scaling
  const years = data.map((item) => parseInt(item.Year));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = maxYear - minYear;

  const populations = data.map((item) => item.Population);
  const minPopulation = Math.min(...populations);
  const maxPopulation = Math.max(...populations);
  const populationRange = maxPopulation - minPopulation;

  // Calculate points for the SVG polyline
  const points = data
    .map((item, index) => {
      const x = ((parseInt(item.Year) - minYear) / yearRange) * 100;
      const y =
        100 - ((item.Population - minPopulation) / populationRange) * 100;
      return `${x}%,${y}%`;
    })
    .join(" ");

  return (
    <div className={styles.simpleChart}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points={points}
          fill="none"
          stroke={
            isDark ? tokens.colorBrandForeground1 : tokens.colorBrandBackground
          }
          strokeWidth="2"
        />
        {data.map((item, index) => {
          const x = ((parseInt(item.Year) - minYear) / yearRange) * 100;
          const y =
            100 - ((item.Population - minPopulation) / populationRange) * 100;
          return (
            <circle
              key={item.Year}
              cx={`${x}%`}
              cy={`${y}%`}
              r="2"
              fill={
                isDark
                  ? tokens.colorBrandForeground1
                  : tokens.colorBrandBackground
              }
            />
          );
        })}
      </svg>
      <div className={styles.xAxis}>
        {data.map((item) => (
          <div
            key={item.Year}
            className={styles.xAxisLabel}
            style={{
              left: `${((parseInt(item.Year) - minYear) / yearRange) * 100}%`,
            }}
          >
            {item.Year}
          </div>
        ))}
      </div>
      <div className={styles.yAxis}>
        <div className={styles.yAxisLabel}>
          {Math.floor(maxPopulation / 1000000)}M
        </div>
        <div className={styles.yAxisLabel}>
          {Math.floor((maxPopulation + minPopulation) / 2000000)}M
        </div>
        <div className={styles.yAxisLabel}>
          {Math.floor(minPopulation / 1000000)}M
        </div>
      </div>
    </div>
  );
};

const Population: React.FC = () => {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === "dark";
  const darkClass = isDarkMode ? styles.darkContainer : "";

  // State for data, loading and error
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Fetch data from API
  const fetchPopulationData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      // Sort data by year to display in chronological order
      const sortedData = data.data.sort((a, b) => a["ID Year"] - b["ID Year"]);
      setPopulationData(sortedData);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopulationData();
  }, []);

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Calculate growth rate between two population values
  const calculateGrowthRate = (current: number, previous: number): number => {
    return ((current - previous) / previous) * 100;
  };

  const getGrowthBadgeColor = (rate: number): string => {
    if (rate > 1) return "success";
    if (rate > 0.5) return "informative";
    if (rate > 0) return "important";
    return "severe";
  };

  return (
    <div className={`${styles.outerContainer} ${darkClass}`}>
      {/* Begin MyApps Header */}
      <div className={styles.header}>
        <div className={styles.headerLeftSection}>
          <div className={styles.headerLeftGroup}>
            <div className={styles.headerIcon}>
              <span className={styles.iconFabric}></span>
            </div>
            <div className={styles.logoWrapper}>
              <svg
                width="108"
                height="24"
                viewBox="0 0 108 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.microsoftLogo}
              >
                <path
                  d="M44.9348 5.51695V19.2458H42.5363V8.47246H42.5043L38.2189 19.2458H36.6199L32.2386 8.47246H32.2066V19.2458H30V5.51695H33.4539L37.4194 15.6864H37.4834L41.6728 5.51695H44.9348V5.51695ZM46.9176 6.56568C46.9176 6.18432 47.0455 5.86653 47.3333 5.61229C47.6212 5.35805 47.941 5.23093 48.3247 5.23093C48.7405 5.23093 49.0922 5.35805 49.3481 5.64407C49.6039 5.89831 49.7638 6.2161 49.7638 6.59746C49.7638 6.97881 49.6359 7.29661 49.3481 7.55085C49.0603 7.80508 48.7405 7.9322 48.3247 7.9322C47.909 7.9322 47.5892 7.80508 47.3333 7.55085C47.0775 7.23305 46.9176 6.91525 46.9176 6.56568ZM49.508 9.39407V19.2458H47.1734V9.39407H49.508ZM56.5756 17.5614C56.9274 17.5614 57.3112 17.4661 57.7269 17.3072C58.1427 17.1483 58.5264 16.9258 58.8782 16.6716V18.8326C58.4945 19.0551 58.0787 19.214 57.599 19.3093C57.1193 19.4047 56.6076 19.4682 56.032 19.4682C54.5609 19.4682 53.3776 19.0233 52.4822 18.1017C51.5547 17.1801 51.107 16.0042 51.107 14.6059C51.107 13.0169 51.5867 11.714 52.5141 10.697C53.4416 9.68008 54.7528 9.17161 56.4797 9.17161C56.9274 9.17161 57.3432 9.23517 57.7909 9.33051C58.2386 9.45763 58.5904 9.58475 58.8462 9.71187V11.9364C58.4945 11.6822 58.1107 11.4597 57.7589 11.3326C57.3752 11.1737 56.9914 11.1102 56.6076 11.1102C55.6802 11.1102 54.9446 11.3962 54.369 12C53.7934 12.6038 53.5055 13.3983 53.5055 14.4153C53.5055 15.4004 53.7614 16.1949 54.305 16.7352C54.9127 17.2754 55.6482 17.5614 56.5756 17.5614ZM65.4982 9.23517C65.69 9.23517 65.8499 9.23517 66.0098 9.26695C66.1697 9.29873 66.2977 9.33051 66.3936 9.36229V11.714C66.2657 11.6186 66.1058 11.5551 65.8499 11.4597C65.6261 11.3644 65.3383 11.3326 64.9865 11.3326C64.4108 11.3326 63.9311 11.5869 63.5474 12.0636C63.1636 12.5403 62.9397 13.2712 62.9397 14.2881V19.2458H60.6052V9.39407H62.9397V10.9513H62.9717C63.1956 10.411 63.5154 9.99788 63.9311 9.68008C64.3788 9.39407 64.8905 9.23517 65.4982 9.23517ZM66.5215 14.4788C66.5215 12.8581 66.9692 11.5551 67.8967 10.6017C68.8241 9.64831 70.1033 9.17161 71.7663 9.17161C73.3014 9.17161 74.5166 9.61653 75.3801 10.5381C76.2435 11.4597 76.6913 12.6992 76.6913 14.2564C76.6913 15.8453 76.2435 17.1165 75.3161 18.0699C74.3887 19.0233 73.1415 19.5 71.5424 19.5C70.0074 19.5 68.7921 19.0551 67.8967 18.1653C66.9692 17.2436 66.5215 16.0042 66.5215 14.4788ZM68.952 14.3835C68.952 15.4004 69.1759 16.1949 69.6556 16.7352C70.1353 17.2754 70.8069 17.5614 71.6704 17.5614C72.5338 17.5614 73.1734 17.2754 73.6212 16.7352C74.0689 16.1949 74.2927 15.4004 74.2927 14.3199C74.2927 13.2712 74.0689 12.4767 73.5892 11.9364C73.1414 11.3962 72.5018 11.1419 71.6704 11.1419C70.8069 11.1419 70.1673 11.428 69.6876 12C69.1759 12.5403 68.952 13.3347 68.952 14.3835ZM80.1451 12C80.1451 12.3178 80.2411 12.6038 80.4649 12.7945C80.6888 12.9852 81.1365 13.2076 81.8721 13.4936C82.7995 13.875 83.4711 14.2881 83.8229 14.7331C84.2066 15.2097 84.3985 15.75 84.3985 16.4174C84.3985 17.339 84.0467 18.1017 83.3112 18.6419C82.6076 19.214 81.6162 19.5 80.401 19.5C79.9852 19.5 79.5375 19.4364 79.0258 19.3411C78.5141 19.2458 78.0984 19.1186 77.7466 18.9597V16.6716C78.1624 16.9576 78.6421 17.2119 79.1218 17.3708C79.6015 17.5297 80.0492 17.625 80.4649 17.625C80.9766 17.625 81.3924 17.5614 81.6162 17.4025C81.8721 17.2436 82 17.0212 82 16.6716C82 16.3538 81.8721 16.0678 81.6162 15.8771C81.3604 15.6547 80.8487 15.4004 80.1451 15.1144C79.2817 14.7648 78.674 14.3517 78.3223 13.9068C77.9705 13.4619 77.7786 12.8898 77.7786 12.1907C77.7786 11.3008 78.1304 10.5699 78.8339 9.99788C79.5375 9.42585 80.4649 9.13983 81.5843 9.13983C81.936 9.13983 82.3198 9.17161 82.7355 9.26695C83.1513 9.33051 83.5351 9.45763 83.8229 9.55297V11.7458C83.5031 11.5551 83.1513 11.3644 82.7355 11.2055C82.3198 11.0466 81.9041 10.9831 81.5203 10.9831C81.0726 10.9831 80.7208 11.0784 80.4969 11.2373C80.2731 11.4597 80.1451 11.6822 80.1451 12ZM85.3899 14.4788C85.3899 12.8581 85.8376 11.5551 86.7651 10.6017C87.6925 9.64831 88.9717 9.17161 90.6347 9.17161C92.1697 9.17161 93.385 9.61653 94.2485 10.5381C95.1119 11.4597 95.5597 12.6992 95.5597 14.2564C95.5597 15.8453 95.1119 17.1165 94.1845 18.0699C93.2571 19.0233 92.0098 19.5 90.4108 19.5C88.8758 19.5 87.6605 19.0551 86.7651 18.1653C85.8696 17.2436 85.3899 16.0042 85.3899 14.4788ZM87.8204 14.3835C87.8204 15.4004 88.0443 16.1949 88.524 16.7352C89.0037 17.2754 89.6753 17.5614 90.5387 17.5614C91.4022 17.5614 92.0418 17.2754 92.4895 16.7352C92.9373 16.1949 93.1611 15.4004 93.1611 14.3199C93.1611 13.2712 92.9373 12.4767 92.4576 11.9364C92.0098 11.3962 91.3702 11.1419 90.5387 11.1419C89.6753 11.1419 89.0357 11.428 88.556 12C88.0763 12.5403 87.8204 13.3347 87.8204 14.3835ZM103.299 11.3008H99.813V19.2458H97.4465V11.3008H95.7835V9.39407H97.4465V8.02754C97.4465 6.97881 97.7983 6.15254 98.4699 5.48517C99.1414 4.8178 100.005 4.5 101.06 4.5C101.348 4.5 101.604 4.5 101.828 4.53178C102.052 4.56356 102.244 4.59534 102.403 4.6589V6.66102C102.339 6.62924 102.18 6.56568 101.988 6.50212C101.796 6.43856 101.572 6.40678 101.316 6.40678C100.836 6.40678 100.453 6.56568 100.197 6.8517C99.941 7.16949 99.813 7.61441 99.813 8.18644V9.36229H103.299V7.13771L105.633 6.43856V9.36229H108V11.2691H105.633V15.8771C105.633 16.4809 105.729 16.9258 105.953 17.1483C106.177 17.4025 106.529 17.5297 107.009 17.5297C107.137 17.5297 107.296 17.4979 107.488 17.4343C107.68 17.3708 107.84 17.3072 108 17.2119V19.1186C107.84 19.214 107.616 19.2775 107.264 19.3411C106.913 19.4047 106.593 19.4364 106.241 19.4364C105.25 19.4364 104.514 19.1822 104.034 18.6419C103.555 18.1335 103.299 17.339 103.299 16.2903V11.3008V11.3008Z"
                  fill="#737373"
                />
                <path d="M12 12.5H23V23.5H12V12.5Z" fill="#FFB900" />
                <path d="M0 12.5H11V23.5H0V12.5Z" fill="#00A4EF" />
                <path d="M12 0.5H23V11.5H12V0.5Z" fill="#7FBA00" />
                <path d="M0 0.5H11V11.5H0V0.5Z" fill="#F25022" />
              </svg>
            </div>
            <div className={styles.headerDivider}>
              <div className={styles.dividerVertical} />
              <div className={styles.headerTitle}>
                <div className={styles.titleText}>US Population</div>
                <div className={styles.iconFabricSmall} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.searchBarContainer}>
          <div>
            <svg
              width="492"
              height="48"
              viewBox="0 0 492 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.searchBarSvg}
            >
              <g filter="url(#filter0_dd_437610_398601)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 12C12 9.79086 13.7909 8 16 8H476C478.209 8 480 9.79086 480 12V36C480 38.2091 478.209 40 476 40H16C13.7909 40 12 38.2091 12 36V12Z"
                  fill="white"
                />
              </g>
              <text
                x="56"
                y="28.4312"
                fill="#616161"
                fontFamily="Open Sans"
                fontSize="14"
                letterSpacing="0px"
                style={{ whiteSpace: "pre" }}
              >
                Search data
              </text>
              <text
                fill="#616161"
                fontFamily="Fabric MDL2 Assets"
                fontSize="16"
                letterSpacing="0px"
                style={{ whiteSpace: "pre" }}
              >
                <tspan x="28" y="32"></tspan>
              </text>
              <defs>
                <filter
                  id="filter0_dd_437610_398601"
                  x="10"
                  y="6"
                  width="472"
                  height="37"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_437610_398601"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_437610_398601"
                    result="effect2_dropShadow_437610_398601"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_437610_398601"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className={styles.headerRightSection}>
          <ThemeToggle />
          <div className={styles.headerIcon}>
            <span className={styles.iconFabric} />
          </div>
          <div className={styles.headerIcon}>
            <span className={styles.iconFabric} />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d849d8d95cc1eb6c99e8f22099bb15f966127b1"
            alt="Profile"
            className={styles.profileImage}
            width={32}
            height={32}
          />
        </div>
      </div>
      {/* End MyApps Header */}

      {/* Start Dashboard Content */}
      <div className={`${styles.container} ${darkClass}`}>
        <div className={styles.dashboardHeader}>
          <div className={styles.titleSection}>
            <Title3>US Population Dashboard</Title3>
            <Subtitle1>Data from US Census Bureau</Subtitle1>
          </div>
          <div className={styles.refreshSection}>
            <Text size={100}>Last updated: {lastUpdated}</Text>
            <Button
              appearance="subtle"
              icon={<ArrowSync24Regular />}
              onClick={fetchPopulationData}
              disabled={loading}
            >
              Refresh Data
            </Button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loaderContainer}>
            <Spinner label="Loading population data..." />
          </div>
        ) : error ? (
          <MessageBar intent="error">
            <MessageBarBody>
              Error loading data: {error}. Please try refreshing the page.
            </MessageBarBody>
          </MessageBar>
        ) : (
          <div className={styles.content}>
            <div className={styles.statsCards}>
              {populationData.length > 0 && (
                <>
                  <Card className={styles.statsCard}>
                    <CardHeader
                      header={<Text weight="semibold">Latest Population</Text>}
                    />
                    <div className={styles.cardContent}>
                      <div className={styles.statValue}>
                        {formatNumber(
                          populationData[populationData.length - 1].Population,
                        )}
                      </div>
                      <div className={styles.statLabel}>
                        people in{" "}
                        {populationData[populationData.length - 1].Year}
                      </div>
                    </div>
                  </Card>

                  {populationData.length > 1 && (
                    <Card className={styles.statsCard}>
                      <CardHeader
                        header={
                          <Text weight="semibold">
                            Growth Since First Record
                          </Text>
                        }
                      />
                      <div className={styles.cardContent}>
                        <div className={styles.statValue}>
                          {formatNumber(
                            populationData[populationData.length - 1]
                              .Population - populationData[0].Population,
                          )}
                        </div>
                        <div className={styles.statLabel}>
                          people added since {populationData[0].Year}
                        </div>
                      </div>
                    </Card>
                  )}

                  {populationData.length > 1 && (
                    <Card className={styles.statsCard}>
                      <CardHeader
                        header={
                          <Text weight="semibold">
                            Average Annual Growth Rate
                          </Text>
                        }
                      />
                      <div className={styles.cardContent}>
                        <div className={styles.statValue}>
                          {(
                            ((populationData[populationData.length - 1]
                              .Population /
                              populationData[0].Population) **
                              (1 / (populationData.length - 1)) -
                              1) *
                            100
                          ).toFixed(2)}
                          %
                        </div>
                        <div className={styles.statLabel}>
                          per year on average
                        </div>
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>

            <div className={styles.chartSection}>
              <Card className={styles.chartCard}>
                <CardHeader
                  header={
                    <Text weight="semibold">Population Growth Trend</Text>
                  }
                />
                <div className={styles.chartWrapper}>
                  <SimpleLineChart data={populationData} />
                </div>
              </Card>

              <Card className={styles.chartCard}>
                <CardHeader
                  header={<Text weight="semibold">Population by Year</Text>}
                />
                <div className={styles.chartWrapper}>
                  <SimpleBarChart data={populationData} />
                </div>
              </Card>
            </div>

            <Card className={styles.tableCard}>
              <CardHeader
                header={<Text weight="semibold">Population Data by Year</Text>}
              />
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Population</th>
                      <th>Change from Previous</th>
                      <th>Growth Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {populationData.map((item, index) => {
                      const prevPopulation =
                        index > 0 ? populationData[index - 1].Population : null;
                      const change = prevPopulation
                        ? item.Population - prevPopulation
                        : null;
                      const growthRate = prevPopulation
                        ? calculateGrowthRate(item.Population, prevPopulation)
                        : null;

                      return (
                        <tr key={item["ID Year"]}>
                          <td>{item.Year}</td>
                          <td>{formatNumber(item.Population)}</td>
                          <td>
                            {change !== null ? (
                              <span
                                className={
                                  change >= 0
                                    ? styles.positive
                                    : styles.negative
                                }
                              >
                                {change >= 0 ? "+" : ""}
                                {formatNumber(change)}
                              </span>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td>
                            {growthRate !== null ? (
                              <Badge
                                color={getGrowthBadgeColor(growthRate)}
                                appearance="outline"
                              >
                                {growthRate.toFixed(2)}%
                              </Badge>
                            ) : (
                              "N/A"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className={styles.sourceInfo}>
              <Text size={100}>
                Data source: Census Bureau via DataUSA API (https://datausa.io/)
              </Text>
            </div>
          </div>
        )}
      </div>
      {/* End Dashboard Content */}

      {/* Include required icon fonts */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Population;
