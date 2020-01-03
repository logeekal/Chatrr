import React, { ReactElement, useState } from "react";
import MenuItem from "../menu-item/MenuItem";

export interface Props {
  menu: Array<{
    id: string;
    label: string;
    icon: string;
    action?: () => void;
  }>;
}

export default function Menu(props: Props): ReactElement {
  const [currentMenuId, setCurrentMenuId] = useState<string>(props.menu[0].id);

  /**
   * It should be menu's responsibility the Selection on the menu item changes
   * on click or on Selection of a menu Item.
   *
   * But it will not be Menu's responsibility on what happens to other components
   * on this selection
   *
   * We will call this operation select and not click
   */

  const handleSelection: (id: string) => void = (id: string) => {
    console.log(`Selecting ${id}`);
    const [{ action }] = props.menu.filter(menu => menu.id === id);
    console.log(action);
    action && action();
    setCurrentMenuId(id);
  };

  return (
    <div className="menu-container" data-testid="menu">
      {props.menu.map((menuItem, index) => {
        return (
          <MenuItem
            key={menuItem.id}
            menuItem={menuItem}
            current={menuItem.id === currentMenuId ? true : false}
            onSelect={handleSelection}
          />
        );
      })}
    </div>
  );
}
