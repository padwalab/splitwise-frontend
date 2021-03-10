import * as actions from "./action-types";

export const signInUser = (content) => ({
  type: actions.SIGN_IN,
  payload: {
    content,
  },
});

export const logInUser = (content) => ({
  type: actions.LOG_IN,
  payload: {
    content,
  },
});

export const logOutUser = (content) => ({
  type: actions.LOG_OUT,
  payload: {},
});
