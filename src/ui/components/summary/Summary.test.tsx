import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VuiSummary } from "./Summary";

describe("VuiSummary", () => {
  describe("renders citations with correct spacing", () => {
    test("with single citations", () => {
      const summary =
        "[1] Beginning of summary. [2][3] Multiple at beginning of sentence, and before comma [4], single at middle [5] of sentence. At end of sentence [6].";

      const { asFragment } = render(<VuiSummary summary={summary} />);

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSummary fs-mask"
          >
            <div
              class="vuiText vuiText--m"
            >
              <span />
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                1
              </button>
              <span>
                 
              </span>
              <span>
                Beginning of summary.
              </span>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                2
              </button>
              <span>
                 
              </span>
              <span />
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                3
              </button>
              <span>
                 
              </span>
              <span>
                Multiple at beginning of sentence, and before comma
              </span>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                4
              </button>
              <span>
                , single at middle
              </span>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                5
              </button>
              <span>
                 
              </span>
              <span>
                of sentence. At end of sentence
              </span>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                6
              </button>
              <span>
                .
              </span>
            </div>
          </div>
        </DocumentFragment>
      `);
    });

    test("at the end of the summary", () => {
      const summary = "End of summary. [1]";
      const { asFragment } = render(<VuiSummary summary={summary} />);

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSummary fs-mask"
          >
            <div
              class="vuiText vuiText--m"
            >
              <span>
                End of summary.
              </span>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                1
              </button>
              <span>
                 
              </span>
            </div>
          </div>
        </DocumentFragment>
      `);
    });

    test("with multiple comma-delimited citations", () => {
      const summary = "Two citations [1, 2] and seven citations [1, 2, 3, 4, 5, 6, 7].";
      const { asFragment } = render(<VuiSummary summary={summary} />);

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSummary fs-mask"
          >
            <div
              class="vuiText vuiText--m"
            >
              <span>
                Two citations
              </span>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                1
              </button>
              <span>
                 
              </span>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                2
              </button>
              <span>
                 
              </span>
              <span>
                and seven citations
              </span>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                1
              </button>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                2
              </button>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                3
              </button>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                4
              </button>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                5
              </button>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                6
              </button>
              <span>
                 
              </span>
              <button
                class="vuiBaseButton vuiSummaryCitation vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--xs"
              >
                7
              </button>
              <span>
                .
              </span>
            </div>
          </div>
        </DocumentFragment>
      `);
    });
  });
});
