import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
