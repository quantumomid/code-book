import { useMemo } from "react";
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as bundleActionCreators from "../redux/bundles/bundlesActions";

export const useBundleActions = () => {
    const dispatch = useDispatch();

    // Only rerun the function in first argument if dispatch changes 
    return useMemo(() => {
        return bindActionCreators(bundleActionCreators, dispatch);
    }, [dispatch]);
};