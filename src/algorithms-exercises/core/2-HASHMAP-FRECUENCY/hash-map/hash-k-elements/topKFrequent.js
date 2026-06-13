export function topKFrequent (arr, k = 2) {
    // 1. contar → hashmap
    const frecuency = new Map()

    for(const num of arr) {
        frecuency.set(num, (frecuency.get(num) || 0) + 1)
    }

    // 2. convertir → array
    const list = Array.from(frecuency.entries())

    // 3. ordenar → desc por freq
    list.sort((a,b) => b[1] - a[1])

    // 4. slice(k) → map a valores
    return list.slice(0,k).map(([num, freq]) => num)
}