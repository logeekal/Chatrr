import React, { ReactElement } from "react";
import { getStaticFilePath } from "./../../utils/utils";

interface RoomCardProps {
  id: string;
  name: string;
  image: string;
  textClass: string;
  onSelect: (e: React.MouseEvent) => void;
}

export default function RoomCard(props: RoomCardProps): ReactElement {
  const imgPath = getStaticFilePath(props.image.toLowerCase(), "jpg");
  return (
    <div
      className={"room-card-container " + props.textClass}
      data-img={imgPath}
      onClick={props.onSelect}
      style={
        {
          "--room-card-bg-image": `url(${imgPath})`
        } as React.CSSProperties
      }
    >
      <div className="room-card-name">{props.name}</div>
    </div>
  );
}
