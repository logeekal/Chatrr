import React, { ReactElement, useState } from "react";

interface Props {
  children: React.ReactFragment;
}

interface ThemeContextInterface {
  light: boolean;
  toggle: () => void;
}

export const ThemeContext: React.Context<ThemeContextInterface> = React.createContext(
  {} as ThemeContextInterface
);

export default function ThemeProvider({ children }: Props): ReactElement {
  const [light, setLightTheme] = useState<boolean>(true);

  const toggle: () => void = () => {
    // console.log(`Toggle theme from ${light} to ${!light}`);
    setLightTheme(!light);
  };

  return (
    <ThemeContext.Provider
      value={{
        light: light,
        toggle: toggle
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
