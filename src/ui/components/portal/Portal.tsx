import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

export const VuiPortal = ({ children }: Props) => {
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    portalRef.current = document.createElement("div");
    document.body.appendChild(portalRef.current);

    return () => {
      portalRef.current?.parentNode?.removeChild(portalRef.current);
    };
  }, []);

  if (!portalRef.current) return null;
  return createPortal(children, portalRef.current);
};
