import React from 'react'

const FieldRenderer = ({field, value, onChange, error}) => {

    // select
    if (field.type === 'select') {
        return (
            <div style={{padding: '15px 5px', borderRadius: '5px', border: 'solid 1px #ccc', marginTop: '5px'}}>
                <label htmlFor={field.id}>{field.label}</label>
                <select
                    id={field.id}
                    name={field.id}
                    value={value}
                    onChange={onChange}
                >
                    <option value=''>Select...</option>
                    {field.options.map((opt, idx) => (
                        <option key={idx} value={opt} id={opt}>{opt}</option>
                    ))}
                </select>

                {error && <p style={{color: 'red', marginTop: '8px'}}>{errors[field.id]}</p>}
            </div>
        )
    }

    // text or number
    return (
        <div style={{padding: '15px 5px', borderRadius: '5px', border: 'solid 1px #ccc', marginTop: '5px'}}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={value}
                onChange={onChange}
            />

            {error && <p style={{color: 'red', marginTop: '8px'}}>{errors[field.id]}</p>}
        </div>
    )
}

export default React.memo(FieldRenderer)