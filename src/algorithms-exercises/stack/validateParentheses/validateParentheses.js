export function validateParentheses(str) {
  const stack = [];

  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  const openings = Object.values(map);

  for (const char of str) {

    // 👉 ignorar basura
    if (!(char in map) && !openings.includes(char)) {
      continue;
    }

    // 👉 cierre
    if (char in map) {
      if (stack.length === 0) return false;

      const last = stack.pop();

      if (last !== map[char]) {
        return false;
      }

    } else {
      // 👉 apertura
      stack.push(char);
    }
  }

  return stack.length === 0;
}