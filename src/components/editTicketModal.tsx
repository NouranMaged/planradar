import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  handleSubmit: () => void;
  ticketData: {
    subject: string;
    priotity: string;
    status: string;
    description: string;
    id: string;
  };
}

const EditTicketModal: React.FC<Props> = (props) => {
  var ticketData = props.ticketData;
  const [data, setData] = useState({
    subject: "",
    priotity: "",
    status: "",
    description: "",
    id: "",
  });
  useEffect(() => {
    setData({
      subject: ticketData.subject,
      priotity: ticketData.priotity,
      status: ticketData.status,
      description: ticketData.description,
      id: ticketData.id,
    });
  }, [ticketData]);
  const formInputs = ["subject", "priotity", "status", "description"];

  const handleChange = (event: { target: { name: string; value: string } }) => {
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
          Edit Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.keys(ticketData).length !== 0 &&
            formInputs.map((input, i) => {
              return (
                <Form.Group className="mb-3" controlId="formBasicInput" key={i}>
                  <Form.Label>{input}</Form.Label>
                  <Form.Control
                    type="subject"
                    placeholder={`Enter ${input}`}
                    onChange={handleChange}
                    name={input}
                    value={data[input] ? data[input] : ""}
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
