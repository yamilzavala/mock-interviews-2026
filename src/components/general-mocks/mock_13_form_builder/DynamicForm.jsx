import React, { useState } from "react";

/**
 * 👉 Este sería tu schema (puede venir del backend)
 */
const schema = [
  { id: "name", type: "text", label: "Name", required: true },
  { id: "age", type: "number", label: "Age", required: true },
  {
    id: "role",
    type: "select",
    label: "Role",
    options: ["Admin", "User"],
    required: true,
  },
  // ejemplo de campo condicional
  {
    id: "adminCode",
    type: "text",
    label: "Admin Code",
    showIf: (values) => values.role === "Admin",
  },
];

/**
initial values
 */
const initialValues = {};
schema.forEach((field) => {
  initialValues[field.id] = ""; // todos empiezan vacíos
});

/**
 * 🧠 Componente principal
 */
export default function DynamicForm() {
  /**
   * 🧠 2. Estado del form
   *
   * 👉 values: lo que escribe el usuario
   * 👉 errors: validaciones
   */
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  /**
   * 🧠 3. Handler genérico de cambio
   *
   * 👉 no tenemos un handler por input
   * 👉 uno solo para todos → escalable
   */
  const handleChange = (id, value) => {
    setValues((prev) => ({
      ...prev,
      [id]: value, // solo actualiza ese campo
    }));
  };

  /**
   * 🧠 4. Validación
   *
   * 👉 recorre el schema (no hardcodea reglas)
   * 👉 esto permite escalar fácilmente
   */
  const validate = () => {
    const newErrors = {};

    schema.forEach((field) => {
      const value = values[field.id];

      // requerido
      if (field.required && !value) {
        newErrors[field.id] = "Required";
        return;
      }

      // tipo number
      if (field.type === "number" && value) {
        if (isNaN(value)) {
          newErrors[field.id] = "Must be a number";
        }
      }
    });

    return newErrors;
  };

  /**
   * 🧠 5. Submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 👉 normalizamos datos si hace falta (ej: number)
    const formattedValues = {
      ...values,
      age: Number(values.age),
    };

    console.log("SUBMIT:", formattedValues);
  };

  /**
   * 🧠 6. Render dinámico de campos
   *
   * 👉 este es el core del ejercicio
   */
  const renderField = (field) => {
    /**
     * 🧠 6.1 Conditional rendering
     *
     * 👉 si tiene showIf y no se cumple → no renderiza
     */
    if (field.showIf && !field.showIf(values)) {
      return null;
    }

    /**
     * 🧠 6.2 Render según tipo
     */
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={values[field.id]}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={values[field.id]}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case "select":
        return (
          <select
            value={values[field.id]}
            onChange={(e) => handleChange(field.id, e.target.value)}
          >
            <option value="">Select...</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  /**
   * 🧠 7. Render final
   */
  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field) => (
        <div key={field.id} style={{ marginBottom: 12 }}>
          <label>{field.label}</label>

          {renderField(field)}

          {/* 👉 mostramos error si existe */}
          {errors[field.id] && (
            <p style={{ color: "red" }}>{errors[field.id]}</p>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}