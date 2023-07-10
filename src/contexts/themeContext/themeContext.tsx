import React, { ReactNode, createContext, useState } from "react";
export type UniThemeKeyTypes = "primary" | "secondary" | "info";
type ThemeContextInterface = {
  uniForTheme: UniThemeKeyTypes;
  setTheme: (arg0: UniThemeKeyTypes) => void;
  currUni: string;
  setUni: (arg0: string) => void;
};
const defaultContext = {
  uniForTheme: "primary" as UniThemeKeyTypes, //idk why it throws error without "as UniThemeKeyTypes"
  setTheme: (theme: UniThemeKeyTypes) => {},
  currUni: "",
  setUni: (theme: string) => {},
};
export const ThemeContext =
  createContext<ThemeContextInterface>(defaultContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [uniForTheme, setUniForTheme] = useState<UniThemeKeyTypes>("primary");
  const [currUni, setCurrUni] = useState<string>("Freeuni");
  const setTheme = (theme: UniThemeKeyTypes) => {
    setUniForTheme(theme);
  };
  const setUni = (uni: string) => {
    setCurrUni(uni);
  };

  const value = {
    uniForTheme,
    currUni,
    setUni,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
