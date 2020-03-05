import React from 'react';
import "../../css/Accordion.css";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const AccordionCustom = (props) => {
  const {data} = props;    

      if(data === undefined ) return "No data"; 
    return (
      <Accordion defaultActiveKey="0" className="accordion-list">

          {data.map((data, key) => {
            return (
                <AccordionItem {...data} key={key} />
            )
          })}
      </Accordion>
    )
}

const AccordionItem  = (props) => {
    
    return (
                          <Card  className='accordion-item__line'>
                            <Card.Header className="accordion-item__title">
                              <span  className='accordion-item__icon'/>
                              <Accordion.Toggle as={Button} variant="link" eventKey={props.key + props.id}>
                                {props.title}
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={props.key + props.id}>
                              <Card.Body className="accordion-item__content">
                                {props.paragraph}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                   
    )
  }

export default AccordionCustom;