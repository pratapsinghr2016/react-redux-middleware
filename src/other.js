import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";

const initialState = {
  name: "alpha",
  value: 0,
};

const incReducer = function (state, action) {
  switch (action.type) {
    case "INC":
      return {
        ...initialState,
        value: state?.value + action.payload,
      };
    case "SET":
      return {
        ...initialState,
        value: state?.value + action.payload.value,
      };
    default:
      return initialState;
  }
};

const decReducer = function (state, { type, payload }) {
  switch (type) {
    case "DEC":
      return {
        ...initialState,
        value: state?.value - 1,
      };

    default:
      return initialState;
  }
};

// MIDDLEWARE
const customMiddleware = (store) => (next) => (action) => {
  // console.log("action-fired", action);
  next(action);
};
const sagaMiddleware = createSagaMiddleware();
//==============================================================================================

const rootReducer = combineReducers({ incReducer, decReducer });

const store = configureStore({
  reducer: rootReducer,
  preloadedState: { incReducer, decReducer },
  middleware: () => [customMiddleware, sagaMiddleware],
});

store.subscribe(() => {
  console.log("====>", store.getState());
});

const increaseAction = function (payload) {
  // const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  // console.log("data", data);

  return { type: "INC", payload };
};

const decreaseAction = function (payload) {
  return { type: "DEC", payload };
};

function* getUserSaga() {
  const data = yield fetch("https://dummyjson.com/carts");
  const res1 = yield data.json();
  const res = yield { name: "apl", value: 100 };
  // console.log("data", res);
  yield put({ type: "SET", payload: res });
}

function* rootSaga() {
  yield takeEvery("INC", getUserSaga);
}
sagaMiddleware.run(rootSaga);

store.dispatch(increaseAction(1));
// store.dispatch(increaseAction(1));
// store.dispatch(increaseAction(1));
// store.dispatch(increaseAction(1));
//
// store.dispatch(decreaseAction(1));
// store.dispatch(decreaseAction(1));
// store.dispatch(decreaseAction(1));

export function doSomething() {
  return "";
}
