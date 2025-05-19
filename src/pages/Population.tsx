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
