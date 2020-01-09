/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-empty-pattern */
import React, { ReactElement } from "react";
import Layout from "./../../component/Layout/index";
import NavigationToggle from "./../../component/navigation-toggle/NavigationToggle";
import RoomList from "../room-list/RoomList";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROOMS } from "../../utils/gql/queries";
import { Room } from "../../utils/gql/models/types";
import { useContext } from "react";
import { AppStateContext } from "./../../state/providers/AppStateProvider";
import withLoader from "../../component/HOC/loader/LoaderHOC";
import { RoomListProps } from "../room-list/RoomList";
import { useEffect } from "react";

interface Props {}

export default function Rooms({}: Props): ReactElement {
  const { state, actions } = useContext(AppStateContext);
  const { data, error, loading } = useQuery<{ rooms: Room[] }, {}>(GET_ROOMS, {
    fetchPolicy: "cache-first",
    onCompleted: ({ rooms }) => {
      actions.saveRooms(rooms);
    }
  });

  const roomListLoadCondition = (): boolean => {
    return Object.keys(state.allRooms).length === 0;
  };

  const RoomListWithLoader = withLoader<RoomListProps>(
    RoomList,
    roomListLoadCondition,
    {
      size: "large"
    }
  );

  const menus: [string, string] = ["rooms", "chats"];

  console.log(data);
  return (
    <Layout className="room-container">
      <Layout className="room-container--header">
        <NavigationToggle
          options={menus}
          size="large"
          optionClassNames={["header-menu-primary"]}
          onChange={(e): void => {
            console.log(e);
            actions.updateContextMenu(e.id === "option2" ? menus[1] : menus[0]);
          }}
        />
      </Layout>
      <Layout className="room-container--content">
        {state.context.component === "rooms" ? (
          <React.Fragment>
            <RoomListWithLoader roomList={Object.values(state.allRooms)} />
          </React.Fragment>
        ) : (
          <div>Chat screen</div>
        )}
      </Layout>
    </Layout>
  );
}
