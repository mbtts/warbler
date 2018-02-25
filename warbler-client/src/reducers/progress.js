import { combineReducers } from "redux";
import { type as messageType } from "../actions/message";
import { type as userType } from "../actions/user";

const createInProgressReducer = (request, success, failure) => {
  return (state = false, action) => {
    switch (action.type) {
      case request:
        return true;
      case success:
      case failure:
        return false;
      default:
        return state;
    }
  };
};

const createErrorMessageReducer = (request, success, failure) => {
  return (state = null, action) => {
    switch (action.type) {
      case request:
      case success:
        return null;
      case failure:
        return action.error.message;
      default:
        return state;
    }
  };
};

const createCompletedReducer = (success, reset) => {
  return (state = false, action) => {
    switch (action.type) {
      case success:
        return true;
      case reset:
        return false;
      default:
        return state;
    }
  };
};

const actions = [
  {
    key: "login",
    request: userType.LOGIN_REQUEST,
    success: userType.LOGIN_SUCCESS,
    failure: userType.LOGIN_FAILURE,
    reset: userType.LOGIN_RESET
  },
  {
    key: "createMessage",
    request: messageType.CREATE_MESSAGE_REQUEST,
    success: messageType.CREATE_MESSAGE_SUCCESS,
    failure: messageType.CREATE_MESSAGE_FAILURE,
    reset: messageType.CREATE_MESSAGE_RESET
  },
  {
    key: "register",
    request: userType.REGISTER_REQUEST,
    success: userType.REGISTER_SUCCESS,
    failure: userType.REGISTER_FAILURE,
    reset: userType.REGISTER_RESET
  }
];

const reducers = actions.reduce((reducers, action) => {
  const { key, request, success, failure, reset } = action;
  reducers[key] = combineReducers({
    inProgress: createInProgressReducer(request, success, failure),
    errorMessage: createErrorMessageReducer(request, success, failure),
    completed: createCompletedReducer(success, reset)
  });
  return reducers;
}, {});

export default combineReducers(reducers);
