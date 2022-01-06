import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistMiddleware } from "./middlewares/persistMiddleware";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, {}, applyMiddleware(persistMiddleware, thunk));

export default store;