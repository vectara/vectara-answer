import { applyCitationOrder } from "./applyCitationOrder";

const searchResult1 = {
  id: "id1",
  snippet: {
    pre: "pre",
    text: "text",
    post: "post",
  },
  source: "source1",
  url: "url1",
  title: "title1",
  metadata: {
    key: "value",
  },
};

const searchResult2 = {
  id: "id2",
  snippet: {
    pre: "pre",
    text: "text",
    post: "post",
  },
  source: "source2",
  url: "url2",
  title: "title2",
  metadata: {
    key: "value",
  },
};

const searchResult3 = {
  id: "id3",
  snippet: {
    pre: "pre",
    text: "text",
    post: "post",
  },
  source: "source3",
  url: "url3",
  title: "title3",
  metadata: {
    key: "value",
  },
};

const searchResult4 = {
  id: "id4",
  snippet: {
    pre: "pre",
    text: "text",
    post: "post",
  },
  source: "source4",
  url: "url4",
  title: "title4",
  metadata: {
    key: "value",
  },
};

describe("applyCitationOrder", () => {
  test("reorders search results to match the order of the citations in the summary", () => {
    expect(
      applyCitationOrder(
        [searchResult1, searchResult2, searchResult3, searchResult4],
        "summary [4] some words [1][3] and stuff at the end"
      )
    ).toEqual([searchResult4, searchResult1, searchResult3]);
  });

  test("ignores citations that are out of range of search results", () => {
    expect(
      applyCitationOrder(
        [searchResult1, searchResult2, searchResult3, searchResult4],
        "summary [5] some words [1][3] and stuff at the end"
      )
    ).toEqual([searchResult1, searchResult3]);
  });
});
