import React from 'react';
import {CheckboxField} from './CheckboxField';
import { Field, ErrorMessage } from 'formik';



const GiftInformation = (props) => {
      const {
          errors,
          touched,
    } = props;
  
  
      return (
      <>
          <div className="mb-4" />
          <h4 className="mb-3">Gift information</h4>
          <div className="row">
              <div className="col-md-12 mb-3">
  
              <Field component={CheckboxField} id="addCard" label="add card +5$" name="addCard" />
              <Field component={CheckboxField} id="addPaper" label="add paper +5$" name="addPaper" />
              </div>
              <div className="col-md-12 mb-3">
                  <label htmlFor="сongratulation">Congratulation</label>
                  <Field name="сongratulation" component="textarea" className={ 'form-control' + (errors.сongratulation && touched.сongratulation ? ' is-invalid' : '')} />
                  <ErrorMessage name="сongratulation" component="div" className="invalid-feedback" />
              </div>
          </div>
      </>
      )
  }


  export default GiftInformation;