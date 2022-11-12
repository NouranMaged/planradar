import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import EditTicketModal from "../components/editTicketModal.tsx";
import "../styles/planRadar.scss";

interface Props {
  rows: object;
  handleEditTicket: () => void;
}
const CardsPlanRadar: React.FC<Props> = (props) => {
  let allRows = props.rows;
  const rowHeight = 225;
  const tableHeight = 1000;
  const [state, setState] = useState({
    columns: Object.keys(allRows[0]),
    tableHeight: rowHeight * allRows.length,
    scroll: {
      top: 0,
      index: 0,
      end: Math.ceil((tableHeight * 2) / rowHeight),
    },
  });

  const onScroll = ({ target }) => {
    let scrollTop = target.scrollTop;
    let index = Math.floor(scrollTop / rowHeight);
    setState({
      ...state,
      scroll: {
        index: Math.floor(scrollTop / rowHeight),
        end: index + Math.ceil((tableHeight * 2) / rowHeight),
        top: (scrollTop / rowHeight) * rowHeight,
      },
    });
  };
  const [modalShow, setModalShow] = useState(false);
  const handleSubmit = (data) => {
    props.handleEditTicket(data);
    setModalShow(false);
  };
  const generateRows = () => {
    let index = state.scroll.index;
    let end = state.scroll.end;
    let items: array = [];
    do {
      if (index >= allRows.length) {
        index = allRows.length;
        break;
      }
      let tableRows = allRows.map(
        (
          row: {
            subject: string;
            status: string;
            priority: string;
            description: string;
          },
          i
        ) => {
          return (
            <Card
              key={i}
              style={{
                margin: "20px",
                top: index * rowHeight,
                left: 0,
                height: rowHeight,
              }}
            >
              <Card.Body>
                <Card.Header>
                  <strong>Subject:</strong> {row.subject}
                </Card.Header>
                <Card.Title className="mb-2 text-muted">
                  Priority: {row.priority}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Status: {row.status}
                </Card.Subtitle>
                <Card.Text>Description: {row.description}</Card.Text>
                <>
                  <Button variant="primary" onClick={() => handleEdit(row)}>
                    Edit
                  </Button>
                </>
              </Card.Body>
            </Card>
          );
        }
      );
      items.push(tableRows);
      index++;
    } while (index < end);

    return items;
  };

  const tableAttrs = {
    className: "box-content",
    style: { height: tableHeight },
    onScroll: onScroll,
  };
  const [ticketData, setTicketData] = useState({});
  const handleEdit = (row: object) => {
    setTicketData(row);
    setModalShow(true);
  };

  return (
    <div className="wrapper">
      <div
        {...tableAttrs}
        style={{
          height: tableHeight,
          maxHeight: tableHeight,
          width: "1100px",
        }}
      >
        {generateRows()}
      </div>
      <EditTicketModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleSubmit={handleSubmit}
        ticketData={ticketData}
      />
    </div>
  );
};
export default CardsPlanRadar;
