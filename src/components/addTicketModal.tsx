import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export interface Props {
  handleSubmit: (data: any) => void;
}

const AddTicketModal: React.FC<Props> = (props) => {
  const { handleSubmit } = props;
  //Empty Input data state
  const [data, setData] = useState({
    subject: "",
    priority: "",
    status: "",
    description: "",
  });

  //List of Input fields
  const formInputs = ["subject", "priority", "status", "description"];

  //This Function handle any change done to inputs and save them in Data state according to their name and value
  const handleChange = (event: { target: { name: any; value: any } }) => {
    var { name, value } = event.target;
    data[name] = value;
    setData({ ...data });
  };
  const handleAddSubmit = (data) => {
    //Empty Current Data
    setData({ subject: "", priority: "", status: "", description: "" });
    //Submit Data
    handleSubmit(data);
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
            <Button onClick={() => handleAddSubmit(data)}>Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTicketModal;
