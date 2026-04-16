

🧠 PATRÓN REAL — SLIDING WINDOW (template único)

👉 Este es el que tenés que memorizar:

let left = 0;

for (let right = 0; right < arr.length; right++) {
  // 1. expando ventana
  agregar(arr[right]);

  // 2. valido condición
  while (condición_no_valida) {
    sacar(arr[left]);
    left++;
  }

  // 3. actualizo resultado
  actualizar_resultado(left, right);
}
🔥 LA IDEA CLAVE

👉 Siempre:

right → EXPANDE
left → CONTRAE

👉 y la regla es:

mantené la ventana válida

----------------

⚡ VARIANTE 1 — Substring sin repetir (set)
let set = new Set();
let left = 0;
let max = 0;

for (let right = 0; right < s.length; right++) {
  while (set.has(s[right])) {
    set.delete(s[left]);
    left++;
  }

  set.add(s[right]);
  max = Math.max(max, right - left + 1);
}

👉 condición:
no puede haber repetidos

----------------

⚡ VARIANTE 2 — Máximo con K distintos (map)
let map = new Map();
let left = 0;
let max = 0;

for (let right = 0; right < arr.length; right++) {
  map.set(arr[right], (map.get(arr[right]) || 0) + 1);

  while (map.size > k) {
    map.set(arr[left], map.get(arr[left]) - 1);
    if (map.get(arr[left]) === 0) {
      map.delete(arr[left]);
    }
    left++;
  }

  max = Math.max(max, right - left + 1);
}

👉 condición:
como máximo k distintos

----------------

⚡ VARIANTE 3 — Ventana fija (k tamaño)

👉 ESTE es distinto (importante)

let windowSum = 0;

// primera ventana
for (let i = 0; i < k; i++) {
  windowSum += arr[i];
}

let max = windowSum;

// sliding
for (let i = k; i < arr.length; i++) {
  windowSum = windowSum - arr[i - k] + arr[i];
  max = Math.max(max, windowSum);
}

👉 acá NO hay while
👉 tamaño fijo

----------------

🧠 DIFERENCIA CLAVE ENTRE TIPOS
🟢 Ventana dinámica
tamaño cambia
usa while
while (condición) {
  left++;
}
🔵 Ventana fija
tamaño constante
no usa while
🎯 REGLA DE ORO

👉 preguntate:

¿Estoy trabajando con subarrays / substrings?
👉 sliding window
¿Necesito mantener una condición en una ventana?
👉 sliding window
¿la ventana crece y se achica?
👉 sliding window dinámica
----------------------------------------------

Fixed	              Variable
tamaño fijo (k)	    tamaño dinámico
1 loop	            for + while
no hay condición	  hay condición
suma directa	      expand + shrink

----------------------------------------------

🧠 La verdad que te destraba todo

Todos los problemas de sliding window se reducen a esto:

for (right ...) {
  // 1. EXPANDIR (agrego elemento)

  while (condición) {
    // 2. ACHICAR (saco elemento)
  }

  // 3. ACTUALIZAR resultado
}

🔥 Ahora te explico tus 3 ejemplos SIN humo
1️⃣ Longest Substring (sin repetir)
while(set.has(s[right]))
🧠 Traducción mental:

👉 “mientras haya duplicados → achico”

condición = rompí la regla
entonces achico

👉 objetivo: ventana válida (sin repetidos)

2️⃣ Maximum Sum Subarray (k fijo)
// no hay while
🧠 Traducción mental:

👉 “la ventana SIEMPRE mide k”

no hay condición
no decidís nada
simplemente corrés la ventana

👉 esto es sliding window pero modo automático

3️⃣ Minimum Subarray ≥ target
while(sum >= target)
🧠 Traducción mental:

👉 “ya cumplí → ahora achico para optimizar”

condición = ya es válida
entonces achico para mejorar

👉 objetivo: hacerla lo más chica posible

🎯 LA diferencia clave (esto es TODO)
Problema	Cuándo achico	Por qué
Longest substring	cuando está MAL	eliminar duplicados
Min subarray ≥ target	cuando está BIEN	optimizar tamaño
Fixed window	nunca decidís	tamaño fijo
🧠 Regla de oro (esto te salva en entrevistas)

👉 Preguntate SIEMPRE:

❓ ¿Cuándo debería mover left?

Y hay solo 3 respuestas posibles:

🔴 1. Cuando está inválido

👉 achico para arreglar

Ej:

duplicados
más de k caracteres
violación de regla
🟢 2. Cuando ya es válido

👉 achico para optimizar

Ej:

suma ≥ target
contiene todos los caracteres
cumple condición mínima
⚪ 3. Nunca (tamaño fijo)

👉 no decidís nada

🧠 Cómo pensarlo sin confundirte

En vez de pensar:

❌ “qué fórmula uso”

Pensá:

👉 “qué hace inválida la ventana?”
👉 “cuándo debería achicar?”

🔥 Ejercicio mental rápido (clave)

Si yo te digo:

“subarray con suma <= target”

👉 ¿qué harías?

Respuesta:

si sum > target → achico

💥 listo, ya sabés resolverlo

🧠 Cómo explicarlo en entrevista (nivel senior)

Sliding window no es una fórmula, es una técnica donde uso dos punteros. Expando la ventana con right y la contraigo con left dependiendo de si la ventana es inválida o si quiero optimizar el resultado.

🚨 Lo que te está pasando (y es normal)

No es que no entendés el patrón.

👉 Estás intentando memorizar en lugar de razonar

Y estos problemas:

NO se memorizan
se entienden con práctica de intuición
🎯 Te dejo una forma simple de entrenarlo

Cada vez que veas un problema:

¿Es subarray / substring? → sí → sliding window
¿Qué condición define válido?
¿Cuándo muevo left?

👉 y listo

Si querés, en el siguiente paso hacemos esto:

👉 te doy 3 problemas nuevos
y te hago pensar como en entrevista
(te guío paso a paso hasta que te salga solo)

Ahí es donde realmente te destrabás.

