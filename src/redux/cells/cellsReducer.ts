import { Action } from "./cellsActions";
import { CellsActionTypes } from "./cellsActionTypes";
import { Cell } from "./cellsType";

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell
    };
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const cellsReducer = (state: CellsState = initialState, action: Action): CellsState => {
    switch(action.type) {
        case CellsActionTypes.MOVE_CELL:
            return state;
        case CellsActionTypes.DELETE_CELL:
            return state;
        case CellsActionTypes.INSERT_CELL_BEFORE:
            return state;
        case CellsActionTypes.UPDATE_CELL:
            return state;
        default:
            return state;
    }
}

export default cellsReducer;