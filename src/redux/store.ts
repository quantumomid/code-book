import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { CellsActionTypes } from "./cells/cellsActionTypes";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

store.dispatch({
    type: CellsActionTypes.INSERT_CELL_BEFORE,
    payload: {
        id: null,
        type: "code"
    }
})

store.dispatch({
    type: CellsActionTypes.INSERT_CELL_BEFORE,
    payload: {
        id: null,
        type: "text"
    }
})

export default store;