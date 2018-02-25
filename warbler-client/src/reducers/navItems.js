import { type } from "../actions/user";

const AUTHENTICATED_NAV = ["new", "logout"];
const UNAUTHENTICATED_NAV = ["login", "register"];

export default function(state = UNAUTHENTICATED_NAV, action) {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
    case type.REGISTER_SUCCESS:
      return AUTHENTICATED_NAV;
    case type.LOGOUT:
      return UNAUTHENTICATED_NAV;
    default:
      return state;
  }
}
