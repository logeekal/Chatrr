import React, { ReactElement, useState } from "react";

import { Room } from "../../utils/gql/models/types";
import RoomCard from "../room-card/RoomCard";
import withLoader from "./../HOC/loader/LoaderHOC";

export interface RoomListProps {
  roomList: Array<Room>;
}

export default function RoomList(props: RoomListProps): ReactElement {
  return (
    <div className="room-list-container">
      {props.roomList.map(room => (
        <RoomCard
          id={room.id}
          key={room.id}
          name={room.title}
          image={room.name}
          textClass="header-menu-primary"
          onSelect={(e: React.MouseEvent): void => {
            console.log(`${room.name} selected`);
          }}
        />
      ))}
    </div>
  );
}

// export default withLoader<RoomListProps>(RoomList, () => false);
