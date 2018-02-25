import { type } from "../actions/user";

export default function(state = null, action) {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
    case type.REGISTER_SUCCESS:
      return action.response;
    case type.LOGOUT:
      return null;
    default:
      return state;
  }
}
