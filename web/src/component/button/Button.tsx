import React, { ReactElement } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance: "primary" | "secondary";
  size: "normal" | "small";
  containerClass: string;
}

export default function Button({
  appearance,
  size,
  containerClass,
  ...props
}: Props): ReactElement {
  return (
    <div className={`button-container body-hint ${containerClass}`}>
      <button className={`button body-hint ${appearance} ${size}`} {...props}>
        {props.children}
      </button>
    </div>
  );
}
