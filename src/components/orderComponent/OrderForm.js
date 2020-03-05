import React from 'react';
import { Field, ErrorMessage } from 'formik';
import {RadioButtonGroup} from './RadioGroup';
import {RadioImage} from './RadioImage';
import Upload from '../orderComponent/Upload';
import ShippingAddress from './ShipingComponent';
import {canvasSizeList} from '../common/priceTable';
import { dispatchDescription} from '../../utils/payment';
import "../../css/OrderForm.css";
import DatePicker from "./DatePicker";
import ModalBestPet from './ModalBestPet';
import Input from './Input';
import Textarea from './Textarea';
import RadioBorder from './RadioBorder';
import RadioGroupBorder from './RadioGroupBorder';
import Select from './Select';
import StyckyBoxComponent from './StyckyBoxComponent';
import AnimeStyle from "../../images/anime_crop.jpg";
import ColorfulStyle from "../../images/colorful_crop.jpg";
import StorytaleStyle from "../../images/storytale_crop.jpg";
import MemeStyle from "../../images/meme_crop.jpg";

const OrderFrom = (props) => {
    const { errors, touched, values, setFieldValue, handleSubmit, status } = props;
 
    
    const handlerUpload = (path) => {
        setFieldValue('photo', path);
      }

      const handlerDelete = () => {
       setFieldValue('photo', '');
     }
 
     if(status === "ide") return (
        <div className="container mt-5">
            <div className="row mb-5">
                <div className="col-md-12 mb-1 text-center">
                    <h2>Thank you</h2>
                    <p className="mt-2">
                        We recieved you order
                    </p>
                    <button className="btn btn-success" onClick={()=>{props.setStatus(undefined)}}>Make new order</button>
                </div>
            </div>
        </div>
     );
 
return (
    <form onSubmit={handleSubmit}>
      <div className="container mt-5">
          <div className="row mb-3">
            <div className="col-xs-12 col-md-12">
                <h1>Order</h1>
            </div>
        </div>
          <div className="row mb-5">
              <div className="col-md-12 col-lg-8 col-sm-12 col-xs-12">
                    <h4 className="header mb-3 mt-3">Order information</h4>
                  <div className="row ">
                      <div className="col-md-12 col-xs-12 mb-1">
                          <label htmlFor="photo">Upload photo*</label>
                        </div>
                        {
                            status === "loading" ? "Loading" : null

                        }

                        <div className={'col-md-12 col-xs-12 mb-1 text-center' + (errors && errors.photo ? ' is-invalid' : '')}>
                            <Upload onChange={handlerUpload} name="photo" id="photo" value={values && values.photo} error={errors.photo} onDelete={handlerDelete} />
                            <ModalBestPet/>


                        </div>
                        <div className="col-md-12 col-xs-12 mb-1">
                          <RadioButtonGroup id="style" label="Choose style*" value={values.radioGroup} error={errors.radioGroup} touched={touched.radioGroup}>
                              <Field component={RadioImage} width="100px" name="style" id="Colorfull" label={ColorfulStyle} />
                              <Field component={RadioImage} width="100px" name="style" id="Anime" label={AnimeStyle} />
                              <Field component={RadioImage} width="100px" name="style" id="Meme" label={MemeStyle} />
                              <Field component={RadioImage} width="100px" name="style" id="Storyline" label={StorytaleStyle} />
                          </RadioButtonGroup>
                      </div>

                      <div className="col-md-6 col-xs-12 mb-1">
                            <Field component={Select} label="Canvas size*" name="canvasSize"   placeholder="Canvas size"  className={ 'form-control' + (errors.canvasSize && touched.canvasSize ? ' is-invalid' : '')}>
                                {canvasSizeList.map( (canvas,index) => <option value={canvas.value} key={index}>{canvas.label}</option> )}                             
                            </Field>
                          <ErrorMessage name="canvasSize" component="div" className="invalid-feedback" />
                      </div>
                      <div className="col-md-6 col-xs-12 mb-1">
                          <Field name={'canvasPosition'} component={Select} placeholder="Canvas position*"  label="Canvas position*">
                                <option value="">Choose canvas position</option>
                                <option value="horizontal">Horizontal</option>
                                <option value="vertical">Vertical</option>
                          </Field>
                          <ErrorMessage name="canvasPosition" component="div" className="invalid-feedback" />
                      </div>
                      <div className="col-md-12 col-xs-12 mb-1">
                          <Field name="comments" component={Textarea} label="Comments" />
                          <ErrorMessage name="comments" component="div" className="invalid-feedback" />
                      </div>
                      <div className="col-md-12 col-xs-12 mb-2">
                          <Field id="extraPet" component={Input}  name="extraPet"  type="number" min={1} value={values.extraPet} label="Amount Characters" />
                          <ErrorMessage name="extraPet" component="div" className="invalid-feedback" />
                      </div>

  
                  </div>

                  <h4 className="header mb-3 mt-3">Customer Information</h4>
                  <div className="row">
                      <div className="col-md-6 col-xs-12 mb-1">
                          <div className="input-group">
                              <Field name="billingAddress_firstName"  id="billingAddress_firstName" component={Input} label="First name*" type="text"  />
                              <ErrorMessage name="billingAddress_firstName" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                      <div className="col-md-6 col-xs-12 mb-1">
                          <div className="input-group">
                              <Field name="billingAddress_lastName" id="billingAddress_lastName" component={Input}  label="Last name*" type="text"  />
                              <ErrorMessage name="billingAddress_lastName" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                      <div className="col-md-6 col-xs-12 mb-1">
                          <div className="input-group">
                              <Field name="billingAddress_email" id="billingAddress_email" component={Input} label="Email*" type="email" />
                              <ErrorMessage name="billingAddress_email" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                      <div className="col-md-6 col-xs-12  mb-1">
                          <div className="input-group">
                              <Field id="billingAddress_phone" name="billingAddress_phone" type="text" placeholder="Phone" label="Phone*"   component={Input} />
                              <ErrorMessage name="billingAddress_phone" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                  </div>

                  <h4 className="header mb-3 mt-3">Billing Address</h4>
                  <div className="row">
                      <div className="col-md-8 col-xs-12 mb-1">
                          <div className="input-group">
                              <Field name="billingAddress_address" id="billingAddress_address" component={Input} placeholder="Address*" type="text" label="Address*"/>
                              <ErrorMessage name="billingAddress_address" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                      <div className="col-md-4 col-xs-12 mb-1">
                          <div className="input-group">
                              <Field name="billingAddress_address2" id="billingAddress_address2" component={Input} type="text" label="Apt, suite, etc. (optional)" />
                              <ErrorMessage name="billingAddress_address2" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6 col-xs-12 mb-1">
                            <Field name='billingAddress_country'  id='billingAddress_country' label="Country" component={Select}  >
                                <option value="">Select your country</option>
                                <option value="Israel">Israel</option>
                            </Field>
                          <ErrorMessage name="country" component="div" className="invalid-feedback" />
                      </div>
                      <div className="col-md-6 mb-1">
                          <div className="input-group">
                              <Field name="billingAddress_zip" label="Postal code*" type="text" component={Input} />
                              <ErrorMessage name="billingAddress_zip" component="div" className="invalid-feedback" />
                          </div>
                      </div>
                  </div>
                  <h4 className="header mb-3 mt-3">Shipping Address</h4>
                 
                    <div className="row">
                        <div className="col-md-12">
                            <RadioGroupBorder  id="isSameShippingAddress">
                                <Field component={RadioBorder} id={"true"} label="Same as billing address" name="isSameShippingAddress" />
                                <Field component={RadioBorder} id={"false"} label="Use a different shipping address" name="isSameShippingAddress" />
                            </RadioGroupBorder>
                        </div>
                    </div>
                  {values.isSameShippingAddress === "false" ? <ShippingAddress {...props} /> : <></>}
                    <h4 className="header mb-3 mt-3">Shipping Method</h4>
                    <div className="row">
                        <div className="col-md-12 col-xs-12">
                            <RadioGroupBorder  id="shipping_type">
                                <Field component={RadioBorder} id={"pickup"} label="Pick up" price="Free" name="shipping_type" />
                                <Field component={RadioBorder} id={"israelPost"} label="Israel post" price={"40 ils"} name="shipping_type" />
                            </RadioGroupBorder>
                        </div>
                    </div>
                    <h4 className="header mb-3 mt-3">Dispatch date</h4>
                    <div className="row">
                        <div className="col-md-12 col-xs-12 d-flex align-items-center">
                            <div className="mr-4">
                                <Field component={DatePicker} type="date" className={ 'form-control' + (errors.dispatch_date && touched.dispatch_date ? ' is-invalid' : '')} name="dispatch_date" id="dispatch_date" />
                            </div>
                          {dispatchDescription(values.dispatch_date)}

                        </div>
                        <div className="col mt-2">
                           <p>This is a standart dispatch date, if you complete your order today.<br/>
                           More Fast options available for extra charge. Please check our calendar below.
                           </p>
                        </div>
                    </div>

              </div>
              <div className="col-md-12 col-lg-4 col-sm-12 col-xs-12">
                  <StyckyBoxComponent {...props} onSubmit={handleSubmit}  />
              </div>
          </div>
      </div>
  </form>
      )};


    

export default OrderFrom;