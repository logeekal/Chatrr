import React, { ReactElement, useState } from "react";
import "./TextField.scss";

interface Props {
  label: string;
  className?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function TextField({
  label,
  inputProps,
  className,
  ...props
}: Props): ReactElement {
  return (
    <div className={"text-input-container " + className} {...props}>
      <input
        className="text-input"
        type="text"
        {...inputProps}
        placeholder=""
      />
      <div
        className={"text-input--label " + (inputProps.value ? "" : "movable")}
      >
        {label}
      </div>
    </div>
  );
}
