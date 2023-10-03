import { ChartTypeRegistry } from "chart.js";

type QueryData = Record<string, any>;
type Attributes = {
  x: string;
  y: string;
  groupby?: string;
};
export type InterpretQueryResponse = {
  generatedSqlQuery: string;
  chartType: keyof ChartTypeRegistry;
  attributes: Attributes;
  resultData: QueryData[];
  title?: string;
};
