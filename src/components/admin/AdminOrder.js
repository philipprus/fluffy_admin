import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { testimonials } from '../../utils/const';
import { withFormik } from 'formik';
import { Field } from 'formik';
import { canvasSizeList } from '../common/priceTable';
import Loader from 'react-loader-spinner';
import DatePicker from '../orderComponent/DatePicker';
import { summeryOrder, averageNowDispatch } from '../../utils/payment';
import { useDataApi } from '../../utils/utils';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminOrder = props => {
  const orderId = props.match.params.id;
  const [{ data, isLoading, isError }] = useDataApi(`/api/order/${orderId}`, []);
  
  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <NavLink to="/admin">Back to orders</NavLink>
          </div>
        </div>
      </div>

      {isLoading ? <div>Loading ...</div> : <AdminOrderFormik {...data} />}
    </>
  );
};

const AdminOrderForm = props => {
  const { errors, touched, values, handleSubmit, setFieldValue } = props;

  const notify = () => {
    toast.info('Save!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (props.status) {
      notify();
    }
  }, [props.status]);

  useEffect(() => {
    if (values.status !== 'not_confirmed') {
      setFieldValue('notice', `Dear ${values.billingAddress_firstName},`);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-responsive">
        <div className="container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold py-3 mb-4">
            Order <span className="text-muted">{values.id}</span>
          </h4>

          <div className="card">
            <div className="card-body">
              <h6 className="small font-weight-semibold">Item</h6>

              <div className="table-responsive">
                <table className="table table-bordered m-0 text-center">
                  <tbody>
                    <tr>
                      <td className="p-4">
                        <a
                          href={values.photo && values.photo[0].src}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={values.photo && values.photo[0].thumbnail}
                            className="d-block ui-w-40 ui-bordered m-auto mr-4"
                            alt=""
                          />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-body pb-1">
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Status</div>
                  <Field
                    name={'status'}
                    placeholder="Choose canvas position"
                    className={
                      'form-control' +
                      (errors.canvasPosition && touched.canvasPosition ? ' is-invalid' : '')
                    }
                    component="select"
                  >
                    <option value="new">New</option>
                    <option value="not paid">Not paid</option>
                    <option value="inprocess">In Process</option>
                    <option value="not_confirmed">Not confirmed</option>
                    <option value="ready_to_dispatch">Ready to dispatch</option>
                    <option value="in_delivery">In Delivery</option>
                    <option value="complete">Complete</option>
                  </Field>
                </div>
                <div className="col-md-6 mb-3">
                  {values.status === 'not_confirmed' && (
                    <>
                      <div className="text-muted small">Notice</div>
                      <Field
                        component="textarea"
                        className={
                          'form-control' +
                          (errors.canvasPosition && touched.canvasPosition ? ' is-invalid' : '')
                        }
                        name="notice"
                        id="notice"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="card-body pb-1">
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Style</div>
                  <Field
                    name="style"
                    placeholder="Style"
                    className={
                      'form-control' + (errors.style && touched.style ? ' is-invalid' : '')
                    }
                    component="select"
                    required
                  >
                    <option value="">Style</option>
                    <option value="Colorfull">Colorfull</option>
                    <option value="Anime">Anime</option>
                    <option value="Meme">Meme</option>
                    <option value="Storyline">Storyline</option>
                  </Field>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Position</div>
                  <Field
                    name={'canvasPosition'}
                    placeholder="Choose canvas position"
                    className={
                      'form-control' +
                      (errors.canvasPosition && touched.canvasPosition ? ' is-invalid' : '')
                    }
                    component="select"
                  >
                    <option value="">Choose canvas position</option>
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                  </Field>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Size</div>
                  <Field
                    component="select"
                    name="canvasSize"
                    placeholder="Choose canvas size"
                    className={
                      'form-control' +
                      (errors.canvasSize && touched.canvasSize ? ' is-invalid' : '')
                    }
                  >
                    {canvasSizeList.map((canvas, index) => (
                      <option value={canvas.value} key={index}>
                        {canvas.label}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Amount</div>
                  <Field
                    name="extraPet"
                    type="number"
                    min={1}
                    value={values.extraPet}
                    className={
                      'form-control' + (errors.extraPet && touched.extraPet ? ' is-invalid' : '')
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="m-0" />

            <div className="card-body pb-1">
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Created Date</div>
                  {moment(values.created).format('DD/MM/YYYY, h:mm:ss a')}
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Dispacth Date</div>
                  <Field
                    component={DatePicker}
                    created_date={values.created}
                    type="date"
                    className={
                      'form-control' +
                      (errors.dispatch_date && touched.dispatch_date ? ' is-invalid' : '')
                    }
                    name="dispatch_date"
                    id="dispatch_date"
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Amount Characters</div>
                  {summeryOrder(values)} ils
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Days till dispatch</div>
                  {averageNowDispatch(values.dispatch_date)} days
                </div>
              </div>
            </div>
            <hr className="m-0" />

            <div className="card-body">
              <h6 className="small font-weight-semibold">Billing Info</h6>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">First name</div>
                  <Field
                    name="billingAddress_firstName"
                    placeholder="First name*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.billingAddress_firstName && touched.billingAddress_firstName
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Last name</div>
                  <Field
                    name="billingAddress_lastName"
                    placeholder="Last name*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.billingAddress_lastName && touched.billingAddress_lastName
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Phone</div>
                  <Field
                    name="billingAddress_phone"
                    type="text"
                    placeholder="Phone*"
                    className={
                      'form-control' +
                      (errors.billingAddress_phone && touched.billingAddress_phone
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Email</div>
                  <Field
                    name="billingAddress_email"
                    placeholder="Email*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.billingAddress_email && touched.billingAddress_email
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Country</div>
                  <Field
                    name="billingAddress_country"
                    placeholder="Country"
                    className={
                      'form-control' +
                      (errors.billingAddress_country && touched.billingAddress_country
                        ? ' is-invalid'
                        : '')
                    }
                    component="select"
                  >
                    <option value="">Country</option>
                    <option value="Israel">Israel</option>
                  </Field>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">ZIP Code</div>
                  <Field
                    name="billingAddress_zip"
                    placeholder="Zip*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.billingAddress_zip && touched.billingAddress_zip ? ' is-invalid' : '')
                    }
                  />
                </div>
                <div className="col-3  mb-3">
                  <div className="text-muted small">Address</div>
                  <Field
                    name="billingAddress_address"
                    placeholder="Address*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.billingAddress_address && touched.billingAddress_address
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-3  mb-3">
                  <div className="text-muted small">Address 2</div>
                  <Field
                    name="billingAddress_address2"
                    placeholder="Address 2"
                    type="text"
                    className={
                      'form-control' +
                      (errors.billingAddress_address2 && touched.billingAddress_address2
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-3  mb-3">
                  <div className="text-muted small">Payment Type</div>
                  {testimonials[values.payment_type]}
                </div>
                <div className="col-3  mb-3">
                  <div className="text-muted small">Payment Number</div>
                  {values.payment_number}
                </div>
              </div>
            </div>
            <hr className="m-0" />

            <div className="card-body">
              <h6 className="small font-weight-semibold">Shipping Info</h6>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">First Name</div>
                  <Field
                    name="shippingAddress_firstName"
                    placeholder="First name*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.shippingAddress_firstName && touched.shippingAddress_firstName
                        ? ' is-invalid'
                        : '')
                    }
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Last Name</div>
                  <Field
                    name="shippingAddress_lastName"
                    placeholder="Last name*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.shippingAddress_lastName && touched.shippingAddress_lastName
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Phone</div>
                  <Field
                    name="shippingAddress_phone"
                    type="text"
                    placeholder="Phone*"
                    className={
                      'form-control' +
                      (errors.shippingAddress_phone && touched.shippingAddress_phone
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Email</div>
                  <Field
                    name="shippingAddress_email"
                    placeholder="Email*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.shippingAddress_email && touched.shippingAddress_email
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Country</div>
                  <Field
                    name="shippingAddress_country"
                    placeholder="Choose canvas size"
                    className={
                      'form-control' +
                      (errors.shippingAddress_country && touched.shippingAddress_country
                        ? ' is-invalid'
                        : '')
                    }
                    component="select"
                    required
                  >
                    <option value="">Country</option>
                    <option value="Israel">Israel</option>
                  </Field>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">ZIP Code</div>
                  <Field
                    name="shippingAddress_zip"
                    placeholder="Zip*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.shippingAddress_zip && touched.shippingAddress_zip
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-3  mb-3">
                  <div className="text-muted small">Address</div>
                  <Field
                    name="shippingAddress_address"
                    placeholder="Address*"
                    type="text"
                    className={
                      'form-control' +
                      (errors.shippingAddress_address && touched.shippingAddress_address
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-3  mb-3">
                  <div className="text-muted small">Address 2</div>
                  <Field
                    name="shippingAddress_address2"
                    placeholder="Address 2"
                    type="text"
                    className={
                      'form-control' +
                      (errors.shippingAddress_address2 && touched.shippingAddress_address2
                        ? ' is-invalid'
                        : '')
                    }
                  />
                </div>
                <div className="col-3  mb-3">
                  <div className="text-muted small">Shipping Type</div>
                  <Field
                    name={'shipping_type'}
                    placeholder=""
                    className={
                      'form-control' +
                      (errors.canvasPosition && touched.canvasPosition ? ' is-invalid' : '')
                    }
                    component="select"
                  >
                    <option value="pickup">Pick up</option>
                    <option value="israelpost">Israel Post +40ils</option>
                  </Field>
                </div>
                <div className="col-3  mb-3">
                  <div className="text-muted small">Shipping Total</div>
                  {values.payment_number}
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Tracking Number</div>
                  <Field
                    name="tracking_number"
                    type="text"
                    className={
                      'form-control' +
                      (errors.tracking_number && touched.tracking_number ? ' is-invalid' : '')
                    }
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Tracking link</div>
                  <Field
                    name="tracking_link"
                    type="text"
                    className={
                      'form-control' +
                      (errors.tracking_link && touched.tracking_link ? ' is-invalid' : '')
                    }
                  />
                </div>
              </div>
            </div>
            <hr className="m-0" />

            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3"></div>
                <div className="col-md-6 mb-3 text-right">
                  <button type="submit" className="btn btn-success">
                    {' '}
                    Update{' '}
                    {props.isSubmitting && (
                      <Loader type="Circles" color="#ffffff" height={20} width={20} />
                    )}
                  </button>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={4000} />
    </form>
  );
};

const AdminOrderFormik = withFormik({
  enableReinitialize: true,
  validate: values => {
    let errors = {};
    if (values.status === 'in_delivery' && !values.tracking_link) {
      errors.tracking_link = 'Required';
    }

    if (values.status === 'in_delivery' && !values.tracking_number) {
      errors.tracking_number = 'Required';
    }
    return errors;
  },
  mapPropsToValues: props => ({
    photo: props.photo,
    style: props.style,
    canvasSize: props.canvasSize,
    canvasPosition: props.canvasPosition,
    comments: props.comments,
    extraPet: props.extraPet,
    id: props._id,
    billingAddress_firstName: props.billingAddress_firstName,
    billingAddress_lastName: props.billingAddress_lastName,
    billingAddress_email: props.billingAddress_email,
    billingAddress_phone: props.billingAddress_phone,
    billingAddress_address: props.billingAddress_address,
    billingAddress_address2: props.billingAddress_address2,
    billingAddress_country: props.billingAddress_country,
    billingAddress_zip: props.billingAddress_zip,

    shippingAddress_firstName: props.shippingAddress_firstName
      ? props.shippingAddress_firstName
      : props.billingAddress_firstName,
    shippingAddress_lastName: props.shippingAddress_lastName
      ? props.shippingAddress_lastName
      : props.billingAddress_lastName,
    shippingAddress_email: props.shippingAddress_email
      ? props.shippingAddress_email
      : props.billingAddress_email,
    shippingAddress_phone: props.shippingAddress_phone
      ? props.shippingAddress_phone
      : props.billingAddress_phone,
    shippingAddress_address: props.shippingAddress_address
      ? props.shippingAddress_address
      : props.billingAddress_address,
    shippingAddress_address2: props.shippingAddress_address2
      ? props.shippingAddress_address2
      : props.billingAddress_address2,
    shippingAddress_country: props.shippingAddress_country
      ? props.shippingAddress_country
      : props.billingAddress_country,
    shippingAddress_zip: props.shippingAddress_zip
      ? props.shippingAddress_zip
      : props.billingAddress_zip,

    isGift: props.isGift,
    coupon: props.coupon,
    сongratulation: props.сongratulation,
    addCard: props.addCard,
    notice: props.notice,
    addPaper: props.addPaper,
    isAgree: props.isAgree,
    payment_type: props.payment_type,
    shipping_type: props.shipping_type,
    payment_number: props.payment_number,
    order_total: props.order_total,
    created: props.created,
    dispatch_date: props.dispatch_date,
    status: props.status || 'new',
    total: props.total,
    tracking_link: props.tracking_link,
    tracking_number: props.tracking_number,
  }),
  handleSubmit: (values, bag) => {
    bag.setStatus(undefined);
    axios
      .put('/api/order', values)
      .then(function(response) {
        if (response.status === 200) {
          bag.setSubmitting(false);
          bag.setStatus(true);
        }
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
})(AdminOrderForm);

export default AdminOrder;
