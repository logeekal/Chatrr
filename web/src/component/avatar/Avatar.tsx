import React, { ReactElement } from "react";

interface Props {
  type: "compact" | "full";
  size: number;
  image: string;
  label: string;  
}

export default function Avatar(props: Props): ReactElement {
  return (
    <div className="avatar-container">
      <img
        className="avatar-image"
        data-testid="avatar-image"
        src={props.image}
        alt={props.label}
        width={props.size}
      />
      {props.type === "full" && (
        <div data-testid="avatar-label" className="avatar-label body-primary body-em">{props.label}</div>
      )}
    </div>
  );
}
