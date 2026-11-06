import { performance } from "node:perf_hooks";

import {
    findPathBFS,
    findPathAStar
} from "../src/optimization/mazeSolver";

// Tạo mê cung lớn có các bức tường và lối đi xen kẽ.
function generateMaze(rows: number, cols: number): number[][] {
    const maze = Array.from(
        { length: rows },
        () => Array(cols).fill(0)
    );

    // Tạo tường dọc, mỗi tường có một lối mở.
    let wallIndex = 0;

    for (let col = 5; col < cols - 1; col += 6) {
        const gapRow =
            wallIndex % 2 === 0 ? rows - 1 : 0;

        for (let row = 0; row < rows; row++) {
            if (row !== gapRow) {
                maze[row][col] = 1;
            }
        }

        wallIndex++;
    }

    return maze;
}

// Tính trung vị của các lần đo.
function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

function benchmark(): void {
    const ROWS = 60;
    const COLS = 60;
    const RUNS = 15;

    const maze = generateMaze(ROWS, COLS);

    const start = { row: 0, col: 0 };
    const goal = { row: ROWS - 1, col: COLS - 1 };

    const bfsTimes: number[] = [];
    const aStarTimes: number[] = [];

    let bfsResult;
    let aStarResult;

    // Chạy thử trước để làm nóng chương trình.
    findPathBFS(maze, start, goal);
    findPathAStar(maze, start, goal);

    // Đo thời gian thực thi nhiều lần.
    for (let i = 0; i < RUNS; i++) {
        let begin = performance.now();

        bfsResult = findPathBFS(maze, start, goal);

        bfsTimes.push(performance.now() - begin);

        begin = performance.now();

        aStarResult = findPathAStar(maze, start, goal);

        aStarTimes.push(performance.now() - begin);
    }

    if (!bfsResult?.path || !aStarResult?.path) {
        throw new Error("Không tìm thấy đường đi trong mê cung.");
    }

    const bfsMedian = median(bfsTimes);
    const aStarMedian = median(aStarTimes);

    console.log("\n========== MAZE BENCHMARK ==========");
    console.log(`Maze size: ${ROWS} x ${COLS}`);
    console.log(`Number of runs: ${RUNS}`);

    console.log("\n---------- BFS ----------");
    console.log(`Average time: ${
        (bfsTimes.reduce((a, b) => a + b, 0) / RUNS).toFixed(4)
    } ms`);
    console.log(`Median time: ${bfsMedian.toFixed(4)} ms`);
    console.log(`Visited nodes: ${bfsResult.visitedNodes}`);
    console.log(`Path length: ${bfsResult.path.length}`);

    console.log("\n---------- A* ----------");
    console.log(`Average time: ${
        (aStarTimes.reduce((a, b) => a + b, 0) / RUNS).toFixed(4)
    } ms`);
    console.log(`Median time: ${aStarMedian.toFixed(4)} ms`);
    console.log(`Visited nodes: ${aStarResult.visitedNodes}`);
    console.log(`Path length: ${aStarResult.path.length}`);

    console.log("\n---------- COMPARISON ----------");

    console.log(
        `BFS and A* same path length: ${
            bfsResult.path.length === aStarResult.path.length
        }`
    );

    console.log(
        `Visited nodes reduced by A*: ${
            bfsResult.visitedNodes - aStarResult.visitedNodes
        }`
    );

    if (aStarMedian > 0) {
        console.log(
            `BFS/A* median time ratio: ${
                (bfsMedian / aStarMedian).toFixed(2)
            }`
        );
    }

    console.log("====================================\n");
}

benchmark();