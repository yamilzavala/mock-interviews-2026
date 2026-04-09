export function maximunSumSubArr(arr, k) {
    let windowSum = 0;

    // first window
    for(let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    let maxSum = windowSum;

    // sliding window
    for(let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i] // arr[i - k] => elemento que se va; arr[i] => elemento que entra
        maxSum = Math.max(maxSum, windowSum)
    }

    return maxSum;
}