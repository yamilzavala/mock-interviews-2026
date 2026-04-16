resultado[i] = (producto izquierda) * (producto derecha)

-------------------------------------------

🧠 PATRÓN REAL — PREFIX / SUFFIX (template único)

👉 Este es el que tenés que memorizar:

const result = new Array(n).fill(1);

// 1. pasada izquierda → derecha (prefix)
// igualo y multiplico
let prefix = 1;
for (let i = 0; i < n; i++) {
  result[i] = prefix;
  prefix *= arr[i];
}

// 2. pasada derecha → izquierda (suffix)
// multiplico y multiplico
let suffix = 1;
for (let i = n - 1; i >= 0; i--) {
  result[i] *= suffix;
  suffix *= arr[i];
}