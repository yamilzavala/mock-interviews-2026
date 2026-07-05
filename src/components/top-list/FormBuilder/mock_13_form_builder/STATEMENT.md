🧪 PARTE 1 — React
🧩 Enunciado

👉 Form Builder (Dynamic Form Rendering)

Escenario

Recibís una configuración:

const schema = [
  { id: "name", type: "text", label: "Name" },
  { id: "age", type: "number", label: "Age" },
  { id: "role", type: "select", label: "Role", options: ["Admin", "User"] },
];

🎯 Tenés que construir
Un componente que:
1️⃣ Render dinámico
renderiza inputs según el schema

2️⃣ Manejo de estado
guardar valores de cada campo

3️⃣ Validación
campos requeridos
tipos correctos

4️⃣ Submit
devuelve objeto:
{
  name: "John",
  age: 30,
  role: "Admin"
}

⚠️ Escenario real (te presiono)
“We want this to scale to many forms and avoid duplicating logic across the app.”

🎤 Pregunta
👉 explicame:
cómo estructurarías el estado
cómo harías el render dinámico
cómo manejarías validación
cómo harías esto reusable / escalable
cómo evitarías re-renders innecesarios

⚠️ FOLLOW-UP
“What if some fields depend on others (conditional rendering)?”

-------------------------------------------------

🎤 Cómo lo explicás como senior (versión simple)

Decí esto y listo:

"I would store the form state as an object keyed by field id.
Then I’d dynamically render inputs by looping through the schema.
Each input would update the state through a generic handler.
Validation would run on submit based on the field type.
This approach is scalable because the form is driven entirely by configuration."

I would store form values as an object keyed by field id.
I would dynamically render fields based on the schema using a switch or a mapping strategy.
Validation would be schema-driven, allowing reusable logic across forms.
To make this scalable, I would extract the logic into a custom hook like useForm.
Inputs would be controlled, updating state on change.
To optimize performance, I would split fields into separate components and memoize them.
For conditional fields, I would extend the schema with visibility rules based on current form values.
