import React from 'react';

const Checkbox = (props) => {
      const {form: {errors, dirty, touched}, field, name, id, label} = props;

      return (
            <div class="checkbox-wrap">
                  <input type="checkbox" id={id} className={`ch-checkbox checkbox-${name} ${field.value ? "ch-dirty" : "" } ${touched[name] && "touched"} ${errors[name] && "invalid"} ${dirty ? "dirty" : "" }`} /> 
                  <label htmlFor={name} class={`ch-label label-buyer-${name}`}>
                        <span class="ch-custom-checkbox"></span> 
                        <span className="ch-custom-label"><span>{label}</span></span> 
                  </label>
            </div>
      )
}

export default Checkbox;