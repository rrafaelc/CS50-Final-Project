import React, { createContext, useCallback, useContext, useState } from "react";

interface DimensionContextData {
  width: number;
  setWidth: (val: number) => void;
}

interface Props {
  children: React.ReactNode;
}

const DimensionContext = createContext<DimensionContextData>(
  {} as DimensionContextData,
);

const DimensionProvider = ({ children }: Props) => {
  const [widthValue, setWidthValue] = useState(0);

  const setWidth = useCallback((val: number) => {
    setWidthValue(val);
  }, []);

  return (
    <DimensionContext.Provider
      value={{
        width: widthValue,
        setWidth,
      }}
    >
      {children}
    </DimensionContext.Provider>
  );
};

const useDimension = (): DimensionContextData => {
  const context = useContext(DimensionContext);
  if (!context) {
    throw new Error("useContext must be used within an DimensionProvider");
  }

  return context;
};

export { DimensionProvider, useDimension };
