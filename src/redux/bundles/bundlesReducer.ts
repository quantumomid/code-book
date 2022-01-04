import produce from "immer";
import { Action } from "./bundlesTypes";
import { BundlesActionTypes } from "./bundlesActionTypes";

export interface BundlesState {
    [key: string]: {
        loading: boolean;
        code: string;
        error: string;
    } | undefined
}

const initialState: BundlesState = {}

const bundlesReducer = produce((state: BundlesState = initialState, action: Action): BundlesState => {
    switch(action.type) {
        case BundlesActionTypes.BUNDLE_START:
            state[action.payload.cellId] = {
                loading: true,
                code: "",
                error: ""
            };
            return state;
        case BundlesActionTypes.BUNDLE_COMPLETE:
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                error: action.payload.bundle.error
            };
            return state;
        default:
            return state;
    }
}, initialState)


export default bundlesReducer;