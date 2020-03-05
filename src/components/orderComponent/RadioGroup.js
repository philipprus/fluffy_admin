import React from "react";

export const RadioButtonGroup = ({
      value,
      error,
      touched,
      id,
      label,
      className,
      children
    }) => {
    
      return (
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">{label}</label>
            <div>
            {children}
            </div>
        </div>
      );
    };
    