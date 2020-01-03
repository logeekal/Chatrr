import React, { ReactElement } from "react";
import "./style.scss";
import { ReactSVG } from "react-svg";
import { getStaticFilePath } from "./../../utils/utils";

export interface ToggleProps {
  leftIcon?: string;
  rightIcon?: string;
  appearance?: "normal" | "small" | "x-small";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Toggle(props: ToggleProps): ReactElement {
  return (
    <React.Fragment>
      {props.leftIcon && (
        <React.Fragment>
          <ReactSVG
            className="left"
            data-testid="left"
            // afterInjection={(error, svg) => {
            //   if (error) {
            //     console.log(error);
            //     throw new Error("Cannot find svg : " + props.leftIcon);
            //   }
            // }}
            src={getStaticFilePath(props.leftIcon, "svg")}
          />
        </React.Fragment>
      )}
      <input
        id="toggle"
        className="tgl"
        type="checkbox"
        data-testid="toggle"
        onChange={props.onChange}
      ></input>
      <label
        htmlFor="toggle"
        className={"tgl-btn " + props.appearance}
        data-testid="toggle-action"
      >
        {" "}
      </label>
      {props.rightIcon && (
        <ReactSVG
          className="right"
          data-testid="right"
          src={getStaticFilePath(props.rightIcon, "svg")}
        />
      )}
    </React.Fragment>
  );
}
