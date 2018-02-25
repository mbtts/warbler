const API_CALL_ACTION_TYPE = "apiCallActionType";

const apiCall = (stages, fn, args = []) => ({
  type: API_CALL_ACTION_TYPE,
  stages,
  fn,
  args
});

const doRequest = async (store, { stages, fn, args }) => {
  const [requestType, successType, failureType] = stages;

  store.dispatch({
    type: requestType
  });

  try {
    const response = await fn.apply(null, args);

    store.dispatch({
      type: successType,
      response
    });
  } catch (error) {
    store.dispatch({
      type: failureType,
      error
    });
  }
};

const apiMiddleware = store => next => action => {
  return action.type === API_CALL_ACTION_TYPE
    ? doRequest(store, action)
    : next(action);
};

export { apiCall, apiMiddleware };
