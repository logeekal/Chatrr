import React, { useState, useEffect, useContext, Context } from "react";

import logo from "./logo.svg";
import Main from "./screens/main/Main";
import ThemeProvider, { ThemeContext } from "./state/providers/ThemeProvider";

const App: React.FC = () => {
  const { light } = useContext(ThemeContext);
  return (
    <div className={"App " + (light ? "light" : "dark")}>
      <Main />
    </div>
  );
};

const AppWithProviders: React.FC = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default AppWithProviders;
