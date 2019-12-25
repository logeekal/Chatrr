import React, { FunctionComponent, HTMLProps } from "react";

interface LayoutProps {
  width?: number;
}

const Layout: FunctionComponent<LayoutProps & {
  className: string;
}> = props => {
  return <div {...props}>{props.children}</div>;
};

export default Layout;
