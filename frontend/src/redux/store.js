import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as urlReducer } from "./urlReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
  urlReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
