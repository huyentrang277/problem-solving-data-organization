
import { describe, it, expect } from "vitest";
import { findKthLargest } from "../../src/algorithms/largestNumber";

describe("Find Kth Largest Element", () => {

    it("should find the second largest element", () => {
        expect(findKthLargest([3, 2, 1, 5, 6, 4], 2))
            .toBe(5);
    });

    it("should find the largest element", () => {
        expect(findKthLargest([1, 2, 3, 4, 5], 1))
            .toBe(5);
    });

    it("should find the smallest element", () => {
        expect(findKthLargest([1, 2, 3, 4, 5], 5))
            .toBe(1);
    });

    it("should handle duplicate elements", () => {
        expect(findKthLargest([10, 7, 8, 9, 10, 5], 2))
            .toBe(9);
    });

    it("should handle multiple duplicates", () => {
        expect(findKthLargest([5, 5, 5, 3, 3, 1], 2))
            .toBe(3);
    });

    it("should handle negative numbers", () => {
        expect(findKthLargest([-5, -1, -3, -2], 2))
            .toBe(-2);
    });

    it("should handle a single element", () => {
        expect(findKthLargest([100], 1))
            .toBe(100);
    });

    it("should throw error for empty array", () => {
        expect(() => findKthLargest([], 1)).toThrow();
    });

    it("should throw error when K = 0", () => {
        expect(() => findKthLargest([1, 2, 3], 0))
            .toThrow();
    });

    it("should throw error when K is negative", () => {
        expect(() => findKthLargest([1, 2, 3], -1))
            .toThrow();
    });

    it("should throw error when K exceeds distinct elements", () => {
        expect(() => findKthLargest([1, 1, 2], 3))
            .toThrow();
    });

    it("should throw error when K is decimal", () => {
        expect(() => findKthLargest([1, 2, 3], 1.5))
            .toThrow();
    });

    it("should throw error when array contains decimal", () => {
        expect(() => findKthLargest([1, 2.5, 3], 2))
            .toThrow();
    });

});
