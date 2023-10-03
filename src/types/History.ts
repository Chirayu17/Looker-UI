export type QueryHistory = {
  query: string;
  time: Date;
};

export type HistoryService = {
  history: QueryHistory[];
  showHistory: boolean;
  toggleHistoryView: () => void;
  addHistoryItem: (query: QueryHistory) => void;
  removeHistoryItem: (item: QueryHistory) => void;
  clearAll: () => void;
};
