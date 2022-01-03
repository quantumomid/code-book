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

export interface InsertCellBeforeAction {
    type: CellsActionTypes.INSERT_CELL_BEFORE;
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

export type Action = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction;