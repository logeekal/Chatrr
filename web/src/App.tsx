import React, {
  useState,
  useEffect,
  useContext,
  Context,
  ReactElement
} from "react";

import logo from "./logo.svg";
import Main from "./screens/main/Main";
import ThemeProvider, { ThemeContext } from "./state/providers/ThemeProvider";
import { useQuery, ApolloProvider } from "@apollo/react-hooks";
import { User } from "./utils/gql/models/types";
import { AUTH } from "./utils/gql/queries/index";
import Login from "./screens/login/Login";
import { ApolloClient } from "apollo-boost";
import apolloClient from "./utils/gql/client";
import Loader from "./component/loader/Loader";
import AppStateProvider, {
  AppStateContext
} from "./state/providers/AppStateProvider";

function App(): ReactElement {
  const { light } = useContext(ThemeContext);
  return (
    <div className={"App " + (light ? "light" : "dark")}>
      {" "}
      <MainApp />
    </div>
  );
}

function MainApp(): ReactElement {
  // const [loginErrors, setLoginError] = useState<string>(set);
  const { loading, data, error, refetch } = useQuery<{ me: User }>(AUTH, {
    fetchPolicy: "no-cache"
  });

  const { state, actions } = useContext(AppStateContext);

  console.log(`Loading Main App`);
  console.log(state);
  console.log(data);
  // console.log(login);
  console.log(error);
  console.log(loading);

  useEffect(() => {
    if (data) {
      data && actions.loginUser({ ...data.me });
    }
  }, [data]);

  const handleLogin: () => void = async () => {
    console.log("handling Login value");

    const { data, errors } = await refetch();
    data && actions.loginUser({ ...data.me });
  };

  const loginPage: ReactElement = <Login onLogin={handleLogin} />;

  if (loading) {
    return <Loader size="large" />;
  }

  if (!state.loggedInUser || error) {
    return loginPage;
  }

  if (data) {
    return <Main />;
  } else {
    return loginPage;
  }

  if (!state.loggedInUser || error) {
    return loginPage;
  } else {
    return <Main />;
  }
}

const AppWithProviders: React.FC = () => {
  return (
    <ThemeProvider>
      <AppStateProvider>
        <ApolloProvider client={apolloClient as ApolloClient<any>}>
          <App />
        </ApolloProvider>
      </AppStateProvider>
    </ThemeProvider>
  );
};

export default AppWithProviders;
