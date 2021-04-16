import { combineReducers } from "redux";
import TaskListReducer from "../reducers/TaskListReducer";

const rootReducer = combineReducers({
  TaskListReducer,
});

export default rootReducer;
