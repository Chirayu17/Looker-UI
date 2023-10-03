import React, { useState, createContext } from "react";
import { AuthContextValue } from "../types/Auth";
import { isAuthenticated } from "../utils/Auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
