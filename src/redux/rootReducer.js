import { combineReducers } from "redux";
import cakeReducer from "./cake/cakeReducer";
import ticketStructureReducer from "./ticketStructure/ticketStructureReducer";

const rootReducer = combineReducers({
  cake: cakeReducer,
  ticketStructure: ticketStructureReducer,
});
export default rootReducer;
