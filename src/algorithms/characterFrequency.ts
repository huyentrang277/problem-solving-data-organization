export function characterFrequency(input: string): Map<string, number> {
    const frequency = new Map<string, number>();

    for (const char of input) {
        const count = frequency.get(char) ?? 0;
        frequency.set(char, count + 1);
    }

    return frequency;
}