import { combineReducers } from "redux";
import bundlesReducer from "./bundles/bundlesReducer";
import cellsReducer from "./cells/cellsReducer";

const rootReducer = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;