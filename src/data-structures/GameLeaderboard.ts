export interface Player {
    id: string;
    name: string;
    score: number;
}

class MaxHeap {
    private heap: Player[] = [];

    private isHigherPriority(a: Player, b: Player): boolean {
        if (a.score !== b.score) {
            return a.score > b.score;
        }

        return a.id.localeCompare(b.id) < 0;
    }

    push(player: Player): void {
        this.heap.push(player);

        let index = this.heap.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (!this.isHigherPriority(
                this.heap[index],
                this.heap[parent]
            )) {
                break;
            }

            [this.heap[index], this.heap[parent]] =
                [this.heap[parent], this.heap[index]];

            index = parent;
        }
    }

    pop(): Player | undefined {
        if (this.heap.length === 0) {
            return undefined;
        }

        const top = this.heap[0];
        const last = this.heap.pop()!;

        if (this.heap.length > 0) {
            this.heap[0] = last;

            let index = 0;

            while (true) {
                const left = index * 2 + 1;
                const right = index * 2 + 2;
                let highest = index;

                if (
                    left < this.heap.length &&
                    this.isHigherPriority(
                        this.heap[left],
                        this.heap[highest]
                    )
                ) {
                    highest = left;
                }

                if (
                    right < this.heap.length &&
                    this.isHigherPriority(
                        this.heap[right],
                        this.heap[highest]
                    )
                ) {
                    highest = right;
                }

                if (highest === index) {
                    break;
                }

                [this.heap[index], this.heap[highest]] =
                    [this.heap[highest], this.heap[index]];

                index = highest;
            }
        }

        return top;
    }

    clone(): MaxHeap {
        const newHeap = new MaxHeap();

        for (const player of this.heap) {
            newHeap.push(player);
        }

        return newHeap;
    }
}

export class GameLeaderboard {
    private players = new Map<string, Player>();
    private heap = new MaxHeap();

    addPlayer(player: Player): void {
        if (this.players.has(player.id)) {
            throw new Error("Người chơi đã tồn tại.");
        }

        if (!Number.isFinite(player.score)) {
            throw new Error("Điểm số phải là số hợp lệ.");
        }

        const newPlayer = { ...player };

        this.players.set(player.id, newPlayer);
        this.heap.push(newPlayer);
    }

    updateScore(id: string, newScore: number): void {
        const player = this.players.get(id);

        if (!player) {
            throw new Error("Không tìm thấy người chơi.");
        }

        if (!Number.isFinite(newScore)) {
            throw new Error("Điểm số phải là số hợp lệ.");
        }

        const updatedPlayer = {
            ...player,
            score: newScore
        };

        this.players.set(id, updatedPlayer);
        this.heap.push(updatedPlayer);
    }

    getPlayer(id: string): Player | undefined {
        const player = this.players.get(id);

        return player ? { ...player } : undefined;
    }

    getTopPlayers(k: number): Player[] {
        if (!Number.isInteger(k) || k < 0) {
            throw new Error("K phải là số nguyên không âm.");
        }

        const result: Player[] = [];
        const tempHeap = this.heap.clone();

        while (result.length < k) {
            const player = tempHeap.pop();

            if (!player) {
                break;
            }

            const currentPlayer = this.players.get(player.id);

            // Bỏ qua điểm cũ sau khi người chơi được cập nhật.
            if (currentPlayer?.score !== player.score) {
                continue;
            }

            result.push({ ...player });
        }

        return result;
    }

    getAllPlayers(): Player[] {
        return this.getTopPlayers(this.players.size);
    }
}