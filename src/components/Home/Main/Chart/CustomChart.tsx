import React from "react";
import "./ChartSetup";
import {
  ChartDataset,
  CoreChartOptions,
  ParsingOptions,
  PluginChartOptions,
  ScaleChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import { DeepPartial } from "chart.js/dist/types/utils";
import { InterpretQueryResponse } from "../../../../types/ApiResponse";
import { getDatasets } from "../../../../utils/Api";

const chartSupportConfig = ["line", "pie", "bar"] as const;
type SupportedCharts = (typeof chartSupportConfig)[number];

type CustomChartProps = {
  responseData: InterpretQueryResponse;
};

const CustomChart = ({ responseData }: CustomChartProps) => {
  const theme = useTheme();
  const type: SupportedCharts = responseData.chartType as SupportedCharts;
  const datasetOptions: Partial<ChartDataset<SupportedCharts>> = {
    borderColor: theme.palette.success.main,
    fill: true,
    tension: 0.2,
  };
  const coreChartOptions: Partial<CoreChartOptions<SupportedCharts>> = {
    responsive: true,
  };
  const pluginChartOptions: DeepPartial<PluginChartOptions<SupportedCharts>> = {
    plugins: {
      title: {
        display: true,
        text: responseData.title ?? "",
      },
    },
  };
  const scaleChartOptions: DeepPartial<ScaleChartOptions<SupportedCharts>> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
      },
    },
  };
  const parsingChartOptions: ParsingOptions = {
    parsing: {
      xAxisKey: responseData.attributes.x,
      yAxisKey: responseData.attributes.y,
    },
    normalized: true,
  };

  const datasets = getDatasets(responseData);
  datasets.map((dataset) => ({ ...dataset, ...datasetOptions }));

  // TODO: Remove this logic later, get it from API
  const chartOptions =
    responseData.chartType === "bar"
      ? {
          ...coreChartOptions,
          ...pluginChartOptions,
          ...parsingChartOptions,
        }
      : {
          ...coreChartOptions,
          ...pluginChartOptions,
          ...scaleChartOptions,
          ...parsingChartOptions,
        };
  return (
    <Chart
      type={type}
      data={{
        datasets,
      }}
      options={chartOptions}
    />
  );
};
export default CustomChart;
