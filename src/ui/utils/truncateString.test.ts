import { truncateStart, truncateEnd } from "./truncateString";

describe("truncateStart", () => {
  it("returns a truncated source up to the maxLength", () => {
    const source = "12345678";
    expect(truncateStart(source, 5)).toBe("…45678");
  });

  it("preserves the original source if maxLength exceeds its length", () => {
    const source = "12345678";
    expect(truncateStart(source, 10)).toBe(source);
  });

  it("trims whitespace", () => {
    const source = "1234 5678";
    expect(truncateStart(source, 5)).toBe("…5678");
  });

  it("ignores zero maxLength", () => {
    const source = "12345678";
    expect(truncateStart(source, 0)).toBe(source);
  });

  it("ignores negative maxLength", () => {
    const source = "12345678";
    expect(truncateStart(source, -1)).toBe(source);
  });
});

describe("truncateEnd", () => {
  it("trims the maxLength number of characters from the start of the source", () => {
    const source = "12345678";
    expect(truncateEnd(source, 5)).toBe("12345…");
  });

  it("returns a truncated source up to the maxLength", () => {
    const source = "12345678";
    expect(truncateEnd(source, 10)).toBe(source);
  });

  it("trims whitespace", () => {
    const source = "1234 5678";
    expect(truncateEnd(source, 5)).toBe("1234…");
  });

  it("ignores zero maxLength", () => {
    const source = "12345678";
    expect(truncateEnd(source, 0)).toBe(source);
  });

  it("ignores negative maxLength", () => {
    const source = "12345678";
    expect(truncateEnd(source, -1)).toBe(source);
  });

  describe("inserts a space between the ellipsis and the truncated source when it ends", () => {
    it("with a period", () => {
      const source = "the. word";
      expect(truncateEnd(source, 4)).toBe("the. …");
    });

    it("with a question mark", () => {
      const source = "the? word";
      expect(truncateEnd(source, 4)).toBe("the? …");
    });

    it("with an exclamation point", () => {
      const source = "the! word";
      expect(truncateEnd(source, 4)).toBe("the! …");
    });
  });
});
