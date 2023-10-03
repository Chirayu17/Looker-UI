import { useState } from "react";
import { mockQueryHistory } from "../mock/queryHistory";
import { HistoryService, QueryHistory } from "../types/History";

const useHistory = (): HistoryService => {
  // TODO: Replace mock with data from local storage
  const [history, setHistory] = useState<QueryHistory[]>(
    mockQueryHistory ?? []
  );
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const toggleHistoryView = () => setShowHistory(!showHistory);
  const addHistoryItem = (query: QueryHistory) => {
    setHistory([query, ...history]);
  };
  const clearAll = () => setHistory([]);
  const removeHistoryItem = (item: QueryHistory) =>
    setHistory(history.filter((history) => history !== item));

  return {
    history,
    showHistory,
    toggleHistoryView,
    addHistoryItem,
    removeHistoryItem,
    clearAll,
  };
};
export default useHistory;
