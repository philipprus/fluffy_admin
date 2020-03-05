import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import mazel_tov from '../../images/mazel_tov.png';
import '../../css/modalPreview.css';
import logotype from '../../images/logotype.png';
import { Image } from 'react-bootstrap';

const ModalPreviewGiftCard = props => {
  const { amount, message } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <div className="modal-preview-gift-card-wrap">
          <img src={mazel_tov} alt="Mazal tov" className="img-fluid mt-3 mb-3" />

          <div className="click-image-wrap">
            <div className="click-image-link">Click image to preview</div>
          </div>
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
          <table
            border="0"
            style={{
              borderCollapse: 'collapse',
              borderSpacing: '0px',
              margin: '0px auto',
              width: '100%',
            }}
          >
            <tbody>
              <tr>
                <td
                  bgColor="#f3f3f3"
                  className="full-table-wrapper"
                  style={{
                                   }}
                >
                  <table
                    border="0"
                    style={{ borderCollapse: 'collapse', borderSpacing: '0px', margin: '0px auto' }}
                  >
                    <tbody>
                      <tr>
                        <td
                          valign="middle"
                          className="modal-preview-logo"
                          style={{ }}
                        >
                          <Image src={logotype} fluid alt="Logotype" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    bgcolor="ffffff"
                    className="full-width-table full-table-boxshadow"
                    border="0"
                    style={{
                     
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ padding: '0px' }}>
                          <table
                            border="0"
                            style={{
                              borderCollapse: 'collapse',
                              borderSpacing: '0px',
                              margin: '0px auto',
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    lineHeight: '0 !important',
                                    padding: '0px',
                                    textAlign: 'center',
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <td
                                  colspan="5"
                                  style={{
                                 
                                  }}
                                  id="mainImageContainer"
                                >
                                  <img
                                    width="100%"
                                    src="https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/mazel_tov_stars_noto_email_v2016_us-main._CB511823244_.png"
                                    alt=""
                                    border="0"
                                    style={{
                                      borderRadius: '4px 4px 0 0',
                                      width: '100% !important',
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    borderBottom: '1px solid rgb(238, 238, 238)',
                                    padding: '0px',
                                  }}
                                >
                                  <p
                                    className="gc-message gc-break-long-words"
                                    style={{
                                      wordBreak: 'keep-all',
                                      fontSize: '20px',
                                      color: '#333',
                                      lineHeight: '32px',
                                      margin: '0',
                                      padding: '30px',
                                    }}
                                  >
                                    {message}
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: '10px' }}>
                                  <table style={{ width: '100%' }}>
                                    <tbody>
                                      <tr>
                                        <td
                                          valign="middle"
                                          style={{
                                            fontSize: '40px',
                                            fontFamily: 'Arial, Helvetica, sans-serif',
                                            color: 'rgb(68, 68, 68)',
                                            padding: '30px, width: 70%',
                                          }}
                                        >
                                          <span style={{ lineHeight: '40px' }}>{amount} ils</span>
                                          <br />
                                          <br />
                                          <span
                                            style={{
                                              fontSize: '18px',
                                              fontFamily: 'Arial,Helvetica,sans-serif',
                                              color: '#868686',
                                            }}
                                          >
                                            Fluffy Gift Card
                                          </span>
                                        </td>
                                        <td
                                          rowSpan="2"
                                          valign="middle"
                                          style={{
                                            padding: '30px',
                                            textAlign: 'right',
                                            width: '30%',
                                          }}
                                        ></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    className="full-width-table"
                    border="0"
                    style={{
                      borderCollapse: 'separate',
                      borderSpacing: '20px',
                      margin: '0px auto',
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          valign="middle"
                          style={{ padding: '0px', textAlign: 'center', height: '40px' }}
                        >
                          &nbsp;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    bgcolor="444444"
                    border="0"
                    style={{
                      borderCollapse: 'collapse',
                      borderSpacing: '0px',
                      margin: '0px auto',
                      width: '100%',
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ padding: '10px' }}>
                          <table
                            className="full-width-table"
                            border="0"
                            style={{
                              borderCollapse: 'collapse',
                              borderSpacing: '0px',
                              margin: '0px auto',
                            }}
                          >
                            <tbody>
                              <tr>
                                <td colspan="3" style={{ padding: '0px', height: '36px' }}>
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: '0px', width: '100px' }}>&nbsp;</td>
                                <td
                                  style={{
                                    fontSize: '14px',
                                    border: '2px solid',
                                    color: 'rgb(201, 201, 201)',
                                    padding: '0px',
                                    textAlign: 'center',
                                    width: '300px',
                                  }}
                                >
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td style={{ padding: '10px' }}>
                                          Claim Code: XXXX-XXXX-XXXX-XXXX
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td style={{ padding: '0px', width: '100px' }}>&nbsp;</td>
                              </tr>
                              <tr>
                                <td style={{ padding: '0px' }}>&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
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

export default ModalPreviewGiftCard;
