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
            const currentCellOrderIndex = state.order.findIndex((cellId) => cellId === action.payload.id);
            const targetIndex = action.payload.direction === "up" ? currentCellOrderIndex-1 : currentCellOrderIndex+1;

            // Check to ensure the target index isnt outside the realms of the order array
            if (targetIndex < 0 || targetIndex > state.order.length -1 ) return;

            // Do the swap of the cells orders
            state.order[currentCellOrderIndex] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;

            return;
        case CellsActionTypes.DELETE_CELL:
            // delete cell inside the order array
            state.order = state.order.filter(cellId => cellId !== action.payload);
            // delete cell data from the data object
            delete state.data[action.payload];
            return;
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