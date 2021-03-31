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
function initState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return {
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
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
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
  }
}

export default function rootReducer(state = initState(), action) {
  switch (action.type) {
    case actions.SIGN_IN:
      return {
        ...state,
        users: [...state.users, action.payload.content],
        currentUser: {},
        isLoggedIn: false,
      };

    case actions.LOG_IN:
      try {
        const serializedState = JSON.stringify({
          ...state,
          currentUser: action.payload.content,
          isLoggedIn: true,
        });
        localStorage.setItem("state", serializedState);
      } catch {
        // ignore write errors
      }
      return {
        ...state,
        currentUser: action.payload.content,
        isLoggedIn: true,
      };
    case actions.LOG_OUT:
      try {
        const serializedState = JSON.stringify({
          ...state,
          currentUser: {},
          isLoggedIn: false,
        });
        localStorage.setItem("state", serializedState);
      } catch {
        // ignore write errors
      }
      console.log("logging the user out...");
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false,
      };
    case actions.UPDATE_PROFILE:
      try {
        const serializedState = JSON.stringify({
          ...state,
          currentUser: action.payload.content,
          isLoggedIn: true,
        });
        localStorage.setItem("state", serializedState);
      } catch {
        // ignore write errors
      }
      console.log("updating user profile...");
      return {
        ...state,
        currentUser: action.payload.content,
        isLoggedIn: true,
      };
    case actions.CREATE_GROUP:
      try {
        const serializedState = JSON.stringify({
          ...state,
          groups: action.payload.content.groups,
        });
        localStorage.setItem("state", serializedState);
      } catch {
        // ignore write errors
      }
      return {
        ...state,
        groups: action.payload.content.groups,
      };

    default:
      return state;
  }
}
