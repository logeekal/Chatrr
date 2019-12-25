import React, { ReactElement } from "react";
import MenuItem from "../menu-item/MenuItem";

interface Props {
  menu: Array<{
    id: string;
    label: string;
  }>;
}

export default function Menu(props: Props): ReactElement {
  return (
    <div className="menu-container">
      {props.menu.map((menuItem, index) => {
        return (
          <MenuItem
            key={menuItem.id}
            label={menuItem.label}
            current={index === 0 ? true : false}
          />
        );
      })}
    </div>
  );
}
