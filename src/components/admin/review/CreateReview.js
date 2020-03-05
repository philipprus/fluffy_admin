import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import Upload from '../../orderComponent/Upload';
import Input from '../../orderComponent/Input';
import Textarea from '../../orderComponent/Textarea';
import Axios from 'axios';
import Select from '../../orderComponent/Select';

const CreateReview = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.callback && props.callback();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="mb-3" onClick={handleShow}>
        <div className="">
          <Button className="">Create review</Button>
        </div>
      </div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title> Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={ async (values,  {props, setSubmitting, resetForm, setStatus, setErrors}) => {
              setStatus("loading");
              await Axios.post("/api/review", values)
                  .then(function (response) {
                    if(response.status === 200) {
                        setTimeout(handleClose, 2000);
                    }
                  }).catch(({ response }) => {
                      console.log(response);
                });
            }}
          >
            {props => {
              const {values, errors, setFieldValue} = props;
            
            const handlerUpload = (path) => {
              setFieldValue('thumbnails', path);
            }
      
            const handlerDelete = () => {
              setFieldValue('thumbnails', '');
           }

            return (
              <form onSubmit={props.handleSubmit}>
                   <Field
                        label="Review"
                        component={Textarea} 
                        name="content"
                        id="content"
                      />
                       <Field
                        label="Social link"
                        component={Input}
                        name="social_link"
                        id="social_link"
                      />
                       <Field
                       label="Full name"
                        component={Input}
                        name="fullName"
                        id="fullName"
                      />
                        <Field
                        label="Email"
                        component={Input}
                        name="email"
                        id="email"
                      />
                      <Upload onChange={handlerUpload} name="thumbnails" id="thumbnails" value={values && values.photo} error={errors.photo} onDelete={handlerDelete} />
                      <Field name={'canvasPosition'} component={Select} placeholder="Status"  label="Status">
                                <option value="">Choose status</option>
                                <option value="DRAFT">DRAFT</option>
                                <option value="PUBLISH">PUBLISH</option>
                          </Field>
                <Button type="submit">Submit</Button>
              </form>
            )}}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateReview;
