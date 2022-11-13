import { combineReducers } from "redux";
import ticketStructureReducer from "./ticketStructure/ticketStructureReducer";

const rootReducer = combineReducers({
  ticketStructure: ticketStructureReducer,
});
export default rootReducer;
