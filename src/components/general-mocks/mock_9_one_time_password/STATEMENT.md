🧩 Enunciado

👉 Build an OTP (One-Time Password) Input Component

Requerimiento

Tenés que construir un componente que permita al usuario ingresar un código de verificación de 6 dígitos.

🎯 Comportamiento esperado
1️⃣ Inputs
Deben renderizarse 6 inputs individuales
Cada input acepta solo un dígito (0–9)
2️⃣ Auto-focus
Al escribir un número:
👉 el foco pasa automáticamente al siguiente input
Si es el último input:
👉 no cambia el foco
3️⃣ Backspace behavior
Si el input tiene valor:
👉 se borra ese valor
Si el input está vacío:
👉 el foco vuelve al input anterior
4️⃣ Paste (MUY importante)

Si el usuario pega un string:

123456

👉 El componente debe:

distribuir automáticamente los valores en los inputs
ignorar caracteres inválidos
completar de izquierda a derecha
5️⃣ Submit
Cuando los 6 inputs están completos:
👉 podés disparar un callback:
onComplete(code)
⚠️ Edge cases
pegar más de 6 caracteres
pegar letras o símbolos
borrar rápido
escribir muy rápido
🎯 Requisitos técnicos
componente reusable
no usar librerías externas
UX fluida
🎤 Pregunta

👉 Explicame:

cómo manejarías el estado
cómo manejarías el foco entre inputs
cómo implementarías paste
cómo manejarías backspace correctamente
cómo evitarías re-renders innecesarios

------------------------------------------------

💯 Versión ideal (nivel top candidate)

I would manage the state as an array of 6 values.
For focus management, I would use a ref array to store references to each input, and programmatically move focus after each valid input.
For paste handling, I would sanitize the input to keep only numeric values, slice it to the maximum length, and update the state in a single operation to avoid multiple re-renders.
For backspace, I would handle two cases:
- if the current input has a value, I clear it
- if it's empty, I move focus to the previous input
To optimize performance, I would minimize state updates, avoid inline handlers, and potentially memoize input components.