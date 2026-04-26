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

------

I would approach this by designing a schema-driven form system where the entire UI, behavior, and validation are derived from a configuration object. This allows the solution to scale across many forms without duplicating logic.

I would structure the state as a single object keyed by field IDs to keep it predictable and easy to update, along with a separate errors object for validation. This makes the data model simple and scalable as the form grows.

For dynamic rendering, I would iterate over the schema and map each field to a reusable FieldRenderer component. This keeps the UI generic and decoupled from the form logic, avoiding hardcoded inputs.

Validation would be handled through a centralized function that evaluates each field based on rules defined in the schema, such as required or type constraints. This makes validation consistent and easy to extend with more complex rules.

On submit, I would validate all fields and only proceed if there are no errors, returning a clean object representing the form state.

To ensure reusability and scalability, I would keep business rules like required or conditional logic (showIf) inside the schema, so adding new forms only requires defining a new configuration.

To optimize performance and avoid unnecessary re-renders, I would memoize field components with React.memo, use stable handlers with useCallback, and avoid passing unnecessary props like the entire values object.

For conditional fields, I would use a declarative showIf function in the schema to determine visibility based on current state, keeping dependencies explicit and centralized.

If the form needed to scale further, I would consider integrating a validation library like Zod or a form management library like React Hook Form to improve performance and maintainability.