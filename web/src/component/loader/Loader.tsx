import React, { ReactElement } from "react";
interface Props {
  size: "large" | "normal" | "small";
}

export default function Loader(props: Props): ReactElement {
  return <div className={"lds-hourglass " + props.size}></div>;
}
