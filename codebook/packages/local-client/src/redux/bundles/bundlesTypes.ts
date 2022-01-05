import { BundlesActionTypes } from "./bundlesActionTypes";

export interface BundleStartAction {
    type: BundlesActionTypes.BUNDLE_START,
    payload: {
        cellId: string;
    }
}

export interface BundleCompleteAction {
    type: BundlesActionTypes.BUNDLE_COMPLETE,
    payload: {
        cellId: string;
        bundle: {
            code: string;
            error: string;
        }
    }
}

export type Action = BundleStartAction | BundleCompleteAction;