import { Dispatch } from "redux";
import bundle from "../../bundler";
import { BundlesActionTypes } from "./bundlesActionTypes";
import { Action } from "./bundlesTypes";


export const createBundle = (cellId: string, input: string) => {

    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: BundlesActionTypes.BUNDLE_START,
            payload: {
                cellId: cellId
            }
        })

        const result = await bundle(input);

        dispatch({
            type: BundlesActionTypes.BUNDLE_COMPLETE,
            payload: {
                cellId: cellId,
                bundle: {
                    code: result.code,
                    error: result.err
                }
            }
        })
    }
}
