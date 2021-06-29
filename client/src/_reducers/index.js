import { combineReducers } from "redux";
import profile from "./profile_reducer";
import user from "./user_reducer";

const rootReducer = combineReducers({
  profile,
  user,
});

export default rootReducer;
