import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddTicketModal from "../components/addTicketModal.tsx";
import CardsPlanRadar from "./cardsPlanRadar.tsx";
import "../styles/planRadar.scss";

function PlanRadar(props) {
  const [people, setPeople] = useState(
    new Array(100).fill(true).map((val, id) => ({
      id: id + 1,
      subject: Math.random().toString(20).substring(8),
      priority: Math.random().toString(20).substring(8),
      status: Math.ceil(Math.random() * 80),
      description: Math.random().toString(20).substring(8),
    }))
  );

  const [modalShow, setModalShow] = useState(false);
  const handleSubmit = (data) => {
    data["id"] = people.length + 1;
    people.unshift(data);
    setPeople(people);
    setModalShow(false);
  };
  const handleEditTicket = (data) => {
    people.filter((item, i) => {
      if (item.id === data.id) {
        return (people[i] = data);
      }
      setPeople(people);
    });
  };

  return (
    <div>
      <div className="header">
        <h1>Records: {people.length}</h1>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add new ticket
        </Button>

        <AddTicketModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleSubmit={handleSubmit}
        />
      </div>

      <CardsPlanRadar
        rows={people.reverse()}
        handleEditTicket={handleEditTicket}
      />
    </div>
  );
}

export default PlanRadar;
