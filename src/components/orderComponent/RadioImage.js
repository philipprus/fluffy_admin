import React from "react";
import "../../css/RadioImage.css";

export const RadioImage = ({
      field: { name, value, onChange, onBlur },
      id,
      label,
      className,
      ...props
    }) => {
      return (
        <div className="radio-input-image">
          <input
            name={name}
            id={`cb+${id}`}
            type="radio"
            value={id} // could be something else for output?
            checked={id === value}
            onChange={onChange}
            onBlur={onBlur}
            className="radio-input-image-item"
            {...props}
          />
          <label htmlFor={`cb+${id}`} className="radio-input-image-src"><img src={label} alt={name} width={props.width ? props.width : 'auto' }  /><br/>{id}</label>
        </div>
      );
    };