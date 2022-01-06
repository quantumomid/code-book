import { CellsActionTypes } from "./cellsActionTypes";
import { Cell, Action } from "./cellsTypes";
import produce from "immer";

export interface CellsState {
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
            if (targetIndex < 0 || targetIndex > state.order.length -1 ) {
                return state
            };

            // Do the swap of the cells orders
            state.order[currentCellOrderIndex] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;

            // Can just do an empty return since we are using Immer but for the sake of TS and ensuring TS 
            // doesnt get the type of the redux store state confused return state below
            return state;
        case CellsActionTypes.DELETE_CELL:
            // delete cell inside the order array
            state.order = state.order.filter(cellId => cellId !== action.payload);
            // delete cell data from the data object
            delete state.data[action.payload];
            return state;
        case CellsActionTypes.INSERT_CELL_AFTER:
            // basic type check with the Cell type 
            const cell: Cell = {
                content: "",
                type: action.payload.type,
                id: randomId()
            }

            state.data[cell.id] = cell;

            const foundIndex = state.order.findIndex(cellId => cellId === action.payload.id);
            //Take care of situation where no index found (findIndex returns -1 when no match found)
            // Just push to end in that case
            if(foundIndex < 0) {
                state.order.unshift(cell.id)
            } else{
                state.order.splice(foundIndex + 1, 0, cell.id);
            };

            return state;
        case CellsActionTypes.UPDATE_CELL:
            state.data[action.payload.id].content =  action.payload.content;
            return state;
        case CellsActionTypes.FETCH_CELLS:
            state.loading = true;
            state.error = null;
            return state;
        case CellsActionTypes.FETCH_CELLS_COMPLETE:
            state.order = action.payload.map(cell => cell.id);
            state.data = action.payload.reduce((accumulator, currentCell) => {
                accumulator[currentCell.id] = currentCell;
                return accumulator;
            }, {} as CellsState["data"]);
            return state;
        case CellsActionTypes.FETCH_CELLS_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;
        default:
            return state;
    }
}, initialState)

const randomId = () => {
    // Random number in string format with base 36 formatting 
    // i.e. numbers 0-9 and letters a-z included 
    return Math.random().toString(36).substr(2, 5);
}

export default cellsReducer;