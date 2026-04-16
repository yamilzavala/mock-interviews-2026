// Input: nums = [2,3,1,2,4,3], target = 7
// Output: 2  // [4,3]

export function shorterSubArrWithTarget(target, nums) {
  let left = 0;              // inicio de la ventana
  let sum = 0;               // suma actual de la ventana
  let minLength = Infinity;  // resultado (buscamos el mínimo)

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]; // expando la ventana hacia la derecha

    // mientras cumpla la condición, intento achicar la ventana
    while (sum >= target) {
      const currentLength = right - left + 1;
      minLength = Math.min(minLength, currentLength);

      sum -= nums[left]; // saco el elemento de la izquierda
      left++;            // achico la ventana
    }
  }

  // si nunca encontramos una ventana válida, devolvemos 0
  return minLength === Infinity ? 0 : minLength;
}

// Uso sliding window de tamaño variable. Expando la ventana hasta que la suma sea mayor o igual al target, 
// y luego la contraigo desde la izquierda para encontrar el tamaño mínimo. Esto garantiza O(n) porque 
// cada elemento entra y sale de la ventana una sola vez.