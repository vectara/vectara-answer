import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { VuiLink } from "./Link";
describe("VuiLink", () => {
  describe("track", () => {
    it("allows referrer information when true", () => {
      const { asFragment } = render(
        <VuiLink href="https://www.vectara.com" track>
          Link
        </VuiLink>,
        { wrapper: MemoryRouter }
      );
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="vuiLink"
            href="https://www.vectara.com"
            referrerpolicy="no-referrer-when-downgrade"
            rel="noopener"
          >
            Link
          </a>
        </DocumentFragment>
      `);
    });
    it("disallows referrer information when false (default)", () => {
      const { asFragment } = render(<VuiLink href="https://www.vectara.com">Link</VuiLink>, { wrapper: MemoryRouter });
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="vuiLink"
            href="https://www.vectara.com"
            rel="noopener"
          >
            Link
          </a>
        </DocumentFragment>
      `);
    });
  });
});
