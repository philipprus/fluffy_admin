import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import {isDateInThisWeek, isDateInAfterWeek} from "../../utils/payment"

const DatePickerField = ({ field: {name, value }, form: {setFieldValue}, className, created_date }) => {
      const nowDay = created_date ? new Date(created_date) : new Date();
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={val => {
        setFieldValue(name, val);
      }}
      dateFormat="dd/MM/yyyy"
      minDate={addDays(nowDay, 3)}
      dayClassName={date => {

                        if (isDateInThisWeek(date) ) {
                              return "super-express-date"
                        } 
                        if (isDateInAfterWeek(date)) {
                              return "express-date"
                        }

                  }     
          }
      excludeDates={[nowDay, addDays(nowDay, 1),  addDays(nowDay, 2),  addDays(nowDay, 3)]}
      className={className}
    />
  );
};

export default DatePickerField;
