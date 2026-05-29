export function productLessMe(arr) {
    const n = arr.length;
    const result = new Array(n).fill(1)

    let prefix = 1;
    for(let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= arr[i]
    }

    let suffix = 1;
    for(let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= arr[i]
    }

    return result;

}


// naive
function naiveWay(arr) {
    const left = new Array(arr.length).fill(1)
    const right = new Array(arr.length).fill(1)
    const result = new Array(arr.length)

    let prefix = 1;
    for(let i = 0; i < arr.length; i++) {
        left[i] = prefix;
        prefix *= arr[i];
    }

    let suffix = 1;
    for(let i = arr.length - 1; i >= 0; i--) {
        right[i] = suffix;
        suffix *= arr[i];
    }

    for(let i = 0; i < arr.length; i++) {
        result[i] = left[i] * right[i];
    }

    return result;
}
