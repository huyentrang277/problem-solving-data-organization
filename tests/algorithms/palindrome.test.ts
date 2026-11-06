
import { describe, it, expect } from "vitest";
import { isPalindrome } from "../../src/algorithms/palindrome";

describe("Palindrome Checker", () => {

    it("should return true for madam", () => {
        expect(isPalindrome("madam")).toBe(true);
    });

    it("should return true for racecar", () => {
        expect(isPalindrome("racecar")).toBe(true);
    });

    it("should ignore spaces and punctuation", () => {
        expect(
            isPalindrome("A man, a plan, a canal: Panama")
        ).toBe(true);
    });

    it("should ignore uppercase and lowercase", () => {
        expect(isPalindrome("MadAm")).toBe(true);
    });

    it("should return false for a non-palindrome string", () => {
        expect(isPalindrome("Hello")).toBe(false);
    });

    it("should return true for an empty string", () => {
        expect(isPalindrome("")).toBe(true);
    });

    it("should return true for a string with only punctuation", () => {
        expect(isPalindrome(".,!?")).toBe(true);
    });

    it("should handle a single character", () => {
        expect(isPalindrome("a")).toBe(true);
    });

    it("should handle numbers", () => {
        expect(isPalindrome("12321")).toBe(true);
    });

    it("should handle Vietnamese characters", () => {
        expect(isPalindrome("Áá")).toBe(true);
    });

    it("should handle spaces around the string", () => {
        expect(isPalindrome("   madam   ")).toBe(true);
    });

});
