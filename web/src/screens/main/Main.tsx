import React, {
  FunctionComponent,
  useState,
  useContext,
  SyntheticEvent
} from "react";
import Layout from "../../component/Layout";
import Avatar from "../../component/avatar/Avatar";
import Menu from "../../component/menu/Menu";
import Toggle from "../../component/toggle/Toggle";
import { ThemeContext } from "./../../state/providers/ThemeProvider";
import NavigationToggle from "../../component/navigation-toggle/NavigationToggle";
import Rooms from "../rooms/Rooms";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { LOGOUT_USER } from "./../../utils/gql/queries/index";
import { Mutation, GenericResponse } from "../../utils/gql/models/types";
import { AppStateContext } from "./../../state/providers/AppStateProvider";

const Main: FunctionComponent = props => {
  const { toggle } = useContext(ThemeContext);
  const { state, actions } = useContext(AppStateContext);
  const [logoutResponse, { data, loading, error }] = useMutation<
    { logoutResponse: GenericResponse },
    {}
  >(LOGOUT_USER);

  return (
    <div className="main-container">
      <Layout className="side">
        <Avatar
          type="full"
          label={state.loggedInUser}
          size={150}
          image="https://picsum.photos/200"
        />
        <Menu
          menu={[
            {
              id: "rooms",
              label: "rooms",
              icon: "rooms"
            },
            {
              id: "chats",
              label: "chats",
              icon: "chat"
            },
            {
              id: "profile",
              label: "profile",
              icon: "profile"
            },
            {
              id: "contactUs",
              label: "contact us",
              icon: "contact"
            },
            {
              id: "settings",
              label: "settings",
              icon: "settings"
            },
            {
              id: "signOut",
              label: "sign out",
              icon: "sign-out",
              action: async () => {
                console.log("Calling Sign out");
                const result = await logoutResponse();

                if (result.data) {
                  actions.logoutUser();
                }
              }
            }
          ]}
        />
        <div className="toggle-container">
          <Toggle leftIcon="day" rightIcon="night" onChange={toggle} />
        </div>
      </Layout>
      <Layout className="context">
        <Rooms />
      </Layout>
      <Layout className="main">Main Panel</Layout>
    </div>
  );
};

export default Main;
