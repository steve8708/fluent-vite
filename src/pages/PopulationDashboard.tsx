import React, { useState, useEffect } from "react";
import {
  LineChart,
  IChartProps,
  DataVizPalette,
  VerticalBarChart,
  IVerticalBarChartDataPoint,
  getColorFromToken,
} from "@fluentui/react-charting";
import {
  Spinner,
  Text,
  Title3,
  Card,
  CardHeader,
  Button,
  Dropdown,
  Option,
  useId,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import { useTheme } from "../theme/ThemeProvider";
import styles from "./PopulationDashboard.module.css";

interface PopulationData {
  "ID Nation": string;
  Nation: string;
  "ID Year": string;
  Year: string;
  Population: number;
  "Slug Nation": string;
}

interface ApiResponse {
  data: PopulationData[];
  source: any[];
}

const PopulationDashboard: React.FC = () => {
  const [data, setData] = useState<PopulationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("all");
  const [displayMode, setDisplayMode] = useState<"line" | "bar">("line");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<PopulationData | null>(null);

  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";
  const dialogId = useId("detail-dialog");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        // Sort data by year (ascending)
        const sortedData = result.data.sort(
          (a, b) => parseInt(a.Year) - parseInt(b.Year),
        );

        setData(sortedData);
        setError(null);
      } catch (err) {
        setError(
          `Failed to fetch population data: ${err instanceof Error ? err.message : String(err)}`,
        );
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on selected time frame
  const getFilteredData = () => {
    if (selectedTimeFrame === "all" || data.length === 0) {
      return data;
    }

    const years = parseInt(selectedTimeFrame);
    const currentYear = new Date().getFullYear();
    return data.filter((item) => parseInt(item.Year) >= currentYear - years);
  };

  const filteredData = getFilteredData();

  // Calculate statistics
  const getStatistics = () => {
    if (filteredData.length === 0)
      return { latest: 0, oldest: 0, growth: 0, avgGrowth: 0 };

    const latest = filteredData[0].Population;
    const oldest = filteredData[filteredData.length - 1].Population;
    const totalGrowth = latest - oldest;
    const growthPercentage = ((latest - oldest) / oldest) * 100;
    const yearCount = filteredData.length - 1 || 1;
    const avgAnnualGrowth = growthPercentage / yearCount;

    return {
      latest,
      oldest,
      growth: totalGrowth,
      growthPercentage,
      avgGrowth: avgAnnualGrowth,
    };
  };

  const stats = getStatistics();

  // Format numbers for display
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Format percentage
  const formatPercentage = (num: number) => {
    return num.toFixed(2) + "%";
  };

  // Prepare data for line chart
  const getLineChartData = (): IChartProps => {
    return {
      chartTitle: "US Population Growth",
      lineChartData: [
        {
          legend: "US Population",
          data: filteredData.map((item) => ({
            x: new Date(item.Year),
            y: item.Population,
            onDataPointClick: () => {
              setSelectedYear(item);
              setShowDetails(true);
            },
          })),
          color: DataVizPalette.color1,
          lineOptions: {
            lineBorderWidth: "3",
          },
        },
      ],
    };
  };

  // Prepare data for bar chart
  const getBarChartData = (): IVerticalBarChartDataPoint[] => {
    return filteredData.map((item, index) => ({
      x: parseInt(item.Year),
      y: item.Population,
      legend: item.Year,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: item.Year,
      yAxisCalloutData: formatNumber(item.Population),
      onDataPointClick: () => {
        setSelectedYear(item);
        setShowDetails(true);
      },
    }));
  };

  const handleTimeFrameChange = (
    event: React.SyntheticEvent,
    data: { selectedOptions: string[] },
  ) => {
    setSelectedTimeFrame(data.selectedOptions[0]);
  };

  const toggleDisplayMode = () => {
    setDisplayMode((prev) => (prev === "line" ? "bar" : "line"));
  };

  if (isLoading) {
    return (
      <div
        className={`${styles.loadingContainer} ${isDark ? styles.darkContainer : ""}`}
      >
        <Spinner size="large" label="Loading US population data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${styles.errorContainer} ${isDark ? styles.darkContainer : ""}`}
      >
        <Text as="h2" size={600} weight="semibold">
          Error
        </Text>
        <Text>{error}</Text>
        <Button appearance="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${isDark ? styles.darkContainer : ""}`}
    >
      <div className={styles.header}>
        <Title3 as="h1">United States Population Dashboard</Title3>
        <div className={styles.controls}>
          <Dropdown
            placeholder="Select time frame"
            value={selectedTimeFrame}
            onOptionSelect={handleTimeFrameChange}
          >
            <Option value="all">All available data</Option>
            <Option value="5">Last 5 years</Option>
            <Option value="10">Last 10 years</Option>
            <Option value="20">Last 20 years</Option>
          </Dropdown>
          <Button appearance="secondary" onClick={toggleDisplayMode}>
            Show as {displayMode === "line" ? "Bar Chart" : "Line Chart"}
          </Button>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <Card className={styles.statCard}>
          <CardHeader
            header={<Text weight="semibold">Latest Population</Text>}
          />
          <Text size={600} className={styles.statValue}>
            {formatNumber(stats.latest)}
          </Text>
          <Text size={200}>
            Most recent year:{" "}
            {filteredData.length > 0 ? filteredData[0].Year : "N/A"}
          </Text>
        </Card>

        <Card className={styles.statCard}>
          <CardHeader header={<Text weight="semibold">Total Growth</Text>} />
          <Text size={600} className={styles.statValue}>
            {stats.growth > 0 ? "+" : ""}
            {formatNumber(stats.growth)}
          </Text>
          <Text size={200}>
            {formatPercentage(stats.growthPercentage)} over{" "}
            {filteredData.length} years
          </Text>
        </Card>

        <Card className={styles.statCard}>
          <CardHeader
            header={<Text weight="semibold">Avg. Annual Growth</Text>}
          />
          <Text size={600} className={styles.statValue}>
            {formatPercentage(stats.avgGrowth)}
          </Text>
          <Text size={200}>Per year on average</Text>
        </Card>
      </div>

      <Card className={styles.chartCard}>
        <CardHeader
          header={
            <Text weight="semibold">
              Population Trend (
              {displayMode === "line" ? "Line Chart" : "Bar Chart"})
            </Text>
          }
        />
        <div className={styles.chartContainer}>
          {displayMode === "line" ? (
            <LineChart
              culture={window.navigator.language}
              data={getLineChartData()}
              height={400}
              width={800}
              enablePerfOptimization={true}
              yAxisTitle="Population"
              xAxisTitle="Year"
              legendsOverflowText={"Overflow Items"}
              enableReflow={true}
            />
          ) : (
            <VerticalBarChart
              culture={window.navigator.language}
              chartTitle="US Population by Year"
              data={getBarChartData()}
              height={400}
              width={800}
              yAxisTitle="Population"
              xAxisTitle="Year"
              enableReflow={true}
            />
          )}
        </div>
      </Card>

      <div className={styles.infoSection}>
        <Text as="h2" size={500} weight="semibold">
          About This Dashboard
        </Text>
        <Text>
          This dashboard visualizes the United States population data from the
          DataUSA API. The data shows population trends over the years, allowing
          you to analyze growth patterns and demographic changes. You can select
          different time frames and view the data as either a line chart or a
          bar chart.
        </Text>
        <Text>
          Click on any data point to see detailed information for a specific
          year.
        </Text>
      </div>

      <Dialog open={showDetails}>
        <DialogSurface id={dialogId}>
          <DialogBody>
            <DialogTitle>Population Details: {selectedYear?.Year}</DialogTitle>
            <DialogContent>
              <div className={styles.detailsContent}>
                <Text as="h3" size={400} weight="semibold">
                  United States
                </Text>
                <Text as="p">
                  Population:{" "}
                  {selectedYear ? formatNumber(selectedYear.Population) : "N/A"}
                </Text>
                {selectedYear && filteredData.length > 1 && (
                  <>
                    <Text
                      as="h3"
                      size={400}
                      weight="semibold"
                      className={styles.detailHeader}
                    >
                      Year-over-Year Comparison
                    </Text>
                    {filteredData.findIndex(
                      (item) => item.Year === selectedYear.Year,
                    ) <
                      filteredData.length - 1 && (
                      <div className={styles.comparisonRow}>
                        <Text>Previous year:</Text>
                        <Text>
                          {(() => {
                            const currentIndex = filteredData.findIndex(
                              (item) => item.Year === selectedYear.Year,
                            );
                            if (currentIndex < filteredData.length - 1) {
                              const previousData =
                                filteredData[currentIndex + 1];
                              const change =
                                selectedYear.Population -
                                previousData.Population;
                              const percentChange =
                                (change / previousData.Population) * 100;
                              return `${formatNumber(previousData.Population)} (${change > 0 ? "+" : ""}${formatNumber(change)}, ${percentChange.toFixed(2)}%)`;
                            }
                            return "N/A";
                          })()}
                        </Text>
                      </div>
                    )}
                    {filteredData.findIndex(
                      (item) => item.Year === selectedYear.Year,
                    ) > 0 && (
                      <div className={styles.comparisonRow}>
                        <Text>Next year:</Text>
                        <Text>
                          {(() => {
                            const currentIndex = filteredData.findIndex(
                              (item) => item.Year === selectedYear.Year,
                            );
                            if (currentIndex > 0) {
                              const nextData = filteredData[currentIndex - 1];
                              const change =
                                nextData.Population - selectedYear.Population;
                              const percentChange =
                                (change / selectedYear.Population) * 100;
                              return `${formatNumber(nextData.Population)} (${change > 0 ? "+" : ""}${formatNumber(change)}, ${percentChange.toFixed(2)}%)`;
                            }
                            return "N/A";
                          })()}
                        </Text>
                      </div>
                    )}
                  </>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance="secondary"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default PopulationDashboard;
