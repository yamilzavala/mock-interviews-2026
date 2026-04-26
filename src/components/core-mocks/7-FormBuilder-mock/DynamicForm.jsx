import {useCallback, useState} from 'react'
import FieldRenderer from './FieldRenderer';

// schema
const schema = [
  { id: "name", type: "text", label: "Name", required: true },
  { id: "age", type: "number", label: "Age", required: true },
  { id: "address", type: "text", label: "Address", required: true },
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

// initial value
const getInitialValues = (schema) => {
    return schema.reduce((acc, curr) => {
        acc[curr.id] = ''
        return acc
    }, {})
}

const DynamicForm = () => {
  // states
  const [values, setValues] = useState(() => getInitialValues(schema))
  const [errors, setErrors] = useState({})

  // generic handler
  const onChangeHandler = useCallback((id, value) => {
    setValues((prev) => ({
        ...prev,
        [id]: value
    }))
  }, [])

  // validations
  const validationHandler = () => {
      const errors = {}
      
      schema.forEach(item => {
        const value = values[item.id]
        const itemId = item.id;

        // required
        if(item.required && !value) {
            errors[itemId] = `${item.label} required`;
            return;
        }    
    
        //number type
        if(item.type === 'number' && value && isNaN(Number(value))) {
            errors[itemId] = 'Must be a number'
        }
    })

    return errors
  }

  // handle submit
  const submitHandler = (e) => {
    e.preventDefault()

    const validatedErrors = validationHandler()

    if(Object.keys(validatedErrors).length > 0) {
        setErrors(validatedErrors)
        return;
    }

    console.log('SUBMIT: ', values)
  }

  return (
    <form 
    onSubmit={submitHandler} 
    style={{width: '300px'}}
    >
        {/* schema map */}
        {schema.map((field) => {
            if(field.showIf && !field.showIf(values)) return;

            return (
                <FieldRenderer 
                    field={field} 
                    value={values[field.id]} 
                    onChange={(event) => onChangeHandler(field.id, event.target.value)} 
                    error={errors[field.id]}
                />
            )
        })}
        <button 
        style={{width: '100%', height: '30px', marginTop: '10px', cursor: 'pointer'}} 
        type='submit'
        >
            Submit
        </button>
    </form>
  )
}

export default DynamicForm