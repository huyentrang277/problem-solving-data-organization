export interface Point {
    row: number;
    col: number;
}

export interface PathResult {
    path: Point[] | null;
    visitedNodes: number;
}

type Maze = number[][];

const DIRECTIONS: Point[] = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 }
];

function validateMaze(
    maze: Maze,
    start: Point,
    goal: Point
): void {
    if (
        maze.length === 0 ||
        maze[0].length === 0 ||
        !maze.every(row => row.length === maze[0].length)
    ) {
        throw new Error("Mê cung phải có dạng hình chữ nhật và không rỗng.");
    }

    if (!maze.every(row => row.every(cell => cell === 0 || cell === 1))) {
        throw new Error("Mỗi ô trong mê cung chỉ được là 0 hoặc 1.");
    }

    for (const point of [start, goal]) {
        if (
            !Number.isInteger(point.row) ||
            !Number.isInteger(point.col) ||
            point.row < 0 ||
            point.row >= maze.length ||
            point.col < 0 ||
            point.col >= maze[0].length
        ) {
            throw new Error("Vị trí bắt đầu hoặc kết thúc không hợp lệ.");
        }

        if (maze[point.row][point.col] === 1) {
            throw new Error("Điểm bắt đầu và kết thúc không được là tường.");
        }
    }
}

function keyOf(point: Point): string {
    return `${point.row},${point.col}`;
}

function reconstructPath(
    parents: Map<string, string | null>,
    goal: Point
): Point[] {
    const path: Point[] = [];
    let current: string | null = keyOf(goal);

    while (current !== null) {
        const [row, col] = current.split(",").map(Number);
        path.push({ row, col });
        current = parents.get(current) ?? null;
    }

    return path.reverse();
}

// BFS: tìm đường đi ngắn nhất bằng tìm kiếm chiều rộng.
export function findPathBFS(
    maze: Maze,
    start: Point,
    goal: Point
): PathResult {
    validateMaze(maze, start, goal);

    const queue: Point[] = [start];
    let head = 0;

    const visited = new Set<string>([keyOf(start)]);
    const parents = new Map<string, string | null>([
        [keyOf(start), null]
    ]);

    let visitedNodes = 0;

    while (head < queue.length) {
        const current = queue[head++];
        const currentKey = keyOf(current);

        visitedNodes++;

        if (currentKey === keyOf(goal)) {
            return {
                path: reconstructPath(parents, goal),
                visitedNodes
            };
        }

        for (const direction of DIRECTIONS) {
            const next: Point = {
                row: current.row + direction.row,
                col: current.col + direction.col
            };

            if (
                next.row < 0 ||
                next.row >= maze.length ||
                next.col < 0 ||
                next.col >= maze[0].length ||
                maze[next.row][next.col] === 1
            ) {
                continue;
            }

            const nextKey = keyOf(next);

            if (visited.has(nextKey)) {
                continue;
            }

            visited.add(nextKey);
            parents.set(nextKey, currentKey);
            queue.push(next);
        }
    }

    return { path: null, visitedNodes };
}

// Min Heap dùng để quản lý các vị trí cần xét trong A*.
interface HeapItem {
    point: Point;
    g: number;
    f: number;
}

class MinHeap {
    private items: HeapItem[] = [];

    private hasHigherPriority(a: HeapItem, b: HeapItem): boolean {
        if (a.f !== b.f) {
            return a.f < b.f;
        }

        return a.g > b.g;
    }

    push(item: HeapItem): void {
        this.items.push(item);

        let index = this.items.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (!this.hasHigherPriority(
                this.items[index],
                this.items[parent]
            )) {
                break;
            }

            [this.items[index], this.items[parent]] =
                [this.items[parent], this.items[index]];

            index = parent;
        }
    }

    pop(): HeapItem | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        const result = this.items[0];
        const last = this.items.pop()!;

        if (this.items.length > 0) {
            this.items[0] = last;

            let index = 0;

            while (true) {
                const left = index * 2 + 1;
                const right = index * 2 + 2;
                let best = index;

                if (
                    left < this.items.length &&
                    this.hasHigherPriority(
                        this.items[left],
                        this.items[best]
                    )
                ) {
                    best = left;
                }

                if (
                    right < this.items.length &&
                    this.hasHigherPriority(
                        this.items[right],
                        this.items[best]
                    )
                ) {
                    best = right;
                }

                if (best === index) {
                    break;
                }

                [this.items[index], this.items[best]] =
                    [this.items[best], this.items[index]];

                index = best;
            }
        }

        return result;
    }

    get size(): number {
        return this.items.length;
    }
}

function heuristic(a: Point, b: Point): number {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

// A*: sử dụng Manhattan Distance làm heuristic.
export function findPathAStar(
    maze: Maze,
    start: Point,
    goal: Point
): PathResult {
    validateMaze(maze, start, goal);

    const openSet = new MinHeap();
    const startKey = keyOf(start);
    const goalKey = keyOf(goal);

    const gScores = new Map<string, number>([[startKey, 0]]);
    const parents = new Map<string, string | null>([
        [startKey, null]
    ]);

    const closed = new Set<string>();

    openSet.push({
        point: start,
        g: 0,
        f: heuristic(start, goal)
    });

    let visitedNodes = 0;

    while (openSet.size > 0) {
        const currentItem = openSet.pop()!;
        const current = currentItem.point;
        const currentKey = keyOf(current);

        // Bỏ qua bản ghi cũ trong Heap.
        if (currentItem.g !== gScores.get(currentKey)) {
            continue;
        }

        if (closed.has(currentKey)) {
            continue;
        }

        closed.add(currentKey);
        visitedNodes++;

        if (currentKey === goalKey) {
            return {
                path: reconstructPath(parents, goal),
                visitedNodes
            };
        }

        for (const direction of DIRECTIONS) {
            const next: Point = {
                row: current.row + direction.row,
                col: current.col + direction.col
            };

            if (
                next.row < 0 ||
                next.row >= maze.length ||
                next.col < 0 ||
                next.col >= maze[0].length ||
                maze[next.row][next.col] === 1
            ) {
                continue;
            }

            const nextKey = keyOf(next);

            if (closed.has(nextKey)) {
                continue;
            }

            const tentativeG = currentItem.g + 1;
            const oldG = gScores.get(nextKey);

            if (oldG !== undefined && tentativeG >= oldG) {
                continue;
            }

            gScores.set(nextKey, tentativeG);
            parents.set(nextKey, currentKey);

            openSet.push({
                point: next,
                g: tentativeG,
                f: tentativeG + heuristic(next, goal)
            });
        }
    }

    return { path: null, visitedNodes };
}