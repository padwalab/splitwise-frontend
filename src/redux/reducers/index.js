import * as actions from "../actions/action-types";
const InitialState = {
  users: [{ name: "abhijeet", email: "a@g.com", password: "a" }],
  isLoggedIn: false,
  currentUser: {},
};

export default function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case actions.SIGN_IN: {
      return {
        ...state,
        users: [...state.users, action.payload.content],
        isLoggedIn: false,
      };
    }
    case actions.LOG_IN:
      if (
        action.payload.content.username === "" ||
        action.payload.content.password === "" ||
        state.users.length < 1
      ) {
        return state;
      }
      let i = 0;
      for (i = 0; i < state.users.length; i++) {
        if (
          state.users[i].username === action.payload.content.username &&
          state.users[i].password === action.payload.content.password
        ) {
          console.log("user: ", state.users[i].username);
          return {
            ...state,
            currentUser: state.users[i],
            isLoggedIn: true,
          };
        }
      }
      return state;
    case actions.LOG_OUT:
      console.log("logging the user out...");
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
