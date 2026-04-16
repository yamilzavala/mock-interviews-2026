export function maxSubarrayAverage(arr, k) {
    let maxSum;
    let sum = 0;
    let left = 0;
    
    // suma de los k primeros elementos (no incluido arr[k])
    for(let i = 0; i < k; i++) {
        sum += arr[i]
    }
    maxSum = sum;

    for(let right = k; right < arr.length; right++) {
        // desplazo la ventana sacando el primer el y agregando el ste el
        sum = sum - arr[left] + arr[right]
        left++;

        // actualizo el valor con el mayor promedio
        maxSum = Math.max(maxSum, sum)

    }
    //retorno el mayor promedio
    return maxSum / k;
}


export function maxSumSubArr(arr, k) {
    let maxSum;
    let sum = 0;
    let left = 0;
    
    // suma de los k primeros elementos (no incluido arr[k])
    for(let i = 0; i < k; i++) {
        sum += arr[i]
    }
    maxSum = sum;

    for(let right = k; right < arr.length; right++) {
        // desplazo la ventana sacando el primer el y agregando el ste el
        sum = sum - arr[left] + arr[right]
        left++;

        // actualizo el valor con el mayor 
        maxSum = Math.max(maxSum, sum)

    }
    //retorno el mayor
    return maxSum;
}

