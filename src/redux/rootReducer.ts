import { combineReducers } from "redux";
import cellsReducer from "./cells/cellsReducer";

const rootReducer = combineReducers({
    cells: cellsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;