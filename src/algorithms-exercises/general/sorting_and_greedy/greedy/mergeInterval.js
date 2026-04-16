export function mergeInterval(arr) {
    let result = []
    let current = arr[0]

    for(let i = 1; i < arr.length; i++){
        const next = arr[i]

        if(next[0] <= current[1]) {
            //merge
            current[1] = Math.max(current[1], next[1])
        } else {
            result.push(current)
            current = next;
        }
    }

    result.push(current)
    return result;
}