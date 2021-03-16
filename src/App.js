import React, { useEffect, useContext } from "react";
import Layout from "./Layout";

import ViewportContextProvider from "./context/ViewportContext";
import DataContextProvider from "./context/DataContext";

function App() {
  return (
    <ViewportContextProvider>
      <DataContextProvider>
        <Layout />
      </DataContextProvider>
    </ViewportContextProvider>
  );
}
export default App;
