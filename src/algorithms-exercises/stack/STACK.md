🧠 PATRÓN REAL — STACK (template mental)

👉 Este es el equivalente al de two pointers, pero para estructuras anidadas

const stack = [];

for (const char of str) {

  if (esApertura(char)) {
    stack.push(char);
  } 
  
  else if (esCierre(char)) {

    // ❌ no hay nada para cerrar
    if (stack.length === 0) return false;

    const last = stack.pop();

    // ❌ no coincide el tipo
    if (!match(last, char)) return false;
  }
}

// ❌ quedaron cosas sin cerrar
return stack.length === 0;


-------------------------

SI es apertura → push

SI es cierre → 
    1. buscar qué debería cerrar (map)
    2. mirar último del stack
    3. comparar
    4. si coincide → pop
    5. si no → false

map[cierre] → apertura esperada
stack.pop() → apertura real
comparás ambas