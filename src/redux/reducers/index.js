import * as actions from "../actions/action-types";
const InitialState = {
  users: [
    {
      name: "abhijeet",
      email: "a@g.com",
      password: "a",
      phone_number: "",
      default_currency: "INR",
      time_zone: "PT",
      language: "English",
    },
  ],
  groups: [],
  isLoggedIn: false,
  currentUser: {},
};

export default function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case actions.SIGN_IN:
      return {
        ...state,
        users: [...state.users, action.payload.content],
        currentUser: {},
        isLoggedIn: false,
      };

    case actions.LOG_IN:
      return {
        ...state,
        currentUser: action.payload.content,
        isLoggedIn: true,
      };
    case actions.LOG_OUT:
      console.log("logging the user out...");
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false,
      };
    case actions.UPDATE_PROFILE:
      console.log("updating user profile...");
      if (
        action.payload.content.name === "" ||
        action.payload.content.email === "" ||
        action.payload.content.default_currency === "" ||
        action.payload.content.time_zone === "" ||
        action.payload.content.language === ""
      ) {
        return state;
      }
      let i = 0;
      for (i = 0; i < state.users.length; i++) {
        if (state.users[i].email === action.payload.content.email) {
          state.users[i] = action.payload.content;
          return {
            ...state,
            currentUser: state.users[i],
            isLoggedIn: true,
          };
        }
      }
      return state;
    case actions.CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload.content],
      };

    default:
      return state;
  }
}
