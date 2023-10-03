import { QueryHistory } from "../types/History";

export const mockQueryHistory: QueryHistory[] = [
  {
    query: "Mock Query 1",
    time: new Date("10-05-2023"),
  },
  {
    query: "Mock Query 2",
    time: new Date("12-05-2023"),
  },
  {
    query: "Mock Query 3",
    time: new Date("15-05-2023"),
  },
  {
    query: "Mock Query 4",
    time: new Date("18-06-2023"),
  },
  {
    query: "Really long query here with multiple lines",
    time: new Date("23-06-2023"),
  },
];
