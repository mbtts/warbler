import * as api from "../util/api";
import * as localStorage from "../util/localStorage";

import { apiCall } from "../middleware/apiMiddleware";

const type = {
  LOGIN_REQUEST: "user/LOGIN_REQUEST",
  LOGIN_SUCCESS: "user/LOGIN_SUCCESS",
  LOGIN_FAILURE: "user/LOGIN_FAILURE",
  LOGIN_RESET: "user/LOGIN_RESET",
  REGISTER_REQUEST: "user/REGISTER_REQUEST",
  REGISTER_SUCCESS: "user/REGISTER_SUCCESS",
  REGISTER_FAILURE: "user/REGISTER_FAILURE",
  REGISTER_RESET: "user/REGISTER_RESET",
  LOGOUT: "user/LOGOUT"
};

const checkSession = dispatch => {
  const user = localStorage.read(localStorage.key.USER);
  if (user) {
    dispatch({
      type: type.LOGIN_SUCCESS,
      response: user
    });
  }
};

const login = (email, password) =>
  apiCall(
    [type.LOGIN_REQUEST, type.LOGIN_SUCCESS, type.LOGIN_FAILURE],
    async () => {
      const user = await api.login(email, password);
      localStorage.write(localStorage.key.USER, user);

      return user;
    }
  );

const register = (email, username, password, profileImageUrl) =>
  apiCall(
    [type.REGISTER_REQUEST, type.REGISTER_SUCCESS, type.REGISTER_FAILURE],
    async () => {
      const user = await api.register(
        email,
        username,
        password,
        profileImageUrl
      );
      localStorage.write(localStorage.key.USER, user);

      return user;
    }
  );

const logout = () => {
  localStorage.destroy(localStorage.key.USER);
  return {
    type: type.LOGOUT
  };
};

export { type, checkSession, login, logout, register };
