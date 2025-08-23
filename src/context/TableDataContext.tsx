import React, { useContext } from "react";

type TableDataContextType = {};

const TableDataContext = React.createContext<null | TableDataContextType>(null);

export const useTableData: TableDataContextType = () => {
  const context = useContext(TableDataContext);
  if (!context)
    throw new Error("useTableData must be used within an TableDataProvider");
  return context;
};

type ContextProviderProps = {
  children: React.ReactNode;
};

export const TableDataProvider = ({ children }: ContextProviderProps) => {
  const value = {};

  return (
    <TableDataContext.Provider value={value}>
      {children}
    </TableDataContext.Provider>
  );
};
