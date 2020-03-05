
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Input from './Input';
import Select from './Select';

const ShippingAddress = (props) => {

   
      return (
          <>
              <div className="mb-4" />
              <div className="row">
                  <div className="col-md-6 mb-1">
                      <div className="input-group">
                          <Field name="shippingAddress_firstName" id="shippingAddress_firstName"  component={Input}  label="First name*" type="text"  required />
                          <ErrorMessage name="shippingAddress_firstName" component="div" className="invalid-feedback" />
                      </div>
                  </div>
                  <div className="col-md-6 mb-1">
                      <div className="input-group">
                          <Field name="shippingAddress_lastName" id="shippingAddress_lastName"  component={Input}  label="Last name*" type="text" />
                          <ErrorMessage name="shippingAddress_lastName" component="div" className="invalid-feedback" />
                      </div>
                  </div>
                  <div className="col-md-6 mb-1">
                          <div className="input-group">
                              <Field name="shippingAddress_email" id="shippingAddress_email"  component={Input}  label="Email*" type="text"/>
                              <ErrorMessage name="shippingAddress_email" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                      <div className="col-md-6  mb-1">
                          <div className="input-group">
                              <Field name="shippingAddress_phone"  id="shippingAddress_phone"  component={Input}  type="text" label="Phone*"  />
                              <ErrorMessage name="shippingAddress_phone" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                  <div className="col-8 mb-1">
                      <div className="input-group">
                          <Field name="shippingAddress_address"  id="shippingAddress_address" component={Input}  label="Address*"  type="text" />
                          <ErrorMessage name="shippingAddress_address" component="div" className="invalid-feedback" />
                      </div>
                  </div>
                
                  <div className="col-4 mb-1">
                      <div className="input-group">
                          <Field name="shippingAddress_address2" id="shippingAddress_address2"  component={Input}  label="Apt, suite, etc. (optional)" type="text" />
                          <ErrorMessage name="shippingAddress_address2" component="div" className="invalid-feedback" />
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-6  mb-1">
                      <Field name='shippingAddress_country' id='shippingAddress_country' label="Country"   component={Select} required >
                                <option value="">Select your country</option>
                                <option value="israel">Israel</option>
                        </Field>
                      <ErrorMessage name="shippingAddress_country" component="div" className="invalid-feedback" />
                      <div className="invalid-feedback">
                          Please select a valid country.
                      </div>
                  </div>
                  <div className="col-md-6 mb-1">
                      <div className="input-group">
                          <Field name="shippingAddress_zip" label="Postal code*" type="text"  component={Input} />
                          <ErrorMessage name="shippingAddress_zip" component="div" className="invalid-feedback" />
                      </div>
                  </div>
              </div>
              <hr/>
              </>
          )
      }

export default ShippingAddress;