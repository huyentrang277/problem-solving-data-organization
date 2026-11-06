
import { describe, it, expect } from "vitest";
import { findNthPrime } from "../../src/algorithms/primeNumber";

describe("Find Nth Prime Number", () => {

    it("should return 2 when N = 1", () => {
        expect(findNthPrime(1)).toBe(2);
    });

    it("should return 3 when N = 2", () => {
        expect(findNthPrime(2)).toBe(3);
    });

    it("should return 5 when N = 3", () => {
        expect(findNthPrime(3)).toBe(5);
    });

    it("should return 11 when N = 5", () => {
        expect(findNthPrime(5)).toBe(11);
    });

    it("should return 29 when N = 10", () => {
        expect(findNthPrime(10)).toBe(29);
    });

    it("should throw error when N = 0", () => {
        expect(() => findNthPrime(0)).toThrow();
    });

    it("should throw error when N is negative", () => {
        expect(() => findNthPrime(-5)).toThrow();
    });

    it("should throw error when N is decimal", () => {
        expect(() => findNthPrime(2.5)).toThrow();
    });

    it("should throw error when N is not a number", () => {
        expect(() => findNthPrime(NaN)).toThrow();
    });

});
