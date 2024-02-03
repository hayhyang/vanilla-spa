import { observable } from "./observer.js";

const createStore = (reducer) => {
  const state = observable(reducer());
  const frozenState = {};

  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get() {
        return state[key];
      },
    });
  });

  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) continue;
      state[key] = value;
    }
  };
  const getState = () => frozenState;

  return {
    dispatch,
    getState,
  };
};

export default createStore;

// observer패턴과 flux패턴을 혼합하여 redux 구현
// 기존 redux는 createStore가 subscribe, dispatch, getState 메서드를 가진 객체를 리턴하는 패턴이나
// subscribe메서드는 Object.defindProperty API를 활용한 observable, observe 로 대체
