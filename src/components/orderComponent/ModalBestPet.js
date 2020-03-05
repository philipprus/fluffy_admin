import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

function ModalBestPet(props) {
      const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    
      return (
        <>
          <Button variant="primary"  className="mb-2 mt-5" onClick={handleShow}>
          Photo and comments tips
          </Button>
    
          <Modal {...props} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
              <Modal.Title> Photo and comments tips.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <p>
                        Hi, Pet lover!
                  </p>
<p>The photograph I receive from you as well as comments I use as a references to my artwork. There are some important tips to reach the best results and reflect unique character of your Pet, neither style you gonna choose:</p>
<ol>
      <li>Good quality and resolution
      </li>
      <li>Good lighting
      </li>
      <li>Realistic colors

      </li>
      <li>Choose photo with exact position of your pet you wanna have on artwork
      </li>
      <li> If you send multiple pets photo, please, dedicate in a comment: how many pets you wanna have on artwork and which one. 
<br/>Please note, that there are an extra charge for each extra Pet.
            </li>
            <li>If there are any important accessory you wanna keep from the photo background or add, please let me know in a comment. Otherwise, background will be on my consideration.
<br/>Please note, that there are extra charge for adding accessories as well as keeping detailed background.
            </li>
         
</ol>
<p>
For some styles there are an extra important requirements:
</p>
1. Meme : Big head photo. Better to use photos with emotional pet faces.<br/>
2. Dressed portrait: Portrait made on a a pet level (try to use nose as a center point). Front or side horizontal light. Very detailed good quality photo. Please wright in a comment preferred pet dress style and landscape.  

<p>Please note, that I keep the rights for artistic vision, as styles Im painting and offering are not 100% photorealistic.</p> </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }

    export default ModalBestPet;