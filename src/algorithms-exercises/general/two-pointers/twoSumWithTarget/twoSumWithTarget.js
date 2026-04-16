// 👉 Orden de las cosas dentro del loop:
// Calculás sum
// Calculás diff
// Actualizás resultado (SI corresponde)
// Evaluás si terminás (sum === target)
// Movés punteros

export function twoSumWithTarget(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    let closestDiff = Infinity;
    let result = [];

    while(left < right) {
        const sum = arr[left] + arr[right];
        const diff = Math.abs(sum - target);

        if(diff < closestDiff) {
            closestDiff = diff;
            result = [arr[left], arr[right]]
        } 

        if(sum === target) {
            return result;
        }

        if(sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return result
}