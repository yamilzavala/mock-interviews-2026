// VERSION 1 - Si no te permiten ordenar las palabras

export function anagramsGroup(arr) {
    // Map key
    const map = new Map()

    for(const word of arr){
        // array de freciencias
        const freq = new Array(26).fill(0)

        // completo array con frecuencias
        for(const char of word) {
            const index = char.charCodeAt(0) - 97;
            freq[index]++;
        }

        //genero key unica
        const key = freq.join('#')

        //agrupo en el map
        if(!map.has(key)){
            map.set(key, [])
        }

        map.get(key).push(word)
    }

    //retorno los values del map
    return Array.from(map.values())
}




// VERSION 2 - Si te permiten ordenar las palabras
export function anagramsGroupSort(arr) {
    const map = new Map()

    for(const word of arr) {
        const key = word.split('').sort().join('')

        if(!map.has(key)){
            map.set(key, [])
        }

        map.get(key).push(word)
    }

    return Array.from(map.values())
}