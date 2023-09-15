import { reorderCitations } from "./reorderCitations";

describe("reorderCitations", () => {
  test("reorders citations in a summary", () => {
    expect(
      reorderCitations("summary [4] some words [1][3] and stuff at the end")
    ).toEqual("summary [1] some words [2][3] and stuff at the end");
  });
});
