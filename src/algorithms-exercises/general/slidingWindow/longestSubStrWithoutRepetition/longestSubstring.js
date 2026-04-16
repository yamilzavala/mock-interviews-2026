export function longestSubstring(s) {
    let set = new Set()
    let left = 0;
    let max = 0;

    for(let right = 0; right < s.length; right++) {
        while(set.has(s[right])) {
            set.delete(s[left])
            left++;
        }

        set.add(s[right])
        max = Math.max(max, right - left + 1)
    }

    return max
}

// This is a variable-size sliding window problem because the window size changes dynamically based on a condition.

// I expand the window by moving the right pointer and adding characters to a set.

// If a duplicate character is found, I shrink the window from the left until the substring becomes valid again (no duplicates).

// At each step, I track the maximum window size.