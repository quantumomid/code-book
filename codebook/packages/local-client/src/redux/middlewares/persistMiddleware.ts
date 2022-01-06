import { Dispatch } from "redux"
import { saveCells } from "../cells/cellsActions";
import { CellsActionTypes } from "../cells/cellsActionTypes";
import { Action } from "../cells/cellsTypes"
import { RootState } from "../rootReducer";

// Notice syntax: Middleware function return a function which returns another function
export const persistMiddleware = ({ dispatch, getState }: { dispatch: Dispatch<Action>, getState: () => RootState }) => {
    let timer: any;
    return (next: (action: Action) => void) => {
        return (action: Action) => {
            // Pass along every action intercepted
            next(action);

            // Save cells if any change to cells occurs
            if([CellsActionTypes.MOVE_CELL, CellsActionTypes.UPDATE_CELL, CellsActionTypes.INSERT_CELL_AFTER, CellsActionTypes.DELETE_CELL].includes(action.type)){
                // console.log("I want to save cells!")
                // Save cells but with a debouncing logic to not repeatedly run function on every key press!
                if(timer){
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    saveCells()(dispatch, getState);

                }, 250);
            }
        };
    };
};