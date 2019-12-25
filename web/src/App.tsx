import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import Main from "./screens/main/Main";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  function makeDark() {
    console.log("making dark");
    setTheme("dark");
    const rootElement: any = document.querySelector(":root");

    rootElement.style.setProperty("--current-theme", "dark");
  }

  function makeLight() {
    console.log("making light");
    setTheme("light");
    const rootElement: any = document.querySelector(":root");

    rootElement.style.setProperty("--current-theme", "light-theme");
  }

  return (
    <div className={"App " + theme}>
      <Main />
    </div>
  );
};

export default App;
