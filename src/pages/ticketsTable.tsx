/* eslint-disable no-loop-func */
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "../styles/planRadar.scss";
import { Button } from "react-bootstrap";
import EditTicketModal from "../components/editTicketModal.tsx";

interface Props {
  rows: Array<{}>;
  handleEditTicket: (data: {}) => void;
}

const TicketsTable: React.FC<Props> = (props) => {
  let allRows = props.rows;
  const rowHeight = 70;
  const tableHeight = 900;
  const [state, setState] = useState({
    columns: Object.keys(allRows[0]),
    tableHeight: rowHeight * allRows.length,
    scroll: {
      top: 0,
      index: 0,
      end: Math.ceil((tableHeight * 2) / rowHeight),
    },
  });

  //Function fired when user scroll on the screen
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

  //This Function will generate the table rows based on screen showing area
  const generateRows = () => {
    let columns = state.columns;
    let index = state.scroll.index;
    let end = state.scroll.end;
    let items: any = [];

    do {
      if (index >= allRows.length) {
        index = allRows.length;
        break;
      }

      let tableRowStyle: any = {
        position: "absolute",
        top: index * rowHeight,
        left: 0,
        height: rowHeight,
      };

      let tableRows = (
        <tr
          style={tableRowStyle}
          className={`tr ${index % 2 === 0 ? "tr-odd" : "tr-even"}`}
          key={index}
        >
          {columns.map((column, i) => (
            <td
              key={i}
              onClick={(e) => column === "id" && handleEdit(e)}
              value={allRows[index][column]}
              className={column === "id" ? "id-column" : undefined}
              data-toggle={column === "id" && "tooltip"}
              data-placement={column === "id" && "top"}
              title={column === "id" ? "Click Edit Ticket" : undefined}
            >
              {allRows[index][column]}
            </td>
          ))}
        </tr>
      );
      items.push(tableRows);

      index++;
    } while (index < end);

    return items;
  };

  const tableAttrs = {
    className: "table-content",
    style: { height: tableHeight },
    onScroll: onScroll,
  };
  const [ticketData, setTicketData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  //
  const handleSubmit = (data: {}) => {
    props.handleEditTicket(data);
    setModalShow(false);
  };
  const handleEdit = (e: any) => {
    let index = e.target.attributes.value.value;

    allRows.filter((i: any) => {
      i.id == index && setTicketData(i);
    });
    setModalShow(true);
  };

  //Extra styles for table
  let tableBodyStyle = {
    position: "relative",
    display: "inline-block",
    height: tableHeight,
    maxHeight: tableHeight,
    width: "100%",
  };
  return (
    <div className={"wrapper"}>
      {/*Start Table header __________________________________*/}
      <table>
        <thead className={"table-head"}>
          <tr>
            {state.columns.map((name, i) => (
              <th key={i}>{name}</th>
            ))}
          </tr>
        </thead>
      </table>
      {/*End Table header __________________________________*/}

      <Table {...tableAttrs}>
        <tbody style={tableBodyStyle}>{generateRows()}</tbody>
      </Table>

      {/* Edit Ticket Modal PopUp menu______________________*/}
      <EditTicketModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleSubmit={handleSubmit}
        ticketData={ticketData}
      />
    </div>
  );
};
export default TicketsTable;
