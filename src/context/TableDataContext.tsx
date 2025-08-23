import React, { useContext, useState } from "react";
import useLogin from "../hooks/useLogin";
import useAccessToken from "../hooks/useAccessToken";

type TableDataContextType = {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

const TableDataContext = React.createContext<null | TableDataContextType>(null);

export const useTableData = (): TableDataContextType => {
  const context = useContext(TableDataContext);
  if (!context)
    throw new Error("useTableData must be used within an TableDataProvider");
  return context;
};

type ContextProviderProps = {
  children: React.ReactNode;
};

export const TableDataProvider = ({children}: ContextProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const {
    loginUser: loginFn,
    loading: loginLoading,
    error: loginError,
  } = useLogin();
  const {
    fetchAccessToken,
    loading: tokenLoading,
    error: tokenError,
  } = useAccessToken();

  async function login(username: string, pass: string) {
    const refresh = await loginFn(username, pass);
    if (refresh) {
      const access = await fetchAccessToken(refresh);
      if (access) setAccessToken(access);
    }
  }

  const value = {
    accessToken,
    login,
    loading: loginLoading || tokenLoading,
    error: loginError || tokenError,
  };

  return (
    <TableDataContext.Provider value={value}>
      {children}
    </TableDataContext.Provider>
  );
};
