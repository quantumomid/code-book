import { CellsActionTypes } from "./cellsActionTypes";
import { Cell, Action } from "./cellsType";
import produce from "immer";

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

const cellsReducer = produce((state: CellsState = initialState, action: Action) => {
    switch(action.type) {
        case CellsActionTypes.MOVE_CELL:
            return state;
        case CellsActionTypes.DELETE_CELL:
            return state;
        case CellsActionTypes.INSERT_CELL_BEFORE:
            return state;
        case CellsActionTypes.UPDATE_CELL:
            state.data[action.payload.id].content =  action.payload.content;
            return;
        default:
            return state;
    }
})

export default cellsReducer;