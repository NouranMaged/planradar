import { TICKET_STRUCTURE } from "./ticketStructureTypes";

const initialState = {
  show: false,
};

const ticketStructureReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_STRUCTURE:
      return { ...state, show: !state.show };

    default:
      return state;
  }
};
export default ticketStructureReducer;
