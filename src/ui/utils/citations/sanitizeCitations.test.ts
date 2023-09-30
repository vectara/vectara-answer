import { sanitizeCitations } from "./sanitizeCitations";

describe("sanitizeCitations", () => {
  test("ignores single citations", () => {
    const summary =
      "[1] Beginning of summary. [2][3] Multiple at beginning of sentence, and before comma [4], single at middle [5] of sentence. At end of sentence [6].";

    expect(sanitizeCitations(summary)).toEqual(summary);
  });

  test("sanitize multiple comma-delimited citations", () => {
    const summary = "Two citations [1, 2] and seven citations [1, 2, 3, 4, 5, 6, 7] and without spaces [1,2,3].";

    expect(sanitizeCitations(summary)).toEqual(
      "Two citations [1][2] and seven citations [1][2][3][4][5][6][7] and without spaces [1][2][3]."
    );
  });
});
