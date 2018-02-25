import { type } from "../actions/message";

export default function(state = [], action) {
  switch (action.type) {
    case type.CREATE_MESSAGE_SUCCESS:
      return [action.response, ...state];
    case type.MESSAGE_SUCCESS:
      return action.response;
    default:
      return state;
  }
}
