import React, { ReactElement } from "react";
import { getStaticFilePath } from "./../../utils/utils";

interface RoomCardProps {
  id: string;
  name: string;
  image: string;
  textClass: string;
  active: boolean;
  /**
   * onExit is triggered when user has selected a room, and presses back.
   * It should show complete room list, event though user has not exited that room.
   */
  onExit?: () => void;
  onSelect: (e: React.MouseEvent) => void;
}

export default function RoomCard(props: RoomCardProps): ReactElement {
  const imgPath = getStaticFilePath(props.image.toLowerCase(), "jpg");
  return (
    <div
      className={"room-card-container " + props.textClass}
      data-img={imgPath}
      onClick={!props.active ? props.onSelect : (): void => {}}
      style={
        {
          "--room-card-bg-image": `url(${imgPath})`
        } as React.CSSProperties
      }
    >
      {props.active && (
        <div className="room-card-navigator">
          <img
            src={getStaticFilePath("back", "png")}
            alt="back"
            onClick={props.onExit}
          />
        </div>
      )}
      <div className="room-card-name">{props.name}</div>
    </div>
  );
}
