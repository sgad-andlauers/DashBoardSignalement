import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import _ from "lodash";
import AppDesktop from "./components/appDesktop";
import AppMobil from "./components/appMobil";
const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};

const MobileComponent = () => <AppMobil />;
const DesktopComponent = () => <AppDesktop />;

const MyComponent = () => {
  const { width } = useViewport();
  const breakpoint = 768;

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};
const api = {
  url: "https://randomuser.me/api/"
};
export default function App() {
  return (
    <ViewportProvider>
      <MyComponent />
    </ViewportProvider>
  );
}
