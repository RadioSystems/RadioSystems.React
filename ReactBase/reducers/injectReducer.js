import {combineReducers} from "redux";
import rootReducer from "./rootReducer";

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  console.log("injecting reducer: " + key);
  store.asyncReducers[key] = reducer
  store.replaceReducer(rootReducer(store.asyncReducers))
}
