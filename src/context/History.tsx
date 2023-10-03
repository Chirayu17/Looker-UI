import React, { createContext } from "react";
import useHistory from "../hooks/useHistory";
import { HistoryService } from "../types/History";

export const HistoryContext = createContext<Partial<HistoryService>>({
  history: [],
  showHistory: true,
});

export const HistoryProvider = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const historyService = useHistory();
  return (
    <HistoryContext.Provider value={historyService}>
      {children}
    </HistoryContext.Provider>
  );
};
