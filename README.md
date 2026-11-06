# Problem Solving & Data Organization

## 1. Project Overview

This project is developed as an individual assignment for the **Problem Solving & Data Organization** course.

The project focuses on implementing common algorithms, applying data structures to practical applications, and comparing the performance of BFS and A* pathfinding algorithms.

**Technologies:**
- TypeScript
- Node.js
- Vitest
- Git and GitHub

## 2. Project Structure

```text
problem-solving-data-organization/
├── src/
│   ├── algorithms/
│   ├── data-structures/
│   ├── optimization/
│   └── index.ts
├── tests/
│   ├── algorithms/
│   ├── data-structures/
│   └── optimization/
├── benchmarks/
│   └── maze.benchmark.ts
├── docs/
│   └── diagrams/
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## 3. Implemented Features

### Part 1: Algorithms

The project implements five algorithms:

1. Prime Number – finds the Nth prime number.
2. Reverse String – reverses a string without using the built-in reverse method.
3. Palindrome – checks whether a string is a palindrome.
4. Kth Largest – finds the Kth largest distinct element using a Min Heap.
5. Character Frequency – counts character occurrences using a Map.

### Part 2: Data Structures

Three practical applications are implemented:

1. Contact Manager
   - Uses a Hash Map to store and manage contacts.
   - Supports adding, searching, updating, and deleting contacts.

2. Game Leaderboard
   - Uses a Max Heap and Hash Map.
   - Supports adding players, updating scores, and retrieving rankings.

3. LRU Cache
   - Uses a Hash Map and Doubly Linked List.
   - Supports cache retrieval, insertion, and least-recently-used eviction.

### Part 3: Algorithm Optimization

The project compares two pathfinding algorithms:

- Breadth-First Search (BFS)
- A* Search

Both algorithms are tested on the same 60 × 60 maze.

The benchmark measures:
- Average execution time
- Median execution time
- Number of visited nodes
- Path length

## 4. Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd problem-solving-data-organization
```

Install dependencies:

```bash
npm install
```

## 5. Available Commands

Run all unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Check TypeScript types:

```bash
npm run typecheck
```

Run the maze benchmark:

```bash
npm run benchmark
```

## 6. Benchmark Results

The benchmark was performed using a 60 × 60 maze with 15 runs.

| Metric | BFS | A* |
|---|---:|---:|
| Average time | 4.5005 ms | 6.7445 ms |
| Median time | 4.6417 ms | 6.6559 ms |
| Visited nodes | 2,730 | 2,475 |
| Path length | 591 | 591 |

### Analysis

Both algorithms found paths with the same length of 591 cells.

A* visited 255 fewer nodes than BFS, reducing the number of visited nodes by approximately 9.34%.

However, BFS had a lower median execution time in this benchmark. A* requires additional heuristic calculations and priority queue operations, which can increase execution overhead.

The results show that fewer visited nodes do not always mean faster execution time. Performance depends on the maze structure and algorithm implementation.

## 7. Testing

Unit tests are implemented using Vitest.

The project includes tests for:
- Algorithm correctness
- Data structure operations
- Maze validation
- BFS and A* pathfinding
- Edge cases and invalid inputs

All tests should pass before submission.

## 8. Conclusion

This project provides practical experience in algorithm implementation, data structure application, unit testing, and performance analysis.

Through the BFS and A* comparison, the project demonstrates that algorithm efficiency should be evaluated using multiple metrics, including execution time and visited nodes.