import React from 'react';

const RadioBorder = ({
      field: { name, value, onChange, onBlur },
      id,
      label,
      className,
      price,
      ...props
    }) => {
      return (
            <li>
                  <label>
                        {/* <input type="radio" checked={id === value} name={name} onBlue={onBlur} onChange={onChange} value={value} />  */}
                        <input
                              name={name}
                              type="radio"
                              value={id} // could be something else for output?
                              checked={id === value}
                              onChange={onChange}
                              onBlur={onBlur}
                        />
                        <span className="ch-custom-radio"></span> 
                        <span className="ch-custom-label"><span>{label}</span></span>
                        {price && <span className="pull-right price"> {price} </span>}
                  </label>
            </li>
      )
}

export default RadioBorder;