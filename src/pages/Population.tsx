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
import {
  VerticalBarChart,
  IVerticalBarChartProps,
  IDataPoint,
  ILineChartDataPoint,
  LineChart,
  ILineChartPoints,
} from "@fluentui/react-charting";
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

  // Define chart theme with necessary font properties
  const chartTheme = {
    palette: {
      // Adjust colors based on theme
      neutralLighterAlt: isDarkMode ? "#3c3c3c" : "#faf9f8",
      neutralLighter: isDarkMode ? "#333333" : "#f3f2f1",
      neutralLight: isDarkMode ? "#292929" : "#edebe9",
      neutralQuaternaryAlt: isDarkMode ? "#232323" : "#e1dfdd",
      neutralQuaternary: isDarkMode ? "#1f1f1f" : "#d0d0d0",
      neutralTertiaryAlt: isDarkMode ? "#1c1c1c" : "#c8c6c4",
      neutralTertiary: isDarkMode ? "#a19f9d" : "#a19f9d",
      neutralSecondary: isDarkMode ? "#c8c6c4" : "#605e5c",
      neutralPrimaryAlt: isDarkMode ? "#dadada" : "#3b3a39",
      neutralPrimary: isDarkMode ? "#ffffff" : "#323130",
      neutralDark: isDarkMode ? "#f4f4f4" : "#201f1e",
      black: isDarkMode ? "#f8f8f8" : "#000000",
      white: isDarkMode ? "#121212" : "#ffffff",
    },
    fonts: {
      // Add required font properties
      tiny: { fontFamily: "Segoe UI, sans-serif", fontSize: "10px" },
      xSmall: { fontFamily: "Segoe UI, sans-serif", fontSize: "11px" },
      small: { fontFamily: "Segoe UI, sans-serif", fontSize: "12px" },
      medium: { fontFamily: "Segoe UI, sans-serif", fontSize: "14px" },
      mediumPlus: { fontFamily: "Segoe UI, sans-serif", fontSize: "16px" },
      large: { fontFamily: "Segoe UI, sans-serif", fontSize: "18px" },
      xLarge: { fontFamily: "Segoe UI, sans-serif", fontSize: "20px" },
      xxLarge: { fontFamily: "Segoe UI, sans-serif", fontSize: "22px" },
    },
  };

  // Prepare data for bar chart
  const prepareBarChartData = (): IVerticalBarChartProps => {
    const chartPoints: IDataPoint[] = populationData.map((item) => ({
      x: item.Year,
      y: item.Population,
      color: isDarkMode
        ? tokens.colorBrandForeground1
        : tokens.colorBrandBackground,
    }));

    return {
      chartTitle: "US Population by Year",
      data: chartPoints,
      culture: "en-US",
      height: 300,
      width: "100%",
      hideLegend: true,
      hideTooltip: false,
      enableReflow: true,
      yAxisTickFormat: (y: number) => {
        return `${(y / 1000000).toFixed(1)}M`;
      },
      tooltipProps: {
        YValueFormat: (y: number) => formatNumber(y),
      },
      theme: chartTheme,
    };
  };

  // Prepare data for line chart
  const prepareLineChartData = (): ILineChartPoints[] => {
    // Create data points for the line chart
    const linePoints: ILineChartDataPoint[] = populationData.map((item) => ({
      x: new Date(parseInt(item.Year), 0, 1),
      y: item.Population,
      data: item.Year,
    }));

    return [
      {
        legend: "Population",
        data: linePoints,
        color: isDarkMode
          ? tokens.colorBrandForeground1
          : tokens.colorBrandForeground1,
        lineOptions: {
          strokeWidth: 3,
        },
      },
    ];
  };

  const getGrowthBadgeColor = (rate: number): string => {
    if (rate > 1) return "success";
    if (rate > 0.5) return "informative";
    if (rate > 0) return "important";
    return "severe";
  };

  return (
    <div className={`${styles.container} ${darkClass}`}>
      <div className={styles.header}>
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
                      people in {populationData[populationData.length - 1].Year}
                    </div>
                  </div>
                </Card>

                {populationData.length > 1 && (
                  <Card className={styles.statsCard}>
                    <CardHeader
                      header={
                        <Text weight="semibold">Growth Since First Record</Text>
                      }
                    />
                    <div className={styles.cardContent}>
                      <div className={styles.statValue}>
                        {formatNumber(
                          populationData[populationData.length - 1].Population -
                            populationData[0].Population,
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
                header={<Text weight="semibold">Population Growth Trend</Text>}
              />
              <div className={styles.chart}>
                <LineChart
                  data={prepareLineChartData()}
                  height={300}
                  width="100%"
                  enableReflow={true}
                  yAxisTickFormat={(y: number) =>
                    `${(y / 1000000).toFixed(0)}M`
                  }
                  legendProps={{
                    allowFocusOnLegends: true,
                    styles: {
                      text: {
                        color: isDarkMode
                          ? tokens.colorNeutralForeground1
                          : tokens.colorNeutralForeground1,
                      },
                    },
                  }}
                  tickLabelFontSize={12}
                  tickParams={{
                    stroke: isDarkMode
                      ? tokens.colorNeutralForeground3
                      : tokens.colorNeutralForeground3,
                  }}
                  theme={chartTheme}
                />
              </div>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={<Text weight="semibold">Population by Year</Text>}
              />
              <div className={styles.chart}>
                <VerticalBarChart {...prepareBarChartData()} />
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
                                change >= 0 ? styles.positive : styles.negative
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
  );
};

export default Population;
