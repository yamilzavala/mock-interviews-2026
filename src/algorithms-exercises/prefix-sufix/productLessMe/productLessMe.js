export function productLessMe(arr) {
    const n = arr.length;
    const result = new Array(n).fill(1)

    let prefix = 1;
    for(let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= arr[i]
    }

    let sufix = 1;
    for(let i = n - 1; i >= 0; i--) {
        result[i] *= sufix;
        sufix *= arr[i]
    }

    return result;

}