
// Kiểm tra một số có phải số nguyên tố hay không.

function isPrime(num: number): boolean {
    if (num < 2) {
        return false;
    }

    if (num === 2) {
        return true;
    }

    if (num % 2 === 0) {
        return false;
    }

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

/**
 * Tìm số nguyên tố thứ N.
 */
export function findNthPrime(n: number): number {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error("N phải là số nguyên dương.");
    }

    let count = 0;
    let current = 2;

    while (count < n) {
        if (isPrime(current)) {
            count++;
        }

        if (count < n) {
            current++;
        }
    }

    return current;
}
