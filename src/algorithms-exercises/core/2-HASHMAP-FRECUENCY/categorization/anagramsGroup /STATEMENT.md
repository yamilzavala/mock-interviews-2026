🧩 Enunciado

👉 Group Anagrams

Dado un array de strings:

["eat", "tea", "tan", "ate", "nat", "bat"]

👉 devolver:

[
  ["eat", "tea", "ate"],
  ["tan", "nat"],
  ["bat"]
]
🎯 Qué significa

👉 agrupar palabras que sean anagramas
(es decir, mismas letras en distinto orden)

🎤 Pregunta

👉 explicame:

cómo lo resolverías
qué estructura usarías
complejidad
⚠️ FOLLOW-UP (te interrumpo)

“Sorting each string is expensive… can you do it more efficiently?”

💡 Este es MUY común porque mezcla:

hash maps
strings
performance

-------------------------------------------

💯 Versión ideal (sin sort permitido)

I would group anagrams using a hash map.

Instead of sorting each string, I would build a frequency count of characters for each word.

I use a fixed array of size 26 to represent character counts, and convert it into a string key.

This allows me to group words efficiently without sorting.

This approach runs in O(n * k) time, which is more efficient than sorting-based solutions.

Finally, I return the grouped values from the map.

--------------------------------------------

💯 Versión ideal (con orden permitido)

I use a HashMap where the key is a normalized version of the word.

For each word, I sort its characters to generate a canonical representation.

Anagrams will produce the same key, so I group them together in the map.

Finally, I return all the grouped values.