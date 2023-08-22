import { Sections } from "../types";
import { VuiAppSideNavLink } from "./AppSideNavLink";

export const buildSections = (sections: Sections) => {
  return (
    <div className="vuiAppSideNavSections">
      {sections.map(({ name, pages }) => {
        const renderedPages = pages.map(({ name, path }) => (
          <VuiAppSideNavLink key={path ?? name} path={path} name={name} />
        ));

        return (
          <VuiAppSideNavSection key={name} name={name}>
            {renderedPages}
          </VuiAppSideNavSection>
        );
      })}
    </div>
  );
};

type Props = {
  name: string;
  children: React.ReactNode;
};

const VuiAppSideNavSection = ({ name, children }: Props) => {
  return (
    <div className="vuiAppSideNavSection" key={name}>
      <div className="vuiAppSideNavSection__title">{name}</div>
      <div className="vuiAppSideNavSection__items">{children}</div>
    </div>
  );
};
