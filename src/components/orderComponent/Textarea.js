import React from 'react';

const Textarea = (props) => {
      const [isFocus, setFocus] = React.useState(false);
      const {form: {errors, dirty, touched}, field, name, id, label, type, required} = props;

    const _onFocus = () => {
          if(!isFocus) {
                setFocus(true);
          }
        }
      const  _onBlur = (e) => {
            if (isFocus) {
                  field.onBlur(e);
                setFocus(false);
            };
        }
      return (
            <div className="input-wrap">
                  <textarea name={name} {...field}   onBlur={_onBlur}   onFocus={_onFocus}  id={id} className={`form-control ch-input input-${type} ${isFocus || field.value ? "ch-dirty" : "" } ${touched[name] && "touched"} ${errors[name] && "invalid"} ${dirty ? "dirty" : "" }`} data-vv-id={id} aria-required={required ? "true" : "false"}  >{field.value}</textarea> 
                  <label htmlFor={name} className="input-label"><span>{label}</span></label> 
                  {errors[name] && touched[name] && <div className="text-danger"><span>{errors[name]}</span></div>}
            </div> 
      )
}

export default Textarea;