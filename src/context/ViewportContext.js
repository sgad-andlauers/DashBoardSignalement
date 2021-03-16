import React, { useState, createContext } from "react";

export const ViewportContext = createContext();

const ViewportContextProvider = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <ViewportContext.Provider value={{ isMobile, setIsMobile }}>
      {props.children}
    </ViewportContext.Provider>
  );
};

export default ViewportContextProvider;
