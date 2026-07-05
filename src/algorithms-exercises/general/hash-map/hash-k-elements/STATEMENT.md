🧩 Enunciado
👉 Top K Frequent Elements

Dado:
[1,1,1,2,2,3], k = 2

👉 devolver:
[1,2]

🎯 Contexto real
👉 aparece en:
analytics
dashboards
logs
trending features

🎤 Pregunta
👉 explicame:
cómo lo resolverías
qué estructura usarías
complejidad

⚠️ FOLLOW-UP
“What if the dataset is very large (millions of elements)?”

-----------------------------------

💯 Versión ideal (respuesta de entrevista)
🔥 Cómo explicarlo como senior
👉 Esto es clave para la entrevista:
“First, I build a frequency map in O(n).
Then I convert it into an array and sort it by frequency in descending order.
Finally, I take the first k elements.”