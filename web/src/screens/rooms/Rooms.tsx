/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-empty-pattern */
import React, { ReactElement } from "react";
import Layout from "./../../component/Layout/index";
import NavigationToggle from "./../../component/navigation-toggle/NavigationToggle";
import RoomList from "../../component/room-list/RoomList";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROOMS } from "../../utils/gql/queries";
import { Room } from "../../utils/gql/models/types";
import Loader from "../../component/loader/Loader";
import { useContext } from "react";
import { AppStateContext } from "./../../state/providers/AppStateProvider";
import withLoader from "../../component/HOC/loader/LoaderHOC";
import { RoomListProps } from "./../../component/room-list/RoomList";

interface Props {}

export default function Rooms({}: Props): ReactElement {
  const { state, actions } = useContext(AppStateContext);
  const { data, error, loading } = useQuery<{ rooms: Room[] }, {}>(GET_ROOMS, {
    fetchPolicy: "cache-first",
    onCompleted: ({ rooms }) => {
      actions.saveRooms(rooms);
    }
  });

  const roomListLoadCondition = () => {
    return Object.keys(state.allRooms).length > 0;
  };

  const RoomListWithLoader = withLoader<RoomListProps>(
    RoomList,
    roomListLoadCondition,
    {
      size: "large"
    }
  );

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
        <RoomListWithLoader roomList={Object.values(state.allRooms)} />
        <div className="room-container--member-list"></div>
      </Layout>
    </Layout>
  );
}
