import hash from "../../src/utils/hash";

const valid = [
  "#foo=a;bar=b;baz=c",
  "#foo=a;bar=b;baz=c;",
  "#;foo=a;;;bar=b;baz=c;;",
];

describe("hash", () => {
  describe(".all()", () => {
    it.each(valid)("should return an object for %s", source => {
      expect(hash.all(source)).toStrictEqual({ foo: "a", bar: "b", baz: "c" });
    });
  });

  describe(".get()", () => {
    it.each(valid)("should return a value for a given key for %s", source => {
      expect(hash.get("foo", "", source)).toStrictEqual("a");
      expect(hash.get("bar", "", source)).toStrictEqual("b");
      expect(hash.get("qux", "", source)).toStrictEqual("");
    });
  });

  describe(".set()", () => {
    it("should return a hash string for an object", () => {
      expect(hash.set({ foo: "a", bar: "b" })).toEqual("#foo=a;bar=b");
    });
    it("should set window.location.hash", () => {
      hash.set({ foo: "a", bar: "b" });
      expect(window.location.hash).toEqual("#foo=a;bar=b");
    })
  });

  describe(".keys()", () => {
    it.each(valid)("should return an array for %s", source => {
      expect(hash.keys(source)).toStrictEqual(["foo", "bar", "baz"]);
    });
  });

  describe(".valid()", () => {
    it.each(valid)(
      "should return true with a parsable hash string for %s",
      source => {
        expect(hash.valid(source)).toBeTruthy();
      }
    );
  });
});
