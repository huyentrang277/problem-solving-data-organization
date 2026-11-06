
// Tìm phần tử lớn thứ K trong mảng số nguyên.
export function findKthLargest(
    numbers: number[],
    k: number
): number {

    if (numbers.length === 0) {
        throw new Error("Mảng không được rỗng.");
    }

    if (!Number.isInteger(k) || k <= 0) {
        throw new Error("K phải là số nguyên dương.");
    }

    if (!numbers.every(Number.isInteger)) {
        throw new Error("Mảng chỉ được chứa số nguyên.");
    }

    // Loại bỏ các phần tử trùng lặp
    const uniqueNumbers = new Set(numbers);

    if (k > uniqueNumbers.size) {
        throw new Error("K vượt quá số phần tử phân biệt.");
    }

    // Min Heap lưu tối đa K phần tử lớn nhất
    const heap: number[] = [];

    // Thêm phần tử vào Min Heap
    function insert(value: number): void {
        heap.push(value);

        let index = heap.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (heap[parent] <= heap[index]) {
                break;
            }

            [heap[parent], heap[index]] =
                [heap[index], heap[parent]];

            index = parent;
        }
    }

    // Thay thế phần tử nhỏ nhất trong Heap
    function replaceRoot(value: number): void {
        heap[0] = value;

        let index = 0;

        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            let smallest = index;

            if (
                left < heap.length &&
                heap[left] < heap[smallest]
            ) {
                smallest = left;
            }

            if (
                right < heap.length &&
                heap[right] < heap[smallest]
            ) {
                smallest = right;
            }

            if (smallest === index) {
                break;
            }

            [heap[index], heap[smallest]] =
                [heap[smallest], heap[index]];

            index = smallest;
        }
    }

    // Duyệt các phần tử phân biệt
    for (const value of uniqueNumbers) {
        if (heap.length < k) {
            insert(value);
        } else if (value > heap[0]) {
            replaceRoot(value);
        }
    }

    // Gốc Heap là phần tử lớn thứ K
    return heap[0];
}
