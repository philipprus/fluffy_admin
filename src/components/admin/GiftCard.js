import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { testimonials } from '../../utils/const';
import { withFormik } from 'formik';
import { Field } from 'formik';
import Loader from 'react-loader-spinner';
import DatePicker from '../orderComponent/DatePicker';
import { useDataApi } from '../../utils/utils';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GiftCard = props => {
  const orderId = props.match.params.id;
  console.log(orderId);
  const [{ data, isLoading, isError }] = useDataApi(`/api/giftcard/${orderId}`, []);

  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <NavLink to="/admin/giftcard">Back to orders</NavLink>
          </div>
        </div>
      </div>

      {isLoading ? <div>Loading ...</div> : <AdminOrderFormik {...data} />}
    </>
  );
};

const GiftCardForm = props => {
  const { errors, touched, values, handleSubmit } = props;

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
            </div>

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
                      (errors.expireDate && touched.expireDate ? ' is-invalid' : '')
                    }
                    name="expireDate"
                    id="expireDate"
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Amount</div>
                  {values.amount} ils
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-muted small">Days till dispatch</div>
                  {values.expireDate} days
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
    to: props.to,
    amount: props.amount,
    id: props._id,
    billingAddress_firstName: props.billingAddress_firstName,
    billingAddress_lastName: props.billingAddress_lastName,
    billingAddress_email: props.billingAddress_email,
    billingAddress_phone: props.billingAddress_phone,

    coupon: props.coupon,
    message: props.message,
    from: props.from,
    addPaper: props.addPaper,
    isAgree: props.isAgree,
    payment_type: props.payment_type,
    payment_number: props.payment_number,
    created: props.created,
    expireDate: props.expireDate,
    status: props.status || 'new',
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
})(GiftCardForm);

export default GiftCard;
