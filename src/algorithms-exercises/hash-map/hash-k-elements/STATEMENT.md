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
I would first build a frequency map.
Instead of sorting, I would use a bucket sort approach, where each index represents a frequency.
I group numbers by frequency and then iterate from highest frequency to lowest, collecting the top K elements.
This reduces the time complexity to O(n), which is more efficient for large datasets.

🔥 Cómo explicarlo como senior
👉 Esto es clave para la entrevista:
“First, I build a frequency map in O(n).
Then I convert it into an array and sort it by frequency in descending order.
Finally, I take the first k elements.”