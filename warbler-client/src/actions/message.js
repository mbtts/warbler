import * as api from "../util/api";

import { apiCall } from "../middleware/apiMiddleware";

const type = {
  CREATE_MESSAGE_REQUEST: "message/CREATE_MESSAGE_REQUEST",
  CREATE_MESSAGE_SUCCESS: "message/CREATE_MESSAGE_SUCCESS",
  CREATE_MESSAGE_FAILURE: "message/CREATE_MESSAGE_FAILURE",
  CREATE_MESSAGE_RESET: "message/CREATE_MESSAGE_RESET",
  MESSAGE_REQUEST: "message/MESSAGE_REQUEST",
  MESSAGE_SUCCESS: "message/MESSAGE_SUCCESS",
  MESSAGE_FAILURE: "message/MESSAGE_FAILURE"
};

const createMessage = (message, userId, token) =>
  apiCall(
    [
      type.CREATE_MESSAGE_REQUEST,
      type.CREATE_MESSAGE_SUCCESS,
      type.CREATE_MESSAGE_FAILURE
    ],
    api.createMessage,
    [message, userId, token]
  );

const createMessageReset = () => ({ type: type.CREATE_MESSAGE_RESET });

const listMessages = () =>
  apiCall(
    [type.MESSAGE_REQUEST, type.MESSAGE_SUCCESS, type.MESSAGE_FAILURE],
    api.getMessages
  );

export { type, createMessage, createMessageReset, listMessages };
