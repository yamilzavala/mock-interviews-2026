// agrego → valido → achico → evalúo → actualizo

export function longestSubStrWithK(str, k) {
    let left = 0;
    let max = 0;
    let map = new Map()

    for(let right = 0; right < str.length; right++) {
        let currVal = str[right];

        // agrego valores al map
        map.set(currVal, (map.get(currVal) || 0) + 1)

        // condicion
        while(map.size > k) {
            let leftVal = str[left]
            map.set(leftVal, map.get(leftVal) - 1);
            if(map.get(leftVal) === 0) {
                map.delete(leftVal)
            }

            left++;
        }

        //actualizo
        const windowSize = right - left + 1;
        if(map.size === k) {
            max = Math.max(max, windowSize)
        }
    }

    return max;
} 

