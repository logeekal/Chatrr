import React, { ReactElement } from "react";
import "./style.scss";
import { ReactSVG } from "react-svg";
import { getStaticFilePath } from "./../../utils/utils";

interface Props {
  leftIcon?: string;
  rightIcon?: string;
  onChange: () => void;
}

export default function Toggle(props: Props): ReactElement {
  return (
    <React.Fragment>
      {props.leftIcon && (
        <ReactSVG
          className="left"
          src={getStaticFilePath(props.leftIcon, "svg")}
        />
      )}
      <input
        id="toggle"
        className="tgl"
        type="checkbox"
        onChange={props.onChange}
      ></input>
      <label htmlFor="toggle" className="tgl-btn">
        {" "}
      </label>
      {props.rightIcon && (
        <ReactSVG
          className="right"
          src={getStaticFilePath(props.rightIcon, "svg")}
        />
      )}
    </React.Fragment>
  );
}
