import { CellsActionTypes } from "./cellsActionTypes";

interface MoveCellAction {
    type: CellsActionTypes.MOVE_CELL;
    payload: {
        id: string;
        direction: "up" | "down";
    };
}

interface DeleteCellAction {
    type: CellsActionTypes.DELETE_CELL;
    payload: string;
}

interface InsertCellBeforeAction {
    type: CellsActionTypes.INSERT_CELL_BEFORE;
    payload: {
        id: string;
        type: "code" | "text";
    };
}

interface UpdateCellAction {
    type: CellsActionTypes.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    };
}

export type Action = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction;

