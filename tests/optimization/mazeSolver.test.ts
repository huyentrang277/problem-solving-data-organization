import { describe, it, expect } from "vitest";

import {
    findPathBFS,
    findPathAStar
} from "../../src/optimization/mazeSolver";

const simpleMaze = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
];

const start = { row: 0, col: 0 };
const goal = { row: 3, col: 3 };

describe("Maze Solver - BFS", () => {
    it("tìm được đường đi trong mê cung", () => {
        const result = findPathBFS(simpleMaze, start, goal);

        expect(result.path).not.toBeNull();
        expect(result.path?.[0]).toEqual(start);
        expect(result.path?.at(-1)).toEqual(goal);
    });

    it("trả về null khi không có đường đi", () => {
        const maze = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];

        const result = findPathBFS(
            maze,
            { row: 0, col: 0 },
            { row: 2, col: 2 }
        );

        expect(result.path).toBeNull();
    });

    it("trả về đường đi ngắn nhất", () => {
        const result = findPathBFS(simpleMaze, start, goal);

        expect(result.path?.length).toBe(7);
    });

    it("xử lý khi điểm bắt đầu trùng điểm kết thúc", () => {
        const result = findPathBFS(simpleMaze, start, start);

        expect(result.path).toEqual([start]);
    });
});

describe("Maze Solver - A*", () => {
    it("tìm được đường đi trong mê cung", () => {
        const result = findPathAStar(simpleMaze, start, goal);

        expect(result.path).not.toBeNull();
        expect(result.path?.[0]).toEqual(start);
        expect(result.path?.at(-1)).toEqual(goal);
    });

    it("trả về null khi không có đường đi", () => {
        const maze = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];

        const result = findPathAStar(
            maze,
            { row: 0, col: 0 },
            { row: 2, col: 2 }
        );

        expect(result.path).toBeNull();
    });

    it("tìm được đường đi ngắn nhất", () => {
        const result = findPathAStar(simpleMaze, start, goal);

        expect(result.path?.length).toBe(7);
    });

    it("xử lý khi điểm bắt đầu trùng điểm kết thúc", () => {
        const result = findPathAStar(simpleMaze, start, start);

        expect(result.path).toEqual([start]);
    });
});

describe("Maze Solver - Validation", () => {
    it("báo lỗi khi mê cung rỗng", () => {
        expect(() =>
            findPathBFS([], start, goal)
        ).toThrow();
    });

    it("báo lỗi khi mê cung không hình chữ nhật", () => {
        expect(() =>
            findPathBFS([[0, 0], [0]], start, goal)
        ).toThrow();
    });

    it("báo lỗi khi điểm bắt đầu nằm ngoài mê cung", () => {
        expect(() =>
            findPathBFS(simpleMaze, { row: -1, col: 0 }, goal)
        ).toThrow();
    });

    it("báo lỗi khi điểm kết thúc là tường", () => {
        expect(() =>
            findPathAStar(simpleMaze, start, { row: 1, col: 0 })
        ).toThrow();
    });

    it("báo lỗi khi ô mê cung có giá trị không hợp lệ", () => {
        expect(() =>
            findPathBFS([[0, 2], [0, 0]], start, goal)
        ).toThrow();
    });
});