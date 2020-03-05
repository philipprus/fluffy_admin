import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import axios from 'axios';
import { Field } from 'formik';
import { testimonials } from '../../utils/const';
import { Modal, Button } from 'react-bootstrap';

const StatusOrderForm = props => {
  const { errors, touched, handleSubmit, values } = props;
  const [show, setShow] = React.useState(false);
  const handleModalClose = () => setShow(false);

  useEffect(() => {
    if (values.status === 'not_confirmed') {
      setShow(true);
    }
  }, [values]);



  return (
    <form onSubmit={handleSubmit}>
      <Field
        name={'status'}
        placeholder="Choose canvas position"
        className={
          'form-control' + (errors.canvasPosition && touched.canvasPosition ? ' is-invalid' : '')
        }
        component="select"
      >
        <option value="new">New</option>
        <option value="inprocess">In Process</option>
        <option value="not_confirmed">Not confirmed</option>
        <option value="ready_to_dispatch">Ready to dispatch</option>
        <option value="in_delivery">In Delivery</option>
        <option value="complete">Complete</option>
      </Field>
      <button type="submit" className="btn btn-success">
        V
      </button>
      <div className="btn btn-danger" onClick={props.handlerCancel}>
        X
      </div>

      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field
            name={'notice'}
            className={
              'form-control' +
              (errors.canvasPosition && touched.canvasPosition ? ' is-invalid' : '')
            }
            component="textarea"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

const StatusOrderFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    status: props.status,
    id: props.id,
    notice: props.notice,
  }),
  handleSubmit: (values, { props }) => {
    const newValues = { ...props.order, ...values };
    axios
      .put('/api/order', newValues)
      .then(function(response) {
        if (response.status === 200) {
          const valid = response && response.data;
          props.setStatus(values.status);
          props.handlerCancel(valid);
        }
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
})(StatusOrderForm);

const StatusOrder = props => {
  const [isEdit, setEdit] = React.useState(false);
  const [status, setStatus] = React.useState(props.status);

  React.useEffect(()=> {
    setStatus(props.status);
  }, [props.status])

  const handlerCancel = () => {
    setEdit(false);
  };
  return isEdit ? (
    <StatusOrderFormik
      id={props.id}
      order={props.order}
      status={status}
      setStatus={setStatus}
      handlerCancel={handlerCancel}
    />
  ) : (
    <span className={`badge p-2 pl-3 pr-3 ${status}-color`} onClick={() => setEdit(true)}>
      {testimonials[status]}
    </span>
  );
};

export default StatusOrder;
