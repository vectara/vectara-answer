import { createPagination } from "./createPagination";

describe("createPagination", () => {
  describe("when numPages <= 5", () => {
    test("returns page numbers if numPages === 5", () => {
      expect(createPagination(1, 5)).toEqual({ items: [1, 2, 3, 4, 5], activeIndex: 0 });
    });

    test("returns page numbers if numPages < 5", () => {
      expect(createPagination(3, 3)).toEqual({ items: [1, 2, 3], activeIndex: 2 });
    });
  });

  describe("when numPages > 5", () => {
    describe("and page is within 2 pages of the first and last page", () => {
      test("truncates last couples pages when on page 1", () => {
        expect(createPagination(1, 6)).toEqual({ items: [1, 2, 3, "...", 6], activeIndex: 0 });
      });

      test("truncates last couples pages when on page 2", () => {
        expect(createPagination(2, 6)).toEqual({ items: [1, 2, 3, "...", 6], activeIndex: 1 });
      });

      test("truncates first couples pages when on page 4", () => {
        expect(createPagination(4, 6)).toEqual({ items: [1, "...", 4, 5, 6], activeIndex: 2 });
      });

      test("truncates first couples pages when on page 5", () => {
        expect(createPagination(5, 6)).toEqual({ items: [1, "...", 4, 5, 6], activeIndex: 3 });
      });
    });

    describe("and page is beyond 2 pages of the first and last page", () => {
      test("truncates frist and last couples pages", () => {
        expect(createPagination(15, 50)).toEqual({ items: [1, "...", 15, "...", 50], activeIndex: 2 });
      });
    });
  });
});
