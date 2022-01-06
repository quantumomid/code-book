import { CellsActionTypes } from "./cellsActionTypes";

export type CellTypes = "code" | "text";


export interface Cell {
    id: string;
    type: CellTypes;
    content: string;
}

export type Directions = "up" | "down";

export interface MoveCellAction {
    type: CellsActionTypes.MOVE_CELL;
    payload: {
        id: string;
        direction: Directions;
    };
}

export interface DeleteCellAction {
    type: CellsActionTypes.DELETE_CELL;
    payload: string;
}

export interface InsertCellAfterAction {
    type: CellsActionTypes.INSERT_CELL_AFTER;
    payload: {
        id: string | null;
        type: CellTypes;
    };
}

export interface UpdateCellAction {
    type: CellsActionTypes.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    };
}

export interface FetchCellsAction {
    type: CellsActionTypes.FETCH_CELLS
}

export interface FetchCellsCompleteAction {
    type: CellsActionTypes.FETCH_CELLS_COMPLETE,
    payload: Cell[]
}

export interface FetchCellsErrorAction {
    type: CellsActionTypes.FETCH_CELLS_ERROR,
    payload: string
}

export type Action = MoveCellAction | DeleteCellAction | InsertCellAfterAction | UpdateCellAction | FetchCellsAction | FetchCellsCompleteAction | FetchCellsErrorAction;