import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VuiSummary } from "./Summary";
import { VuiSummaryCitation } from "./SummaryCitation";

describe("VuiSummary", () => {
  describe("renders markdown", () => {
    test("without citations", () => {
      const summary = `
# Here's a heading 1

## Here's a heading 2

### Here's a heading 3

#### Here's a heading 4

With some **bold** and _emphasized_ test. Here is a [link](https://www.vectara.com).

* An
* Unordered
* List

1. An
1. Ordered
1. List

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
`;

      const { asFragment } = render(<VuiSummary summary={summary} SummaryCitation={VuiSummaryCitation} />);

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSummary fs-mask"
            dir="auto"
          >
            <div
              class="vuiText vuiText--m"
            >
              <div>
                <h1
                  id="heres-a-heading-1"
                >
                  Here's a heading 1
                </h1>
                <h2
                  id="heres-a-heading-2"
                >
                  Here's a heading 2
                </h2>
                <h3
                  id="heres-a-heading-3"
                >
                  Here's a heading 3
                </h3>
                <h4
                  id="heres-a-heading-4"
                >
                  Here's a heading 4
                </h4>
                <p>
                  With some 
                  <strong>
                    bold
                  </strong>
                   and 
                  <em>
                    emphasized
                  </em>
                   test. Here is a 
                  <a
                    href="https://www.vectara.com"
                  >
                    link
                  </a>
                  .
                </p>
                <ul>
                  <li>
                    An
                  </li>
                  <li>
                    Unordered
                  </li>
                  <li>
                    List
                  </li>
                </ul>
                <ol
                  start="1"
                >
                  <li>
                    An
                  </li>
                  <li>
                    Ordered
                  </li>
                  <li>
                    List
                  </li>
                </ol>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Syntax
                      </th>
                      <th>
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Header
                      </td>
                      <td>
                        Title
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Paragraph
                      </td>
                      <td>
                        Text
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DocumentFragment>
      `);
    });

    test("with citations", () => {
      const summary = `
# [1] Here's a heading 1

## [1] Here's a heading 2

### [1] Here's a heading 3

#### [1] Here's a heading 4

With some **bold** [2][3] and _emphasized_ [2][3] test. Here is a [link](https://www.vectara.com) [2][3].

* An [2][3]
* Unordered [2][3]
* List [2][3]

1. An [2][3]
1. Ordered [2][3]
1. List [2][3]

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title [2][3]       |
| Paragraph   | Text        |
      `;

      const { asFragment } = render(<VuiSummary summary={summary} SummaryCitation={VuiSummaryCitation} />);

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSummary fs-mask"
            dir="auto"
          >
            <div
              class="vuiText vuiText--m"
            >
              <div>
                <h1
                  id="summarycitation-reference1--heres-a-heading-1"
                >
                  <button
                    class="vuiSummaryCitation"
                  >
                    1
                  </button>
                   Here's a heading 1
                </h1>
                <h2
                  id="summarycitation-reference1--heres-a-heading-2"
                >
                  <button
                    class="vuiSummaryCitation"
                  >
                    1
                  </button>
                   Here's a heading 2
                </h2>
                <h3
                  id="summarycitation-reference1--heres-a-heading-3"
                >
                  <button
                    class="vuiSummaryCitation"
                  >
                    1
                  </button>
                   Here's a heading 3
                </h3>
                <h4
                  id="summarycitation-reference1--heres-a-heading-4"
                >
                  <button
                    class="vuiSummaryCitation"
                  >
                    1
                  </button>
                   Here's a heading 4
                </h4>
                <p>
                  With some 
                  <strong>
                    bold
                  </strong>
                  <button
                    class="vuiSummaryCitation"
                  >
                    2
                  </button>
                  <button
                    class="vuiSummaryCitation"
                  >
                    3
                  </button>
                   and 
                  <em>
                    emphasized
                  </em>
                  <button
                    class="vuiSummaryCitation"
                  >
                    2
                  </button>
                  <button
                    class="vuiSummaryCitation"
                  >
                    3
                  </button>
                   test. Here is a 
                  <a
                    href="https://www.vectara.com"
                  >
                    link
                  </a>
                  <button
                    class="vuiSummaryCitation"
                  >
                    2
                  </button>
                  <button
                    class="vuiSummaryCitation"
                  >
                    3
                  </button>
                  .
                </p>
                <ul>
                  <li>
                    An 
                    <button
                      class="vuiSummaryCitation"
                    >
                      2
                    </button>
                    <button
                      class="vuiSummaryCitation"
                    >
                      3
                    </button>
                  </li>
                  <li>
                    Unordered 
                    <button
                      class="vuiSummaryCitation"
                    >
                      2
                    </button>
                    <button
                      class="vuiSummaryCitation"
                    >
                      3
                    </button>
                  </li>
                  <li>
                    List 
                    <button
                      class="vuiSummaryCitation"
                    >
                      2
                    </button>
                    <button
                      class="vuiSummaryCitation"
                    >
                      3
                    </button>
                  </li>
                </ul>
                <ol
                  start="1"
                >
                  <li>
                    An 
                    <button
                      class="vuiSummaryCitation"
                    >
                      2
                    </button>
                    <button
                      class="vuiSummaryCitation"
                    >
                      3
                    </button>
                  </li>
                  <li>
                    Ordered 
                    <button
                      class="vuiSummaryCitation"
                    >
                      2
                    </button>
                    <button
                      class="vuiSummaryCitation"
                    >
                      3
                    </button>
                  </li>
                  <li>
                    List 
                    <button
                      class="vuiSummaryCitation"
                    >
                      2
                    </button>
                    <button
                      class="vuiSummaryCitation"
                    >
                      3
                    </button>
                  </li>
                </ol>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Syntax
                      </th>
                      <th>
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Header
                      </td>
                      <td>
                        Title 
                        <button
                          class="vuiSummaryCitation"
                        >
                          2
                        </button>
                        <button
                          class="vuiSummaryCitation"
                        >
                          3
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Paragraph
                      </td>
                      <td>
                        Text
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DocumentFragment>
      `);
    });
  });

  describe("renders citations with correct spacing", () => {
    test("with single citations", () => {
      const summary =
        "[1] Beginning of summary. [2][3] Multiple at beginning of sentence, and before comma [4], single at middle [5] of sentence. At end of sentence [6].";

      const { asFragment } = render(<VuiSummary summary={summary} SummaryCitation={VuiSummaryCitation} />);

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSummary fs-mask"
            dir="auto"
          >
            <div
              class="vuiText vuiText--m"
            >
              <div>
                <button
                  class="vuiSummaryCitation"
                >
                  1
                </button>
                 Beginning of summary. 
                <button
                  class="vuiSummaryCitation"
                >
                  2
                </button>
                <button
                  class="vuiSummaryCitation"
                >
                  3
                </button>
                 Multiple at beginning of sentence, and before comma 
                <button
                  class="vuiSummaryCitation"
                >
                  4
                </button>
                , single at middle 
                <button
                  class="vuiSummaryCitation"
                >
                  5
                </button>
                 of sentence. At end of sentence 
                <button
                  class="vuiSummaryCitation"
                >
                  6
                </button>
                .

              </div>
            </div>
          </div>
        </DocumentFragment>
      `);
    });

    test("at the end of the summary", () => {
      const summary = "End of summary. [1]";
      const { asFragment } = render(<VuiSummary summary={summary} SummaryCitation={VuiSummaryCitation} />);

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSummary fs-mask"
            dir="auto"
          >
            <div
              class="vuiText vuiText--m"
            >
              <p>
                End of summary. 
                <button
                  class="vuiSummaryCitation"
                >
                  1
                </button>
              </p>
            </div>
          </div>
        </DocumentFragment>
      `);
    });

    test("with multiple comma-delimited citations", () => {
      const summary = "Two citations [1, 2] and seven citations [1, 2, 3, 4, 5, 6, 7].";
      const { asFragment } = render(<VuiSummary summary={summary} SummaryCitation={VuiSummaryCitation} />);

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="vuiSummary fs-mask"
            dir="auto"
          >
            <div
              class="vuiText vuiText--m"
            >
              <p>
                Two citations 
                <button
                  class="vuiSummaryCitation"
                >
                  1
                </button>
                <button
                  class="vuiSummaryCitation"
                >
                  2
                </button>
                 and seven citations 
                <button
                  class="vuiSummaryCitation"
                >
                  1
                </button>
                <button
                  class="vuiSummaryCitation"
                >
                  2
                </button>
                <button
                  class="vuiSummaryCitation"
                >
                  3
                </button>
                <button
                  class="vuiSummaryCitation"
                >
                  4
                </button>
                <button
                  class="vuiSummaryCitation"
                >
                  5
                </button>
                <button
                  class="vuiSummaryCitation"
                >
                  6
                </button>
                <button
                  class="vuiSummaryCitation"
                >
                  7
                </button>
                .
              </p>
            </div>
          </div>
        </DocumentFragment>
      `);
    });
  });
});
