import React, { ReactElement, useState } from "react";
import "./TextField.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /**
   * ClassName for the container of the text field.
   * this will help to override the default styles of field.
   *
   */
  className?: string;
  inputClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerProps: React.HTMLAttributes<HTMLDivElement> | any;
}

export default function TextField({
  label,
  containerProps,
  className,
  inputClassName,
  ...props
}: Props): ReactElement {
  return (
    <div className={"text-input-container " + className} {...containerProps}>
      <input
        className={"text-input " + inputClassName}
        type="text"
        {...props}
        placeholder=""
      />
      <div className={"text-input--label " + (props.value ? "" : "movable")}>
        {label}
      </div>
    </div>
  );
}
