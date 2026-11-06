import { describe, it, expect } from "vitest";
import { characterFrequency } from "../../src/algorithms/characterFrequency";

describe("characterFrequency", () => {
    it("đếm tần suất các ký tự trong chuỗi", () => {
        const result = characterFrequency("hello");

        expect(result.get("h")).toBe(1);
        expect(result.get("e")).toBe(1);
        expect(result.get("l")).toBe(2);
        expect(result.get("o")).toBe(1);
    });

    it("trả về Map rỗng khi chuỗi rỗng", () => {
        expect(characterFrequency("").size).toBe(0);
    });

    it("xử lý chuỗi chỉ có một ký tự", () => {
        expect(characterFrequency("a").get("a")).toBe(1);
    });

    it("xử lý khi tất cả ký tự giống nhau", () => {
        expect(characterFrequency("aaaa")).toEqual(
            new Map([["a", 4]])
        );
    });

    it("phân biệt chữ hoa và chữ thường", () => {
        const result = characterFrequency("AaA");

        expect(result.get("A")).toBe(2);
        expect(result.get("a")).toBe(1);
    });

    it("xử lý tiếng Việt có dấu", () => {
        const result = characterFrequency("xin chào");

        expect(result.get("x")).toBe(1);
        expect(result.get("à")).toBe(1);
        expect(result.get("o")).toBe(1);
    });

    it("đếm khoảng trắng như một ký tự", () => {
        const result = characterFrequency("a a");

        expect(result.get(" ")).toBe(1);
        expect(result.get("a")).toBe(2);
    });

    it("xử lý ký tự đặc biệt", () => {
        const result = characterFrequency("a!a?");

        expect(result.get("!")).toBe(1);
        expect(result.get("?")).toBe(1);
        expect(result.get("a")).toBe(2);
    });
});