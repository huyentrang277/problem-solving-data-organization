
import { describe, it, expect } from "vitest";
import { reverseString } from "../../src/algorithms/reverseString";

describe("Reverse String", () => {

    it("should reverse a normal string", () => {
        expect(reverseString("hello")).toBe("olleh");
    });

    it("should reverse a string with numbers", () => {
        expect(reverseString("12345")).toBe("54321");
    });

    it("should return an empty string", () => {
        expect(reverseString("")).toBe("");
    });

    it("should return the same character", () => {
        expect(reverseString("a")).toBe("a");
    });

    it("should reverse a string with spaces", () => {
        expect(reverseString("hello world")).toBe("dlrow olleh");
    });

    it("should reverse Vietnamese characters", () => {
        expect(reverseString("Xin chào")).toBe("oàhc niX");
    });

    it("should reverse special characters", () => {
        expect(reverseString("a@b#c")).toBe("c#b@a");
    });

    it("should preserve emoji characters", () => {
        expect(reverseString("😀abc")).toBe("cba😀");
    });

});
