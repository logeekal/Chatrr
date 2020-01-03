import React, { ReactElement, useState } from "react";
import TextField from "../text-field/TextField";
import { Room } from "../../utils/gql/models/types";

interface Props {
  roomList: Array<Room> | undefined;
}

export default function RoomList(props: Props): ReactElement {
  const [value, setValue] = useState<string>("");

  return <div></div>;
}
