import { useLocation } from "react-router-dom";
import { TabSize } from "./types";
import { VuiTabs } from "./Tabs";
import { VuiTab } from "./Tab";
import { VuiSpacer } from "../spacer/Spacer";

type Props = {
  tabs: Array<{
    to: string;
    title: string;
    render?: (tabLink: React.ReactNode) => React.ReactNode;
    component: React.ReactNode;
    testId?: string;
  }>;
  size?: TabSize;
  sideContent?: React.ReactNode;
  children?: React.ReactNode;
};

export const VuiTabbedRoutes = ({ tabs, size, sideContent, children }: Props) => {
  const location = useLocation();

  return (
    <>
      <VuiTabs append={sideContent} size={size}>
        {tabs.map(({ to, title, render, testId }, index) => {
          const tabLink = (
            <VuiTab key={index} to={to} isActive={location.pathname.includes(to)} data-testid={testId}>
              {title}
            </VuiTab>
          );
          if (render) return render(tabLink);
          return tabLink;
        })}
      </VuiTabs>

      <VuiSpacer size="m" />

      {children}
    </>
  );
};
