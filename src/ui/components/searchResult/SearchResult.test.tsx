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
            snippet: { pre: "pre", text: "text", post: "" }
          }}
          position={1}
          subTitle={<div>subTitle</div>}
          className="customClass"
          snippetProps={{
            className: "snippetCustomClass"
          }}
        >
          <div>children</div>
        </VuiSearchResult>,
        { wrapper: MemoryRouter }
      );

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSearchResult fs-mask customClass"
          >
            <div
              class="vuiSearchResultPosition"
              data-testid="searchResultCitation-1"
            >
              1
            </div>
            <a
              class="vuiLink vuiTitle vuiTitle--s"
              href="/url#:~:text=text"
              rel="noopener"
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
              class="vuiText vuiText--s snippetCustomClass"
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
        <VuiSearchResult result={{ snippet: { pre: "pre", text: "text", post: "" } }} position={1}>
          <div>children</div>
        </VuiSearchResult>,
        { wrapper: MemoryRouter }
      );

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSearchResult fs-mask"
          >
            <div
              class="vuiSearchResultPosition"
              data-testid="searchResultCitation-1"
            >
              1
            </div>
            <div
              class="vuiText vuiText--s"
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
            snippet: { pre: "pre", text: "text", post: "" }
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
            class="vuiSearchResult fs-mask"
          >
            <div
              class="vuiSearchResultPosition"
              data-testid="searchResultCitation-1"
            >
              1
            </div>
            <h3
              class="vuiTitle vuiTitle--s"
            >
              title
            </h3>
            <div
              class="vuiText vuiText--s"
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
            snippet: { pre: "pre", text: "text", post: "" }
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
            class="vuiSearchResult fs-mask"
          >
            <div
              class="vuiSearchResultPosition"
              data-testid="searchResultCitation-1"
            >
              1
            </div>
            <a
              class="vuiLink vuiTitle vuiTitle--s"
              href="/url#:~:text=text"
              rel="noopener"
              target="_blank"
            >
              <h3>
                url
              </h3>
            </a>
            <div
              class="vuiText vuiText--s"
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

    test("has empty title but has url", () => {
      const { asFragment } = render(
        <VuiSearchResult
          result={{
            title: "  ",
            url: "url",
            snippet: { pre: "pre", text: "text", post: "" }
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
            class="vuiSearchResult fs-mask"
          >
            <div
              class="vuiSearchResultPosition"
              data-testid="searchResultCitation-1"
            >
              1
            </div>
            <a
              class="vuiLink vuiTitle vuiTitle--s"
              href="/url#:~:text=text"
              rel="noopener"
              target="_blank"
            >
              <h3>
                url
              </h3>
            </a>
            <div
              class="vuiText vuiText--s"
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

    test("has empty title and empty url", () => {
      const { asFragment } = render(
        <VuiSearchResult
          result={{
            title: "  ",
            url: "  ",
            snippet: { pre: "pre", text: "text", post: "" }
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
            class="vuiSearchResult fs-mask"
          >
            <div
              class="vuiSearchResultPosition"
              data-testid="searchResultCitation-1"
            >
              1
            </div>
            <div
              class="vuiText vuiText--s"
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
