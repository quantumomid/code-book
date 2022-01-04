import { CellsActionTypes } from "./cellsActionTypes";
import { DeleteCellAction, InsertCellAfterAction, MoveCellAction, UpdateCellAction, CellTypes, Directions } from "./cellsType";


export const moveCell = ( id: string, direction: Directions ): MoveCellAction => {
    return {
        type: CellsActionTypes.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: CellsActionTypes.DELETE_CELL,
        payload: id
    }
};

export const insertCellAfter = ( id: string | null, type: CellTypes ): InsertCellAfterAction => {
    return {
        type: CellsActionTypes.INSERT_CELL_AFTER,
        payload: {
            id,
            type
        }
    }
};

export const updateCell = ( id: string, content: string ): UpdateCellAction => {
    return {
        type: CellsActionTypes.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
};

