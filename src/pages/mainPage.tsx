import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddTicketModal from "../components/addTicketModal.tsx";
import "../styles/planRadar.scss";
import TicketsTable from "./ticketsTable.tsx";

export interface data {
  subject: string;
  priority: string;
  status: string;
  description: string;
  id: number;
}
const MainPage = () => {
  //set Array of 10000
  const [tickets, setTickets] = useState(
    new Array(10000).fill(true).map((val, id) => ({
      id: id + 1,
      subject: Math.random().toString(20).substring(8),
      priority: Math.random().toString(20).substring(8),
      status: Math.random().toString(20).substring(8),
      description: Math.random().toString(20).substring(8),
    }))
  );
  //state to show/hide Add new ticket modal
  const [modalShow, setModalShow] = useState(false);

  //Function fired when user add new ticket
  const handleSubmit = (data: data) => {
    data["id"] = tickets.length + 1;
    tickets.unshift(data);
    setTickets(tickets);
    setModalShow(false);
  };

  //Function fired when user Edit exsiting ticket
  const handleEditTicket = (data: data) => {
    tickets.filter((item, i) => {
      if (item.id === data.id) {
        return (tickets[i] = data);
      }
      setTickets(tickets);
    });
  };

  return (
    <div>
      <div className="header">
        {/* Start of header ____________________________________________*/}
        <h1>Records: {tickets.length}</h1>
        <Button
          variant="primary"
          className="general-btn"
          onClick={() => setModalShow(true)}
        >
          Add new ticket
        </Button>
        {/* End of Header _________________________________________*/}
      </div>
      {/* TicketsTable_____________________________________________ */}

      <TicketsTable
        rows={tickets.reverse()}
        handleEditTicket={handleEditTicket}
      />
      {/* _________________________________________________________________ */}
      {/* Add New Ticket Modal_____________________________________________ */}
      <AddTicketModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default MainPage;
