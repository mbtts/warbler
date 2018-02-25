import { combineReducers } from "redux";
import message from "./message";
import navItems from "./navItems";
import progress from "./progress";
import user from "./user";

export default combineReducers({
  message,
  navItems,
  progress,
  user
});
