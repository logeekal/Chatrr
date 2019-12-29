import React, { ReactElement, SyntheticEvent } from "react";
import { ReactSVG } from "react-svg";
import { getStaticFilePath } from "./../../utils/utils";

export interface Props {
  menuItem: {
    id: string;
    label: string;
    icon: string;
  };
  current: boolean;
  onSelect: (id: string) => void;
}

export default function MenuItem(props: Props): ReactElement {
  return (
    <div
      className={
        "menu-item-container header-menu-secondary " +
        (props.current ? "selected" : "")
      }
      data-testid="menu-item"
      onClick={(e: SyntheticEvent): void => {
        props.onSelect(props.menuItem.id);
      }}
    >
      <span className="menu-item--icon">
        <ReactSVG
          className="icon-wrapper"
          src={getStaticFilePath(props.menuItem.icon, "svg")}
        />
      </span>
      <span className="menu-item--label" data-testid={props.menuItem.id}>
        {props.menuItem.label}
      </span>
    </div>
  );
}
