import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export interface Props {
  show: boolean;
  onHide: () => void;
  handleSubmit: (data: {}) => void;
  ticketData: {
    subject: string;
    priority: string;
    status: string;
    description: string;
    id: number;
  };
}

const EditTicketModal: React.FC<Props> = (props) => {
  var ticketData = props.ticketData;
  const [data, setData] = useState({
    subject: "",
    priority: "",
    status: "",
    description: "",
    id: 0,
  });
  //List of Input fields
  const formInputs = ["subject", "priority", "status", "description"];

  //Once Edit Modal us opened the selected Ticket data is passed to the inputs data state
  useEffect(() => {
    setData({
      subject: ticketData.subject,
      priority: ticketData.priority,
      status: ticketData.status,
      description: ticketData.description,
      id: ticketData.id,
    });
  }, [ticketData]);

  //This Function handle any change done to inputs and save them in Data state according to their name and value
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
          Edit Ticket of ID:{data.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.keys(ticketData)?.length !== 0 &&
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
