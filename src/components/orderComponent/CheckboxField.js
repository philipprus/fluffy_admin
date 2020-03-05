
import React from 'react'

export const CheckboxField = ({
      field: { name, value, onChange, onBlur },
      form: { errors, touched, setFieldValue },
      id,
      label,
      className,
      ...props
    }) => {
      return (
             <div  className="custom-control custom-checkbox">
          <input
            name={name}
            id={id}
            type="checkbox"
            value={value}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            className="custom-control-input" 
          />
          <label  className="custom-control-label"  htmlFor={id}>{label}</label>
        </div>
      );
    };