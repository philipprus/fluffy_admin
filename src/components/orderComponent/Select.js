import React from 'react';

const Select = (props) => {
      const {form: {errors, dirty, touched}, field, name, id, label, required} = props;

    
    
      return (
            <div className="select-wrap">
                  <select id={id} name={name}  autoComplete={name} className={`form-control  ch-select select-shipping-country  ch-dirty  ${touched[name] && "touched"} ${errors[name] && "invalid"} ${dirty ? "dirty" : "" }`}  data-vv-id={id} aria-required={required ? "true" : "false"} {...field} > 
                        {props.children}
                  </select> 
                  <label htmlFor={name} className="input-label"><span>{label}</span></label> 
                  <div className="ch-select-arrow"></div> 
                  {errors[name] && touched[name] && <div className="text-danger"><span>{errors[name]}</span></div>}
            </div>
                  
      )
}

export default Select;