import React, { useEffect, useContext } from "react";

import AppDesktop from "./components/appDesktop";
import AppMobil from "./components/appMobil";

import { ViewportContext } from "./context/ViewportContext";

const BREAKPOINT = 768;

function Layout() {
  const { isMobile, setIsMobile } = useContext(ViewportContext);

  useEffect(() => {
    const handleWindowResize = () => {
      window.innerWidth < BREAKPOINT ? setIsMobile(true) : setIsMobile(false);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [setIsMobile]);

  return (
    <React.Fragment>{isMobile ? <AppMobil /> : <AppDesktop />}</React.Fragment>
  );
}
export default Layout;
