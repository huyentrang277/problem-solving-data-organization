import { describe, it, expect, beforeEach } from "vitest";
import { LRUCache } from "../../src/data-structures/LRUCache";

describe("LRUCache", () => {
    let cache: LRUCache<string, number>;

    beforeEach(() => {
        cache = new LRUCache<string, number>(3);
    });

    it("thêm và lấy dữ liệu thành công", () => {
        cache.put("A", 100);

        expect(cache.get("A")).toBe(100);
    });

    it("trả về undefined khi key không tồn tại", () => {
        expect(cache.get("X")).toBeUndefined();
    });

    it("cập nhật giá trị của key đã tồn tại", () => {
        cache.put("A", 100);
        cache.put("A", 200);

        expect(cache.get("A")).toBe(200);
        expect(cache.getSize()).toBe(1);
    });

    it("xóa phần tử ít được sử dụng gần đây nhất khi Cache đầy", () => {
        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);
        cache.put("D", 4);

        expect(cache.has("A")).toBe(false);
        expect(cache.has("B")).toBe(true);
        expect(cache.has("C")).toBe(true);
        expect(cache.has("D")).toBe(true);
    });

    it("đưa phần tử vừa truy cập về vị trí mới nhất", () => {
        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);

        cache.get("A");

        expect(cache.getKeys()).toEqual(["B", "C", "A"]);
    });

    it("không xóa phần tử vừa được truy cập gần đây nhất", () => {
        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);

        cache.get("A");
        cache.put("D", 4);

        expect(cache.has("A")).toBe(true);
        expect(cache.has("B")).toBe(false);
    });

    it("xóa phần tử theo key", () => {
        cache.put("A", 1);

        expect(cache.delete("A")).toBe(true);
        expect(cache.has("A")).toBe(false);
    });

    it("trả về false khi xóa key không tồn tại", () => {
        expect(cache.delete("X")).toBe(false);
    });

    it("kiểm tra key có tồn tại hay không", () => {
        cache.put("A", 1);

        expect(cache.has("A")).toBe(true);
        expect(cache.has("B")).toBe(false);
    });

    it("trả về số lượng phần tử hiện tại", () => {
        cache.put("A", 1);
        cache.put("B", 2);

        expect(cache.getSize()).toBe(2);
    });

    it("không vượt quá dung lượng tối đa", () => {
        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);
        cache.put("D", 4);
        cache.put("E", 5);

        expect(cache.getSize()).toBe(3);
    });

    it("xóa toàn bộ dữ liệu bằng clear", () => {
        cache.put("A", 1);
        cache.put("B", 2);

        cache.clear();

        expect(cache.getSize()).toBe(0);
        expect(cache.getKeys()).toEqual([]);
    });

    it("báo lỗi nếu capacity bằng 0", () => {
        expect(() => new LRUCache<string, number>(0)).toThrow(
            "Capacity phải là số nguyên dương."
        );
    });

    it("báo lỗi nếu capacity âm", () => {
        expect(() => new LRUCache<string, number>(-1)).toThrow(
            "Capacity phải là số nguyên dương."
        );
    });

    it("báo lỗi nếu capacity không phải số nguyên", () => {
        expect(() => new LRUCache<string, number>(1.5)).toThrow(
            "Capacity phải là số nguyên dương."
        );
    });

    it("hoạt động với capacity bằng 1", () => {
        const smallCache = new LRUCache<string, number>(1);

        smallCache.put("A", 1);
        smallCache.put("B", 2);

        expect(smallCache.has("A")).toBe(false);
        expect(smallCache.get("B")).toBe(2);
    });
});