import React, { ReactElement } from "react";

interface Props {
  roomList: Array<{
    id: string;
    label: string;
  }>;
}

export default function RoomList(props: Props): ReactElement {
  return <div></div>;
}
