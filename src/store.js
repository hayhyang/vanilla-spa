import createStore from "./core/store.js";

const initState = {
  a: 10,
  b: 20,
  isFilter: 1,
  items: [
    {
      id: 1,
      contents: "item1",
      active: false,
    },
    {
      id: 2,
      contents: "item2",
      active: true,
    },
  ],
};

const SET_A = "SET_A";
const SET_B = "SET_B";
const SET_IS_FILTER = "SET_IS_FILTER";
const SET_ITEMS = "SET_ITEMS";

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case SET_A:
      return { ...state, a: action.payload };
    case SET_B:
      return { ...state, b: action.payload };
    case SET_IS_FILTER:
      return { ...state, isFilter: action.payload };
    case SET_ITEMS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const setA = (payload) => ({
  type: SET_A,
  payload,
});

export const setB = (payload) => ({
  type: SET_B,
  payload,
});

export const setIsFilter = (payload) => ({
  type: SET_IS_FILTER,
  payload,
});

export const setItems = (payload) => ({
  type: SET_ITEMS,
  payload,
});

export const store = createStore(reducer);
