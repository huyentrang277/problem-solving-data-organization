
// Kiểm tra chuỗi có phải Palindrome hay không.

export function isPalindrome(input: string): boolean {
    // Chuẩn hóa chuỗi và chuyển về chữ thường
    const normalized = input
        .normalize("NFC")
        .toLowerCase();

    // Chỉ giữ lại chữ cái, dấu kết hợp và chữ số
    const characters: string[] = [];

    for (const char of normalized) {
        if (/[\p{L}\p{M}\p{N}]/u.test(char)) {
            characters[characters.length] = char;
        }
    }

    // Sử dụng hai con trỏ để kiểm tra
    let left = 0;
    let right = characters.length - 1;

    while (left < right) {
        if (characters[left] !== characters[right]) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}
