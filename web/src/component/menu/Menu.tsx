import React, { ReactElement } from "react";
import MenuItem from "../menu-item/MenuItem";

interface Props {
  menu: Array<{
    id: string;
    label: string;
    icon: string;
  }>;
}

export default function Menu(props: Props): ReactElement {
  return (
    <div className="menu-container">
      {props.menu.map((menuItem, index) => {
        return (
          <MenuItem
            key={menuItem.id}
            menuItem={menuItem}
            current={index === 0 ? true : false}
          />
        );
      })}
    </div>
  );
}
