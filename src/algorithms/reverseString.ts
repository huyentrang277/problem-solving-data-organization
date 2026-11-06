
// Đảo ngược chuỗi mà không sử dụng reverse().

export function reverseString(input: string): string {
    const characters: string[] = [];

    // Đưa từng ký tự vào mảng
    for (const char of input) {
        characters[characters.length] = char;
    }

    // Đảo ngược thứ tự bằng vòng lặp
    const result: string[] = [];

    for (let i = characters.length - 1; i >= 0; i--) {
        result[result.length] = characters[i];
    }

    // Ghép các ký tự thành chuỗi
    return result.join("");
}
