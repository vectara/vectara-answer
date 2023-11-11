import { extractCitations } from "./extractCitations";

describe("extractCitations", () => {
  test("extracts single citations", () => {
    const summary =
      "[1] Beginning of summary. [2][3] Multiple at beginning of sentence, and before comma [4], single at middle [5] of sentence. At end of sentence [6].";

    expect(extractCitations(summary)).toEqual([
      { text: "", references: ["1"] },
      { text: " Beginning of summary. ", references: ["2"] },
      { text: "", references: ["3"] },
      {
        text: " Multiple at beginning of sentence, and before comma ",
        references: ["4"]
      },
      { text: ", single at middle ", references: ["5"] },
      {
        text: " of sentence. At end of sentence ",
        references: ["6"]
      },
      { text: "." }
    ]);
  });

  test("extracts citation at the end of the summary", () => {
    const summary = "End of summary. [1]";
    expect(extractCitations(summary)).toEqual([{ text: "End of summary. ", references: ["1"] }]);
  });

  test("extracts multiple comma-delimited citations", () => {
    const summary = "Two citations [1, 2] and seven citations [1, 2, 3, 4, 5, 6, 7] and without spaces [1,2,3].";

    expect(extractCitations(summary)).toEqual([
      { text: "Two citations ", references: ["1", "2"] },
      {
        text: " and seven citations ",
        references: ["1", "2", "3", "4", "5", "6", "7"]
      },
      {
        text: " and without spaces ",
        references: ["1", "2", "3"]
      },
      { text: "." }
    ]);
  });
});
