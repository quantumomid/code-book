import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../rootReducer";
import { CellsActionTypes } from "./cellsActionTypes";
import { DeleteCellAction, InsertCellAfterAction, MoveCellAction, UpdateCellAction, CellTypes, Directions, Action, Cell } from "./cellsTypes";


export const moveCell = ( id: string, direction: Directions ): MoveCellAction => ({
    type: CellsActionTypes.MOVE_CELL,
    payload: {
        id,
        direction
    }
});

export const deleteCell = (id: string): DeleteCellAction => ({
    type: CellsActionTypes.DELETE_CELL,
    payload: id
});

export const insertCellAfter = ( id: string | null, type: CellTypes ): InsertCellAfterAction => ({
    type: CellsActionTypes.INSERT_CELL_AFTER,
    payload: {
        id,
        type
    }
});

export const updateCell = ( id: string, content: string ): UpdateCellAction => ({
    type: CellsActionTypes.UPDATE_CELL,
    payload: {
        id,
        content
    }
});


export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
    
    dispatch({ type: CellsActionTypes.FETCH_CELLS });

    try {
        const { data }: { data: Cell[] } = await axios.get("/cells");

        dispatch({
            type: CellsActionTypes.FETCH_CELLS_COMPLETE,
            payload: data
        });

    } catch (error: any) {
        dispatch({
            type: CellsActionTypes.FETCH_CELLS_ERROR,
            payload: error.message
        });
    }
}

export const saveCells = () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells: { data, order } } = getState();

    const cells = order.map(id => data[id]);

    try {
        await axios.post("/cells", { cells });
    } catch (error:any) {
        dispatch({
            type: CellsActionTypes.SAVE_CELLS_ERROR,
            payload: error.message
        });
    }
}
