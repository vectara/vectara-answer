import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { VuiSearchResult } from "./SearchResult";

describe("VuiSearchResult", () => {
  describe("renders", () => {
    test("all props", () => {
      const { asFragment } = render(
        <VuiSearchResult
          result={{
            title: "title",
            url: "url",
            date: "date",
            snippet: { pre: "pre", text: "text", post: "" },
          }}
          position={1}
          subTitle={<div>subTitle</div>}
          className="customClass"
          snippetProps={{
            className: "snippetCustomClass",
          }}
        >
          <div>children</div>
        </VuiSearchResult>,
        { wrapper: MemoryRouter }
      );

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSearchResult customClass"
          >
            <div
              class="vuiSearchResultPosition"
            >
              1
            </div>
            <a
              class="vuiLink vuiTitle vuiTitle--s vuiTitle--left"
              href="/url#:~:text=text"
              target="_blank"
            >
              <h3>
                title
              </h3>
            </a>
            <div
              class="vuiSpacer vuiSpacer--xs"
            />
            <div>
              subTitle
            </div>
            <div
              class="vuiText vuiText--s vuiText--left snippetCustomClass"
            >
              <p>
                <span
                  class="vuiTextColor vuiTextColor--subdued"
                >
                  date — 
                </span>
                pre 
                <strong>
                  text
                </strong>
                 
              </p>
            </div>
            <div
              class="vuiSpacer vuiSpacer--s"
            />
            <div>
              children
            </div>
          </div>
        </DocumentFragment>
      `);
    });

    test("missing optional props", () => {
      const { asFragment } = render(
        <VuiSearchResult
          result={{ snippet: { pre: "pre", text: "text", post: "" } }}
          position={1}
        >
          <div>children</div>
        </VuiSearchResult>,
        { wrapper: MemoryRouter }
      );

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSearchResult"
          >
            <div
              class="vuiSearchResultPosition"
            >
              1
            </div>
            <div
              class="vuiText vuiText--s vuiText--left"
            >
              <p>
                pre 
                <strong>
                  text
                </strong>
                 
              </p>
            </div>
            <div
              class="vuiSpacer vuiSpacer--s"
            />
            <div>
              children
            </div>
          </div>
        </DocumentFragment>
      `);
    });

    test("has title but missing url", () => {
      const { asFragment } = render(
        <VuiSearchResult
          result={{
            title: "title",
            snippet: { pre: "pre", text: "text", post: "" },
          }}
          position={1}
        >
          <div>children</div>
        </VuiSearchResult>,
        { wrapper: MemoryRouter }
      );

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSearchResult"
          >
            <div
              class="vuiSearchResultPosition"
            >
              1
            </div>
            <h3
              class="vuiTitle vuiTitle--s vuiTitle--left"
            >
              title
            </h3>
            <div
              class="vuiText vuiText--s vuiText--left"
            >
              <p>
                pre 
                <strong>
                  text
                </strong>
                 
              </p>
            </div>
            <div
              class="vuiSpacer vuiSpacer--s"
            />
            <div>
              children
            </div>
          </div>
        </DocumentFragment>
      `);
    });

    test("missing title but has url", () => {
      const { asFragment } = render(
        <VuiSearchResult
          result={{
            url: "url",
            snippet: { pre: "pre", text: "text", post: "" },
          }}
          position={1}
        >
          <div>children</div>
        </VuiSearchResult>,
        { wrapper: MemoryRouter }
      );

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSearchResult"
          >
            <div
              class="vuiSearchResultPosition"
            >
              1
            </div>
            <a
              class="vuiLink vuiTitle vuiTitle--s vuiTitle--left"
              href="/url#:~:text=text"
              target="_blank"
            >
              <h3>
                url
              </h3>
            </a>
            <div
              class="vuiText vuiText--s vuiText--left"
            >
              <p>
                pre 
                <strong>
                  text
                </strong>
                 
              </p>
            </div>
            <div
              class="vuiSpacer vuiSpacer--s"
            />
            <div>
              children
            </div>
          </div>
        </DocumentFragment>
      `);
    });
  });
});
