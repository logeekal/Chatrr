import React, { ReactElement, SyntheticEvent, useState } from "react";

interface Props {
  options: [string, string];
  optionClassNames?: Array<string>;
  onChange: (e: Event) => void;
}

export default function NavigationToggle(props: Props): ReactElement {
  const [selected, setSelected] = useState(0);

  const handleChange: (e: SyntheticEvent) => void = function(e) {
    console.log(e);
    if (selected === 0) {
      setSelected(1);
    } else {
      setSelected(0);
    }
    props.onChange(e.nativeEvent);
  };

  return (
    <div className="nav-toggle-container">
      <input
        id="option1"
        type="radio"
        className="radio"
        name="nav"
        onChange={handleChange}
        checked={selected === 0 ? true : false}
      />
      <label
        htmlFor="option1"
        className={
          "option1 " +
          (props.optionClassNames && props.optionClassNames.join(" "))
        }
      >
        {props.options[0]}
      </label>
      <input
        id="option2"
        type="radio"
        className="radio"
        name="nav"
        onChange={handleChange}
        checked={selected === 1 ? true : false}
      />
      <label
        htmlFor="option2"
        className={
          "option2 " +
          (props.optionClassNames && props.optionClassNames.join(" "))
        }
      >
        {props.options[1]}
      </label>
      <div className="selected"></div>
    </div>
  );
}
