import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: any;
  handleSubmit: any;
}

const EditTicketModal: React.FC<Props> = (props) => {
  const [data, setData] = useState({
    subject: "",
    priotity: "",
    status: "",
    description: "",
  });
  const formInputs = ["subject", "priotity", "status", "description"];

  const handleChange = (event) => {
    var { name, value } = event.target;
    data[name] = value;
    setData({ ...data });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {formInputs.map((input, i) => {
            return (
              <Form.Group className="mb-3" controlId="formBasicInput" key={i}>
                <Form.Label>{input}</Form.Label>
                <Form.Control
                  type="subject"
                  placeholder={`Enter ${input}`}
                  onChange={handleChange}
                  name={input}
                  value={data[input].value}
                />
              </Form.Group>
            );
          })}

          <Modal.Footer>
            <Button onClick={() => props.handleSubmit(data)}>Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTicketModal;
