import React from 'react';
import '../../css/RadioGroupBorder.css';

const RadioGroupBorder = (props) => {
      return (
            <ul className="bordered-ul with-hover" id={props.id}>
                  {props.children}
            </ul>
      )
};


export default RadioGroupBorder;
