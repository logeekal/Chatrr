import React, { ReactElement } from "react";
export interface LoaderProps {
  size: "large" | "normal" | "small";
}

export default function Loader(props: LoaderProps): ReactElement {
  return <div className={"lds-hourglass " + props.size}></div>;
}
