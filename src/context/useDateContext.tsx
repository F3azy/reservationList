import React, { useContext, useState } from "react";

type DateContextType = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateContext = React.createContext<null | DateContextType>(null);

export const useDate = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) throw new Error("useDate must be used within an AuthProvider");
  return context;
};

type ContextProviderProps = {
  children: React.ReactNode;
};

export const DateProvider = ({ children }: ContextProviderProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [date, setDate] = useState<Date>(today);

  const value = {
    date,
    setDate,
  };

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
