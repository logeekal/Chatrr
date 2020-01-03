/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-empty-pattern */
import React, { ReactElement } from "react";
import Layout from "./../../component/Layout/index";
import NavigationToggle from "./../../component/navigation-toggle/NavigationToggle";
import RoomList from "../../component/room-list/RoomList";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROOMS } from "../../utils/gql/queries";
import { Room } from "../../utils/gql/models/types";

interface Props {}

export default function Rooms({}: Props): ReactElement {
  const { data, error, loading } = useQuery<{ rooms: Room[] }, {}>(GET_ROOMS);

  console.log(data);
  return (
    <Layout className="room-container">
      <Layout className="room-container--header">
        <NavigationToggle
          options={["rooms", "chats"]}
          size="large"
          optionClassNames={["header-menu-primary"]}
          onChange={(e: Event): void => {
            console.log(e);
          }}
        />
      </Layout>
      <Layout className="room-container--content">
        <RoomList roomList={data && data.rooms} />
      </Layout>
    </Layout>
  );
}
