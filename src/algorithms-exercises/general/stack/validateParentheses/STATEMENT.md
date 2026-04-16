🧩 Enunciado
👉 Validate Parentheses
Dado un string:
"({[]})"

👉 devolver:
true
❌ Ejemplo inválido
"({[})"
👉 false

🎯 Contexto real
👉 esto aparece en:
parsing
validaciones
formularios complejos

🎤 Pregunta
👉 explicame:
cómo lo resolverías
qué estructura usarías
complejidad

⚠️ FOLLOW-UP
“What if there are other characters in the string?”

------------------------------------------------------

💯 Versión ideal (nivel senior)
I would solve this using a stack and a map.
I iterate through the string, and for each character:
- If it's an opening bracket, I push it to the stack.
- If it's a closing bracket, I check if the stack is empty. If it is, I return false.
  Otherwise, I pop the last element and compare it with the expected opening bracket using the map.
At the end, I return true only if the stack is empty.
This runs in O(n) time and O(n) space.
If there are other characters, I would simply ignore them.



🧠 3. Estructura mental final (clave para entrevista)
“For each character, I check if it's an opening bracket and push it into the stack.
If it's a closing bracket, I validate it against the last element in the stack using a map.”

🔥 Bonus (nivel más alto)
Podés unificar todo así:
SI char está en map → es cierre  
SI NO → lo trato como apertura
👉 porque el map solo tiene cierres