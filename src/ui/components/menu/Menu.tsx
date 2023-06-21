import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const VuiMenu = ({ children }: Props) => {
  return <div className="vuiMenu">{children}</div>;
};
