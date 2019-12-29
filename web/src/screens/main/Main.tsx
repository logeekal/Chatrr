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

const Main: FunctionComponent = props => {
  const { toggle } = useContext(ThemeContext);

  return (
    <div className="main-container">
      <Layout className="side">
        <Avatar
          type="full"
          label="hellofaster"
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
              icon: "sign-out"
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
