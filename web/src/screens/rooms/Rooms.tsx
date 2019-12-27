import React, { ReactElement } from "react";
import Layout from "./../../component/Layout/index";
import NavigationToggle from "./../../component/navigation-toggle/NavigationToggle";

interface Props {}

export default function Rooms({}: Props): ReactElement {
  return (
    <Layout className="room-container">
      <Layout className="room-container--header">
        <NavigationToggle
          options={["rooms", "chats"]}
          optionClassNames={["header-menu-primary"]}
          onChange={(e: Event): void => {
            console.log(e);
          }}
        />
      </Layout>
      <Layout className="room-container--content"></Layout>
    </Layout>
  );
}
