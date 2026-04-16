export function power_set(arr) {
  const result = [[]];
  
  for(const num of arr) {
    const size = result.length;

    for(let i = 0; i < size; i++) {
        result.push([...result[i], num])
    }
  }

  return result;
}