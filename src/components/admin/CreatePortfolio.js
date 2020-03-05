import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import Upload from '../orderComponent/Upload';
import Textarea from '../orderComponent/Textarea';
import Axios from 'axios';
import { canvasSizeList } from '../common/priceTable';

const CreatePortfolio = props => {
  const [show, setShow] = useState( false);
  const {callback} = props;
  const handleClose = () => {
    setShow(false);
    callback && callback();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="modal-preview-gift-card-wrap" onClick={handleShow}>
        <div className="mb-4">
          <Button className="">Create portfolio</Button>
        </div>
      </div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.open || show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title> Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            callback={callback}
            onSubmit={async (values, { props, setSubmitting, resetForm, setStatus, setErrors }) => {
              setStatus('loading');
                await Axios.post('/api/portfolio/', values)
                  .then(function(response) {
                    if (response.status === 200) {
                      setTimeout(handleClose, 2000);
                      props.callback && props.callback();
                    }
                  })
                  .catch(({ response }) => {
                    console.log(response);
                  });
            }}
          >
            {props => {
              const { values, errors, touched, setFieldValue } = props;

              const handlerUpload = path => {
                setFieldValue('image', path);
              };

              const handlerDelete = () => {
                setFieldValue('image', '');
              };

              return (
                <form onSubmit={props.handleSubmit}>
                  <Upload
                    onChange={handlerUpload}
                    name="image"
                    id="image"
                    value={values && values.image}
                    error={errors.image}
                    onDelete={handlerDelete}
                  />
                  <Field
                    name="style"
                    id="style"
                    placeholder="Style"
                    className={
                      'form-control mb-2' + (errors.style && touched.style ? ' is-invalid' : '')
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
                  <Field
                    component="select"
                    name="size"
                    placeholder="Choose canvas size"
                    className={
                      'form-control mb-2' + (errors.size && touched.size ? ' is-invalid' : '')
                    }
                  >
                    {canvasSizeList.map((canvas, index) => (
                      <option value={canvas.value} key={index}>
                        {canvas.label}
                      </option>
                    ))}
                  </Field>
                  <Field
                    label="Description"
                    component={Textarea}
                    name="description"
                    id="description"
                  />

                  <Button type="submit">Submit</Button>
                </form>
              );
            }}
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

export default CreatePortfolio;
